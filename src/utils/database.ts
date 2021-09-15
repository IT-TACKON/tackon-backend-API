import knex from 'knex'
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './env'

export default knex({
    client: 'mysql2',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    }
})