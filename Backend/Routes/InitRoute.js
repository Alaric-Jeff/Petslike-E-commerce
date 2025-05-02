import SignUpRoute from '../Routes/SignUpRoute.js'
import DeleteRoute from '../Routes/AdminRoutes/DeleteUserRoute.js'

async function initRoute(app){
    app.use('/sign-up', SignUpRoute);
    app.use('/delete-user', DeleteRoute)
};

export default initRoute;