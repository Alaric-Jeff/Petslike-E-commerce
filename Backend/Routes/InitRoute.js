import auth from './Auth.js'
import UserRoute from './AdminRoutes/UserRoutes.js'
import ProductRoute from './AdminRoutes/ProductRoutes.js'
import CartRoutes from  './AdminRoutes/CartRoutes.js'


async function initRoute(app){
    app.use('/auth', auth);
    app.use('/users', UserRoute);
    app.use('/products', ProductRoute);
    app.use('/carts', CartRoutes);
};

export default initRoute;