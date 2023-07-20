const { createClient } = require('redis');


async function saveToRedis(task) {
    const client = createClient({
        url: 'redis://localhost:6379'
    });
    client.connect();
    const tasksFromRedis = await client.get('tasks') ?? '[]';
    const tasks = JSON.parse(tasksFromRedis);
    tasks.push(task);
    client.set('tasks', JSON.stringify(tasks));
}

async function getTasksFromRedis() {
    const { REDIS_SERVER, REDIS_PORT } = process.env;
    const client = createClient({
        url: `redis://${REDIS_SERVER}:${REDIS_PORT}`
    });
    client.connect();
    const tasksFromRedis = await client.get('tasks')
    return JSON.parse(tasksFromRedis);

}

module.exports = {saveToRedis, getTasksFromRedis};