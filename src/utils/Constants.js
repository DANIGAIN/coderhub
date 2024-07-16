export const pricingCards = [
    {
      id:1,
      title: 'Basic',
      discount:5,
      price_id: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_BASIC,
      description: 'You will have 5% discout on every service .',
      price: '$10',
      duration: 'month',
      domain:"free 1 domain month 1 month hosting",
      ex:"No setup, or hidden fees",
      team_size: "1 developer",
      premium_support:'6 months',
      free_updates:'6 months'
    
    },
    {
      id:2,
      title: 'Company',
      price_id: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_COMPANY,
      disount:15,
      description: 'You will have 15% discout on every service',
      price: '$15',
      duration: 'month',
      domain:"free 1 domain month 6 month hosting",
      ex:"No setup, or hidden fees",
      team_size: "5 developer",
      free_updates:'10 months'


    },
    {
      id:3,
      title: 'Enterprise',
      disount:20,
      price_id: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_ENTERPRICE,
      description: 'You will have 20% discout on every service .',
      price: '$20',
      duration: 'month',
      domain:"free 1 domain month 1 year hosting",
      ex:"No setup, or hidden fees",
      team_size: "10 developer",
      free_updates:'24 months'

    },
  ]

export const staticRole = [
  'Admin',
  'User',
  'Supper-Admin'
]

export const publicDomain =[
    '/team-condition',
    '/',
    '/home',
    '/about',
    '/contact',
    '/service',
    '/team',
    '/contact'
]    

export const matcherPath = [
  '/',
  '/home',
  '/agency/login',
  '/agency/signup',
  '/home/:id',
  '/agency/dashboard',
  '/api/categories/:id*',
  '/agency/forget-password'
]

export const modalStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderStyle: 'solid',
    borderRadius: '20px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}
