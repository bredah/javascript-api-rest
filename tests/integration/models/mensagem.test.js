import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "@jest/globals";
import { validate } from "uuid";
import seedMensagens from "../../../database/seeders/20240815191333-mensagens";
import { models, sequelize } from "../../../src/models";

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

afterAll(async () => {
  await sequelize.close();
});

describe("model: mensagem", () => {
  describe("contexto: registrar", () => {
    test("deve permitir registrar uma mensagem", async () => {
      const msgData = {
        usuario: "usuario_00",
        conteudo: "olá mundo",
      };
      const mensagem = await models.mensagem.create(msgData);
      expect(validate(mensagem.id)).toBe(true);
      expect(mensagem.usuario).toBe(msgData.usuario);
      expect(mensagem.conteudo).toBe(msgData.conteudo);
      expect(mensagem.gostei).toBeDefined();
      expect(mensagem.gostei).toBe(0);
    });
  });

  describe("contexto: buscar", () => {
    test("deve permitir buscar mensagem por id", async () => {
      const msgData = dataMensagens[0];
      const msgEncontrada = await models.mensagem.findByPk(msgData.id);
      expect(msgEncontrada.id).toBe(msgData.id);
      expect(msgEncontrada.usuario).toBe(msgData.usuario);
      expect(msgEncontrada.conteudo).toBe(msgData.conteudo);
      expect(msgEncontrada.gostei).toBe(msgData.gostei);
    });
  });

  describe("contexto: atualizar", () => {
    test("deve permitir atualizar mensagem existente", async () => {
      const msgData = dataMensagens[1];
      const msgNovoConteudo = "olá novamente";
      const msgAtualizada = await models.mensagem.update(
        { conteudo: msgNovoConteudo },
        { where: { id: msgData.id } }
      );
      const msgEncontrada = await models.mensagem.findByPk(msgData.id);

      expect(msgAtualizada.length).toBe(1);
      expect(msgEncontrada.id).toBe(msgData.id);
      expect(msgEncontrada.usuario).toBe(msgData.usuario);
      expect(msgEncontrada.conteudo).toBe(msgNovoConteudo);
      expect(msgEncontrada.gostei).toBe(msgData.gostei);
    });
  });
  describe("contexto: remover", () => {
    test("deve permitir remover mensagem existente", async () => {
      const msgData = dataMensagens[2];
      await models.mensagem.destroy({
        where: { id: msgData.id },
      });
      const msgEncontrada = await models.mensagem.findByPk(msgData.id);
      expect(msgEncontrada).toBeNull();
    });
  });
});
