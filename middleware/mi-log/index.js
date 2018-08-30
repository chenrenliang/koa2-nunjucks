const logger = require('./logger')

module.exports = (options) => {
    const loggerMiddleWare = logger(options)


   return (ctx, next) => {
       return loggerMiddleWare(ctx, next)
            .catch(e => {
                if(ctx.status < 500){
                    ctx.status = 500;
                }

                ctx.log.error(e.stack)
                ctx.state.logged = true 
                ctx.throw(e)
            })
   }
}