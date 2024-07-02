import { config } from "dotenv"
import mysql from "mysql2/promise"
config();
const pool =  mysql.createPool({
    host:process.env.MYSQLHOST,
    port:process.env.MYSQLPORT,
    user:process.env.MYSQLUSER || 'ur2g5uxifdmetppw',
    password:process.env.MYSQLPASSWORD || 'UAlddoPRkfLlc6IxUIXA',
    database:'b0u1bfs2gghv9cwq'
})
export default pool;