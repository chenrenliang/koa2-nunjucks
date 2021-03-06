// var log4js = require('log4js')
// var logger = log4js.getLogger()
// logger.level = 'debug'

// logger.debug('some debug messages')


// 日志文件产生的位置就是当前启动环境的位置。
const log4js  = require('log4js')
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'cheese.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
});

const logger = log4js.getLogger('cheese')

logger.trace('Enter cheese testing')
logger.debug('Got cheese.')

logger.info('Cheese is Gouda.')
logger.warn('Cheese is quite smelly')

logger.error('Cheese is too ripe!')
logger.fatal('Cheese was breeding ground for listeria.')