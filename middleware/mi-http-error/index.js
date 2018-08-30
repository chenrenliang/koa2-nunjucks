
const path = require('path')
const nunjucks = require('nunjucks')

module.exports = (opts = {} ) => {

    const env = opts.env || process.env.NODE_ENV || 'development'

    const folder = opts.errorPageFolder;

    const templatePath = path.resolve(__dirname, './error.html')

    console.log(templatePath)

    let filename = 'other';

    return async(ctx, next) => {
        try{
            await next();

            if(ctx.response.status === 404 && !ctx.response.body)
                ctx.throw(404)
        }catch(e){
                let status = parseInt(e.status)

                const message = e.message;

                if(status >= 400){
                    switch(status){
                        case 400:
                        case 404:
                        case 500:
                            filename = status;
                            break;
                        default: 
                            filename = 'other'    
                    }
                }else{
                    status = 500
                    filename = status;
                }

                //确定最终的filePath
            const filePath = folder ? path.join(folder, `${filename}.html`) : templatePath;    

            console.log(filePath)

            try{
                nunjucks.configure(folder ? folder : __dirname);

                const data = await nunjucks.render(filePath, {
                    env,
                    status: e.status || e.message,
                    error: e.message,
                    stack: e.stack
                })

                ctx.status = status;
                 ctx.body = data;
            }catch(e){
                ctx.throw(500, `错误页渲染失败:${e.message}`)
            }
        }
    }
}