// Require the framework and instantiate it
const fastify = require('fastify')()
const shell = require('shelljs');

// Declare a route
fastify.get('/', async (request, reply) => {
  var test = shell.exec('./run.sh');
  return test.toString();
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()