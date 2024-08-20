'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mensagens', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUID,
      },
      usuario: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      conteudo: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      gostei: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mensagems');
  }
};