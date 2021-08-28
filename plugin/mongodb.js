const plugin =  require('fastify-plugin')

async function dbConnector(fastify,options){
    fastify.register(require('fastify-mongodb'),{
        url:process.env.MONGODB
    })
}

module.exports = plugin(dbConnector)