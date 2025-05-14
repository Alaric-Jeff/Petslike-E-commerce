import SignUpRoute from '../Routes/SignUpRoute.js'
import UserRoute from './AdminRoutes/UserRoutes.js'
import ProductRoute from './AdminRoutes/ProductRoutes.js'

async function initRoute(app){
    app.use('/sign-up', SignUpRoute);
    app.use('/users', UserRoute);
    app.use('/products', ProductRoute);
};

export default initRoute;