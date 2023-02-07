import { stripe } from '@/lib/stripe'
import {
  getUser,
  // withAuthRequired,
  withApiAuth,
} from '@supabase/supabase-auth-helpers/nextjs'
import { createOrRetrieveCustomer } from '@/lib/supabase-admin'
import { getURL } from '@/lib/api-helpers'
import { NextApiRequest, NextApiResponse } from 'next'

const createPortalLink = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { user } = await getUser({ req, res })
      if (!user) throw Error('Could not get user')
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || '',
      })

      if (!customer) throw Error('Could not get customer')

      // https://stripe.com/docs/api/customer_portal/sessions/create
      // create portal configuration - use to dynamically render terms/privacy URLs per org
      const configuration = await stripe.billingPortal.configurations.create({
        features: {
          customer_update: {
            allowed_updates: ['email'],
            enabled: false,
          },
          invoice_history: { enabled: true },
          payment_method_update: { enabled: true },
        },
        business_profile: {
          headline: ``,
          privacy_policy_url: `${req.headers.origin}/privacy`,
          terms_of_service_url: `${req.headers.origin}/terms`,
        },
        default_return_url: `${req.headers.origin}/account`,
      })

      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        configuration: configuration.id,
        // return_url: `${getURL()}/account`
      })

      return res.status(200).json({ url })
    } catch (err: any) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default withApiAuth(createPortalLink)
