import { stripe } from '@/lib/stripe'
import {
  getUser,
  withApiAuth,
  // withAuthRequired
} from '@supabase/supabase-auth-helpers/nextjs'
import { createOrRetrieveCustomer } from '@/lib/supabase-admin'
import { getURL } from '@/lib/api-helpers'
import { NextApiRequest, NextApiResponse } from 'next'

const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    // console.log('req->', req.body)
    const { price, quantity = 1, productSlug } = req.body

    try {
      const { user } = await getUser({ req, res })

      const customer = await createOrRetrieveCustomer({
        uuid: user?.id || '',
        email: user?.email || '',
      })

      const session = await stripe.checkout.sessions.create({
        customer,
        line_items: [{ price: price.id, quantity }],
        mode: price.type === 'one_time' ? 'payment' : 'subscription', // "payment" or "subscription",,
        allow_promotion_codes: true,
        // payment_method_types: ["card"], // no longer required and managed automagically by Stripe https://stripe.com/docs/payments/dashboard-payment-methods#section-opt
        // billing_address_collection: 'required',
        // subscription_data: {
        //   trial_from_plan: true,
        //   metadata,
        // },
        metadata: {
          // include Klubs business id
          orgId: req.body.orgId || '',
          productId: price.product || '',
          productSlug: `${productSlug}` || '',
          // productCategory: product?.category || '',
        },
        // success_url: `${getURL()}/account`,
        // cancel_url: `${getURL()}/`,
        cancel_url:
          (process.env.NEXT_PUBLIC_SITE_URL
            ? process.env.NEXT_PUBLIC_SITE_URL
            : 'http://localhost:3000') + `${productSlug}?canceled=true`,
        success_url:
          (process.env.NEXT_PUBLIC_SITE_URL
            ? process.env.NEXT_PUBLIC_SITE_URL
            : 'http://localhost:3000') +
          `/account?success=true&session_id={CHECKOUT_SESSION_ID}`,

        // {CHECKOUT_SESSION_ID} is a string literal; do not change it! the actual Session ID is returned in the query parameter when your customer is redirected to the success page.  // go to account page after success

        // TODO: add conditional logic here based on currency of the price usd prices do not support alipay (or wechat)
        // https://stripe.com/docs/payments/alipay
        // https://stripe.com/docs/payments/wechat-pay/accept-a-payment?platform=checkout
        // payment_method_options: {wechat_pay:{client:'web'}},
      })

      return res.status(200).json({ sessionId: session.id })
    } catch (err: any) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default withApiAuth(createCheckoutSession)
