import { Sequelize } from "sequelize";
import { config } from "dotenv";
import { initModels } from "./models/index.js";

config();

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT || 3306),
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false
    }
  }
);

const models = initModels(sequelize);

export { sequelize, models };
