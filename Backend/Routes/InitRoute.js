import SignUpController from "../Controllers/SignUpController.js";

async function initRoute(app){
    app.use('/sign-up', SignUpController);
};

export default initRoute;