import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "@jest/globals";
import request from "supertest";
import seedMensagens from "../../database/seeders/20240815191333-mensagens";
import { models, sequelize } from "../../src/models";
import app from "../../src/server";

let dataMensagens;
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await seedMensagens.up(sequelize.getQueryInterface(), sequelize);
  dataMensagens = await models.mensagem.findAll();
});

afterEach(async () => {
  await models.mensagem.truncate();
});

describe("gerir mensagens", () => {
  test("deve permitir registrar mensagem", async () => {
    const msgData = {
      usuario: "usuario_00",
      conteudo: "olá mundo",
    };

    const response = await request(app).post("/mensagens").send(msgData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(msgData);
  });

  test("deve permitir registrar mensagem via requisição", async () => {
    const msgData = dataMensagens[0];

    const response = await request(app).get(`/mensagens/${msgData.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(msgData.id);
  });

  test("deve permitir registrar mensagem via requisição", async () => {
    const msgData = dataMensagens[0];

    const response = await request(app).get(`/mensagens/${msgData.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(msgData.id);
  });

});
