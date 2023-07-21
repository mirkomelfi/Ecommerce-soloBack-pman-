import winston from "winston";

let customLevelOpt={};

if (process.env.LOGGER_SELECTION==="1"){
    customLevelOpt = {
        levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            debug: 4
        },
        colors: {
            fatal: 'red',
            error: 'red',
            warning: 'yellow',
            info: 'blue',
            debug: 'blue'
        }
    }
}else{
    customLevelOpt = {
        levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3
        },
        colors: {
            fatal: 'red',
            error: 'red',
            warning: 'yellow',
            info: 'blue'
        }
    }
}



const logger = winston.createLogger({
    levels: customLevelOpt.levels, //Defino que los levels del logger sean los propios
    //Defino los transportes que va a contener mi logger (no definido, no utilizable)
    transports: [

        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'fatal',
            filename: './errors.log',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: './errors.log',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'warning',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
    ]
})
/*
if (process.env.LOGGER_SELECTION !== '1') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize({ colors: "green" }),
            winston.format.simple()
        )
    }));
  }
*/

export const addLogger = (req, res, next) => {
    req.logger = logger //Poder utilizar el logger definido previamente
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} `)
    next()
}

