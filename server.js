const fastify = require('fastify')()

fastify.register(require('fastify-env'),{
    dotenv:true,
    schema:{
        type:'object',
        properties:{
           MONGODB:{
            type:'string',
            default:''
           }
        },
        required:['MONGODB']
    }
})

fastify.register(require('./plugin/mongodb'))

fastify.register(require('./routes/routes'),{prefix:'/api'})

const start =async ()=>{
    try {
        await fastify.listen(5000)
    } catch (error) {
        console.log(error)
        fastify.log.error(error) 
        process.exit(1)       
    }
}

start();