import auth from './Auth.js'
import UserRoute from './AdminRoutes/UserRoutes.js'
import ProductRoute from './AdminRoutes/ProductRoutes.js'
import CartRoutes from  './AdminRoutes/CartRoutes.js'
import PaymentRoutes from './AdminRoutes/PaymentRoutes.js'


async function initRoute(app){
    app.use('/auth', auth);
    app.use('/users', UserRoute);
    app.use('/products', ProductRoute);
    app.use('/carts', CartRoutes);
    app.use('/payments', (req, res, next) => {
        if(!req.session.userId){
            return res.status(401).json({
                message: "Unauthorized access",
                success: false
            });
        }
        req.user = {userId: req.session.userId}
        next();
    }, PaymentRoutes);
    
};

export default initRoute;