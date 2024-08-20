"use strict";
const dataPadrao = new Date("2024-06-15T12:30:55Z");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.bulkInsert("mensagens", [
      {
        id: "b1f7d408-6ba5-4e35-898a-d4a149e0ef3a",
        usuario: "usuario_01",
        conteudo: "conteudo 01",
        gostei: 0,
        created_at: dataPadrao,
        updated_at: dataPadrao,
      },
      {
        id: "56e17f6d-c899-4aed-9283-068ed86665af",
        usuario: "usuario_02",
        conteudo: "conteudo 02",
        gostei: 0,
        created_at: dataPadrao,
        updated_at: dataPadrao,
      },
      {
        id: "a0e315a8-a795-496b-aee8-a096e44c026b",
        usuario: "usuario_03",
        conteudo: "conteudo 03",
        gostei: 0,
        created_at: dataPadrao,
        updated_at: dataPadrao,
      },
    ]);
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("mensagens", null, {});
  },
};
