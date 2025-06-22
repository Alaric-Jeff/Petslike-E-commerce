import stripe from '../../Config/stripConfig.js'
import { catchAsync } from '../../Utils/catchAsync.js'
import logger from '../../Utils/logger.js'
import CreatePaymentIntentService from '../../Services/PaymentServices/CreatePaymentIntentService.js'   
import { log } from 'winston'

const CreatePaymentIntentController = catchAsync(async (req, res) => {

    const { amount, currency, payment_method_types = ['card'], metadata = {} } = req.body;

    const supportedCurrencies = ['php', 'usd', 'eur']

    const EXCHANGE_RATES = {
        usd: 50,    
        eur: 60,    
        gbp: 70     
    };

    if (!amount || !currency) {
        logger.warn("Missing required fields for payment");
        return res.status(400).json({
            message: "Amount and currency are required",
            success: false
        });
    }

    if (isNaN(amount) || amount <= 0) {
        logger.warn("Invalid amount provided");
        return res.status(400).json({
            message: "Amount must be a positive number",
            success: false
        });
    }

    if (!supportedCurrencies.includes(currency.toLowerCase())) {
        logger.warn(`Unsupported currency: ${currency}`);
        return res.status(400).json({
            success: false,
            message: `Unsupported currency. Use: ${supportedCurrencies.join(', ')}`
        });
    }

    try{
        let amountInPHP;

        if(currency === 'php'){
            amountInPHP = parseFloat(amount)
        }else{
            const rate = EXCHANGE_RATES[currency.toLowerCase()];
            if (!rate) {
                logger.error(`Missing exchange rate for ${currency}`);
                return res.status(400).json({
                    success: false,
                    message: 'Currency conversion not supported'
                });
            }

            amountInPHP = parseFloat(amount) * rate;
        }


        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amountInPHP * 100),
            currency: 'php', 
            payment_method_types,
            metadata: {
                ...metadata,
                userId: req.user?.userId || 'anonymous',
                originalAmount: amount,
                originalCurrency: currency
            },
            confirm: false
        })

        if (!paymentIntent) {
            logger.error("Failed to create payment intent");
            return res.status(500).json({
                success: false,
                message: "Failed to create payment intent"
            });
        }

        await CreatePaymentIntentService(paymentIntent.metadata.userId, paymentIntent.id, paymentIntent.status, paymentIntent.currency, amountInPHP);

        logger.info("Successfully created payment intent")
        return res.status(200).json({
            success: true,
            message: "Successfully created payment intent",
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        })

     }catch(err){

        if(err.type === 'DatabaseError'){
            logger.error("Database error while creating payment intent")
        }else{
            logger.error('Stripe error', {
            error: err.message,
            type: err.type,
            userId: req.user?.userId
        });
        }

        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}) 

export default CreatePaymentIntentController;