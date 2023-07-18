// CommonJs


function build() {
    const tasks = []; // TODO Save this in a database

    const fastify = require('fastify')({
        logger: true
    });

    fastify.get('/task', async () => {
        return tasks;
    })

    fastify.post('/task', async (req, response) => {
        if("title" in req.body && "description" in req.body) {
            tasks.push(req.body);
            return;
        }

        // Return an HTTP code that indicates "hey, what you sent me is no bueno."
        response.status(400);
        return {message: "Invalid request"};
    });
    return fastify;
}

exports.build = build;
