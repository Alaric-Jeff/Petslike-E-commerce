import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY, { 
    apiVersion: '2025-05-28'
})

export default stripe;