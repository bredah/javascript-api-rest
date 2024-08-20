import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

class DataBaseFactory {
  constructor() {
    if (!DataBaseFactory.instance) {
      this.sequelize = this._initializeSequelize();
      DataBaseFactory.instance = this;
    }
  }

  _initializeSequelize() {
    const config =
      process.env.NODE_ENV === "test"
        ? {
            options: {
              dialect: "sqlite",
              storage: ":memory:",
              logging: false,
            },
          }
        : {
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            options: {
              dialect: process.env.DB_HOST,
              host: process.env.DB_HOST,
              port: process.env.DB_PORT,
              sync: process.env.DB_SYNC === "true" || false,
              logging: process.env.DB_LOGGING === "true" || false,
            },
          };
    return new Sequelize(
      config.dababase || undefined,
      config.username || undefined,
      config.password || undefined,
      config.options
    );
  }

  connect() {}

  async disconnect() {
    if (this.sequelize) {
      await this.sequelize.close();
      this.sequelize - null;
      console.log("conexão com a base de dados foi encerrada");
    } else {
      console.log("não existe conexão ativa com a base de dados");
    }
  }
}

const databaseFactory = new DataBaseFactory();
export default databaseFactory.sequelize;
