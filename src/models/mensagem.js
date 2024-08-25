"use strict";
import { DataTypes, Model } from "sequelize";

class Mensagem extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        usuario: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "o campo 'usuario' é obrigatório",
            },
            notEmpty: {
              msg: "o campo 'usuario' deve ser preenchido",
            },
            len: {
              args: [8, 20],
              msg: "o campo 'usuario' deve ter entre 8 a 20 caracteres",
            },
          },
        },
        conteudo: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "o campo 'conteudo' é obrigatório",
            },
            notEmpty: {
              msg: "o campo 'conteudo' deve ser preenchido",
            },
            len: {
              args: [1, 150],
              msg: "o campo 'conteudo' deve ter entre 8 a 20 caracteres",
            },
          },
        },
        gostei: { type: DataTypes.INTEGER, defaultValue: 0 },
      },
      {
        sequelize,
        modelName: "mensagens",
        underscored: true,
      }
    );
  }
}

export default Mensagem;
