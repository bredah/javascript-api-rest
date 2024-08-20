import Mensagem from "./mensagem";
import sequelize from "../config/databaseFactory";

const models = {
  mensagem: Mensagem.init(sequelize),
};

export { sequelize, models };
