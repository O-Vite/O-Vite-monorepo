import fastify from 'fastify'

const server = fastify()

server.get('/ping', () => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`) 
})