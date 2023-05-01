import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { Readable } from 'node:stream'

// import {
//   upsertProductRecord,
//   upsertPriceRecord,
//   managePurchases,
// } from '@/lib/supabase-admin'

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}


const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST' || req.method === 'PATCH') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']
    // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const webhookSecret =
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
        ? process.env.DEV_STRIPE_WHK_SEC
        : process.env.PRD_STRIPE_WHK_SEC
    let event: Stripe.Event

    try {
      if (!sig || !webhookSecret) return
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err: any) {
      console.log(`! Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    try {
      // directus api - https://docs.directus.io/reference/items.html
      let product: Stripe.Product
      let price: Stripe.Price
      let session: Stripe.Checkout.Session
      let subscription: Stripe.Subscription
      let results: any

      if (event.type === 'checkout.session.completed') {
        session = event.data.object as Stripe.Checkout.Session

        // get customer from data

        // create purchase from data
        
        // get order from client_reference_id
        const orderId: any = session.client_reference_id
        const customerId: any = session.customer // id of the customer

        // create the order
        console.log('creating Purchase...')
        let order: any = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/orders?fields=*,items.*&filter[id][_eq]=${orderId}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${process.env.DIRECTUS}`,
                'Content-Type': 'application/json',
              },
              credentials: 'same-origin',
            }
          )
        ).json()
        order.data?.length > 0 ? (order = order.data[0]) : order

        if (order && order != undefined && Object.keys(order).length > 0) {
          console.log('update stock...')
          fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/api/updateStockQty?items=${order.cart.items}`
          )

          console.log('update voucher...')
          if (Object.keys(order.cart.options.voucher).length != 0) {
            fetch(
              `${process.env.NEXT_PUBLIC_REST_API}/api/updateVoucher?cart=${order.cart}`
            )
          }

          // update order email & customer associated
          console.log('upsert order...')

          order = await fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/orders/${orderId}`,
            {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${process.env.DIRECTUS}`,
                'Content-Type': 'application/json',
              },
              credentials: 'same-origin',
              body: JSON.stringify({ status: 'placed' }),
            }
          )


        } else {
          // empty order
        }
      }

      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          // await upsertProductRecord(event.data.object as Stripe.Product)
          break
        case 'price.created':
        case 'price.updated':
          // await upsertPriceRecord(event.data.object as Stripe.Price)
          break
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription
          // await managePurchases(
          //   // event.data.object
          //   subscription.id,
          //   subscription.customer as string,
          // )
          break
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session

          // await managePurchases(
          //   // event.data.object as Stripe.Checkout.Session,
          //   checkoutSession.mode === 'subscription'
          //     ? (checkoutSession.subscription as string)
          //     : checkoutSession.payment_intent,
          //   checkoutSession.customer as string,
          //   checkoutSession.metadata,
          //   checkoutSession.mode as string
          // )

          break
        default:
          throw new Error('Unhandled relevant event!')
      }
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .send(
          'Webhook error: "Webhook handler failed. View logs."' +
            JSON.stringify(error)
        )
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default webhookHandler
