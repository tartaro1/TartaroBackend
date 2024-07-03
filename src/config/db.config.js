import { config } from "dotenv"
import mysql from "mysql2/promise"
config();
/**
 * conexion base de datos
 * @type {Object}
 */
const pool =  mysql.createPool({
    host:"db4free.net",
    port:process.env.MYSQLPORT,
    user: "tartaro",
    password: "tartaroroot",
    database:"tartaro"
})
// const pool =  mysql.createPool({
//     host:process.env.MYSQLHOST,
//     port:process.env.MYSQLPORT,
//     user:process.env.MYSQLUSER || 'ur2g5uxifdmetppw',
//     password:process.env.MYSQLPASSWORD || 'UAlddoPRkfLlc6IxUIXA',
//     database:process.env.MYSQLDATABASE ||'b0u1bfs2gghv9cwqhexp',
//     waitForConnections: true,
//     connectionLimit: 5,
//     queueLimit: 0
// })
export default pool;