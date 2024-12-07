import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize: Sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "mysql",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Isso evita problemas de SSL no Heroku
        },
      },
    })
  : new Sequelize(
      process.env.MYSQL_DB as string,
      process.env.MYSQL_USER as string,
      process.env.MYSQL_PASSWORD as string,
      {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT as string),
        dialect: "mysql",
      }
    );

export default sequelize;