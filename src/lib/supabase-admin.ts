import { createClient } from '@supabase/supabase-js'
import { stripe } from './stripe'
import { toDateTime } from './api-helpers'
import { Customer, UserDetails, Price, Product, Purchase } from '@/lib/types'
import Stripe from 'stripe'

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin priviliges and overwrites RLS policies!
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// const upsertProductRecord = async (product: Stripe.Product) => {
//   const productData: Product = {
//     id: product.id,
//     active: product.active,
//     name: product.name,
//     description: product.description ?? undefined,
//     image: product.images?.[0] ?? null,
//     metadata: product.metadata,
//   }

//   const { error } = await supabaseAdmin
//     .from<Product>('products')
//     .upsert([productData])
//   if (error) throw error
//   console.log(`Product inserted/updated: ${product.id}`)
// }

// const upsertPriceRecord = async (price: Stripe.Price) => {
//   const priceData: Price = {
//     id: price.id,
//     product_id: typeof price.product === 'string' ? price.product : '',
//     active: price.active,
//     currency: price.currency,
//     description: price.nickname ?? undefined,
//     type: price.type,
//     unit_amount: price.unit_amount ?? undefined,
//     interval: price.recurring?.interval,
//     interval_count: price.recurring?.interval_count,
//     trial_period_days: price.recurring?.trial_period_days,
//     metadata: price.metadata,
//   }

//   const { error } = await supabaseAdmin
//     .from<Price>('prices')
//     .upsert([priceData])
//   if (error) throw error
//   console.log(`Price inserted/updated: ${price.id}`)
// }

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string
  uuid: string
}) => {
  let { data, error } = await supabaseAdmin
    .from('directus_users')
    .select('id,stripeId,first_name,last_name,email')
    .eq('id', uuid)
    .single()

  if (data) {
    if (data?.stripeId === null) {
      let stripeCustomer: any

      // check if Stripe Customer already exists and return that
      stripeCustomer = await stripe.customers.search({
        query: `email:"${data?.email}"`,
        //query: `email:"absolute@gmail.com"`,
        limit: 1,
      })

      console.log('stripeCustomer ->', stripeCustomer)

      if (stripeCustomer.data.length === 0) {
        // if Stripe Customer doesn't exist then create one and return that
        console.log('stripeCustomer doesnt exist being created')
        stripeCustomer = await stripe.customers.create({
          email: data?.email,
          metadata: { customerId: data.id },
        })
        console.log('stripeCustomer ->', stripeCustomer)
        if (stripeCustomer) {
          // Now insert the customer ID into our Supabase mapping table.
          const { error: supabaseError } = await supabaseAdmin
            .from('directus_users')
            .upsert([{ id: uuid, stripeId: stripeCustomer.id }])
          if (supabaseError) throw supabaseError
          console.log(`New customer created and inserted for ${uuid}.`)
          data.stripeId = stripeCustomer.id
        }
      }
    }

    console.log('supa customer -> ', data)

    return data
  } else return {}
}

const upsertPurchases = async (
  mode: any, // subscription or payment_intent
  identifier: any, // identifier for the subscription (or payment intent if one-off buy)
  customerId: any,
  metadata?: any,
  sessionObject?: any // full object
) => {
  let purchaseData: any

  // create purchase record for customer
  // shouldn't need to check if already bought here -- just insert record

  // get details from Stripe Session Object & construct Purchase Record
  if (mode === 'subscription') {
    // get subscription details
    const subscription = await stripe.subscriptions.retrieve(identifier)

    // construct Purchase Record
    if (subscription) {
      purchaseData = {
        id: subscription.id,
        customerId: customerId,
        status: subscription.status,
        mode: 'subscription',

        productId: metadata.productId,
        productSlug: metadata.productSlug,
        priceId: subscription.items.data[0].plan.id,
        amount: subscription.items.data[0]?.plan?.amount,
        currency: subscription.currency,
        interval: subscription.items.data[0]?.plan?.interval,
        frequency: subscription.items.data[0]?.plan?.interval_count,

        created: toDateTime(subscription.created),
        current_period_start: toDateTime(subscription.current_period_start),
        current_period_end: toDateTime(subscription.current_period_end),

        ended_at: subscription.ended_at
          ? toDateTime(subscription.ended_at)
          : null,
        cancel_at: subscription.cancel_at
          ? toDateTime(subscription.cancel_at)
          : null,

        canceled_at: subscription.canceled_at
          ? toDateTime(subscription.canceled_at)
          : null,
        cancel_at_period_end: subscription.cancel_at_period_end,

        metadata: metadata,
      }
      console.log('purchaseData --', purchaseData)
    }

    // upsert in supabase - Purchases Table
  }

  if (mode === 'payment') {
    // get one-off payment details
    const payment_intent = await stripe.paymentIntents.retrieve(identifier)

    // construct Purchase Record
    if (payment_intent) {
      purchaseData = {
        id: payment_intent.id,
        customerId: customerId,
        status: payment_intent.status,
        mode: 'payment_intent',

        productId: metadata.productId,
        productSlug: metadata.productSlug,
        amount: payment_intent.amount,
        currency: payment_intent.currency,

        metadata: metadata,
      }
      console.log('purchaseData --', purchaseData)
    }

    // upsert in supabase - Purchases Table
  }

  if (purchaseData) {
    const { error } = await supabaseAdmin
      .from('Purchases')
      .upsert([purchaseData])
    if (error) throw error
    console.log(
      `Inserted/updated purchase [${
        purchaseData ? purchaseData.id : null
      }] for user [${customerId}]`
    )
  }

  // see if existing purchase for customer & product (and for subs, not end-dated)
  // const { data: customerPurchases, error: purchaseError } = await supabaseAdmin
  //   .from('Purchases')
  //   .select('id,status,mode,productId,stripeId,first_name,last_name,email,live')
  //   .eq('id', customerId.id, 'productId',)
  //   //.single()

  // // no purchases
  // if (customerPurchases?.length === 0) {

  // } else {
  //   // find if
  // }

  // // some other error
  // if (purchaseError) throw purchaseError

  // const { id: uuid } = customerData || {}
  // console.log('customer uuid --', uuid)

  // if no purchases, create new one using data supplied
}

export {
  //   upsertProductRecord,
  //   upsertPriceRecord,
  createOrRetrieveCustomer,
  upsertPurchases,
}
