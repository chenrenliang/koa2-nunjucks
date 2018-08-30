

const router = require('koa-router')()
// const HomeController = require('./controller/home')

module.exports = app => {
    // router.get('/', HomeController.index)

    // router.get('/home', HomeController.home)

    // router.get('/home/:id/:home', HomeController.homeParams)

    // router.get('/user', HomeController.login)

    // router.post('/user/register', HomeController.register)

    router.get('/',app.controller.home.index)

    router.get('/home', app.controller.home.home)

    router.get('/home/:id/:home', app.controller.home.homeParams)

    router.get('/user', app.controller.home.login)

    router.post('/user/register', app.controller.home.register)

    app.use(router.routes())
    .use(router.allowedMethods())

}


