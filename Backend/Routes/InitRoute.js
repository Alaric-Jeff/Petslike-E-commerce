import auth from './Auth.js'
import UserRoute from './AdminRoutes/UserRoutes.js'
import ProductRoute from './AdminRoutes/ProductRoutes.js'
import CartRoutes from  './AdminRoutes/CartRoutes.js'
import PaymentRoutes from './AdminRoutes/PaymentRoutes.js'
import logger from '../Utils/logger.js'

async function initRoute(app){
    app.use('/auth', auth);
    app.use('/users', UserRoute);
    app.use('/products', ProductRoute);
    app.use('/carts', CartRoutes);
    app.use('/payments', (req, res, next) => {
        if(!req.session.user.sid){
            logger.warn("Unauthorized access attempt to payment routes, recieved: ", req.session.user.sid);

            return res.status(401).json({
                message: "Unauthorized access",
                success: false
            });
        }
        logger.info("User authenticated for payment routes", req.session.user.sid);
        req.user = {userId: req.session.user.sid}
        next();
    }, PaymentRoutes);
    
};

export default initRoute;