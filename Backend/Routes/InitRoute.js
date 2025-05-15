import auth from './Auth.js'
import UserRoute from './AdminRoutes/UserRoutes.js'
import ProductRoute from './AdminRoutes/ProductRoutes.js'


async function initRoute(app){
    app.use('/auth', auth);
    app.use('/users', UserRoute);
    app.use('/products', ProductRoute);

};

export default initRoute;