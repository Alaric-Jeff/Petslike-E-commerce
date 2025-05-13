import SignUpRoute from '../Routes/SignUpRoute.js'
import DeleteRoute from '../Routes/AdminRoutes/DeleteUserRoute.js'
import GetAllUserRoute from '../Routes/AdminRoutes/GetAllUserRoute.js'
import UpdateUserRoute from '../Routes/AdminRoutes/UpdateRoute.js'

async function initRoute(app){
    app.use('/sign-up', SignUpRoute);
    app.use('/delete-user', DeleteRoute)
    app.use('/get-users', GetAllUserRoute)
    app.use('/update-user', UpdateUserRoute)
};

export default initRoute;