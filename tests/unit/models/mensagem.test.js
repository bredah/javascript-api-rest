import { beforeAll, afterAll, describe, test, expect } from "@jest/globals";
import Mensagem from "../../../src/models/mensagem";
import sequelize from "../../../src/config/databaseFactory";
import { validate } from "uuid";

beforeAll(async () => {
  Mensagem.init(sequelize);
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  Mensagem.truncate();
});

afterAll(async () => {
  await sequelize.close();
});

describe("modelo: mensagem", () => {
  describe("contexto: registrar", () => {
    test("deve permirtir registrar uma mensagem valida", async () => {
      const dadosDaMensagem = {
        usuario: "usuario_00",
        conteudo: "olá mundo!",
      };

      const mensagem = Mensagem.build(dadosDaMensagem);
      const mensagemSalva = await mensagem.save();
      expect(mensagemSalva.id).toBeDefined();
      expect(validate(mensagemSalva.id)).toBeTruthy();
      expect(mensagemSalva.usuario).toBe(dadosDaMensagem.usuario);
      expect(mensagemSalva.conteudo).toBe(dadosDaMensagem.conteudo);
      expect(mensagemSalva.gostei).toBeDefined();
      expect(mensagemSalva.gostei).toBe(0);
    });

    test("não deve permitir registrar mensagem sem o campo usuario", async () => {
      const dadosDaMensagem = {
        conteudo: "olá mundo!",
      };
      const mensagem = Mensagem.build(dadosDaMensagem);
      await expect(mensagem.validate()).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining("o campo 'usuario' é obrigatório"),
        })
      );
    });

    test("não deve permitir registrar mensagem com o campo usuario vazio", async () => {
      const dadosDaMensagem = {
        usuario: "",
        conteudo: "olá mundo!",
      };
      const mensagem = Mensagem.build(dadosDaMensagem);
      await expect(mensagem.validate()).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            "o campo 'usuario' deve ser preenchido"
          ),
        })
      );
    });

    test("não deve permitir registrar mensagem com o campo usuario com mais de 10 caracteres", async () => {
      const dadosDaMensagem = {
        usuario: "usuario com mais de 20 caracteres",
        conteudo: "olá mundo!",
      };
      const mensagem = Mensagem.build(dadosDaMensagem);
      await expect(mensagem.validate()).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            "o campo 'usuario' deve ter entre 8 a 20 caracteres"
          ),
        })
      );
    });

    test("não deve permitir registrar mensagem com o campo usuario com menos de 10 caracteres", async () => {
      const dadosDaMensagem = {
        usuario: "usuario",
        conteudo: "olá mundo!",
      };
      const mensagem = Mensagem.build(dadosDaMensagem);
      await expect(mensagem.validate()).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            "o campo 'usuario' deve ter entre 8 a 20 caracteres"
          ),
        })
      );
    });

    test("não deve permitir registrar mensagem sem o campo conteúdo", async () => {
      const mensagemData = { usuario: "UsuarioTeste" };

      const mensagem = Mensagem.build(mensagemData);
      await expect(mensagem.validate()).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining("o campo 'conteudo' é obrigatório"),
        })
      );
    });

    test("não deve permitir registrar mensagem com o campo conteúdo vazio", async () => {
      const mensagemData = {
        usuario: "usuario 1",
        conteudo: "",
      };

      const mensagem = Mensagem.build(mensagemData);
      await expect(mensagem.validate()).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            "o campo 'conteudo' deve ser preenchido"
          ),
        })
      );
    });
  });

  describe("contexto: buscar", () => {
    test("deve buscar uma mensagem por ID", async () => {
      const mensagemData = {
        usuario: "usuario_00",
        conteudo: "Olá, mundo!",
      };

      const mensagem = await Mensagem.create(mensagemData);
      const mensagemEncontrada = await Mensagem.findByPk(mensagem.id);

      expect(mensagemEncontrada).toBeDefined();
      expect(mensagemEncontrada.usuario).toBe(mensagemData.usuario);
      expect(mensagemEncontrada.conteudo).toBe(mensagemData.conteudo);
    });

    test("deve retornar null ao buscar uma mensagem com ID inexistente", async () => {
      const mensagemEncontrada = await Mensagem.findByPk(9999);
      expect(mensagemEncontrada).toBeNull();
    });
  });

  describe("contexto: remover", () => {
    test("deve permitir remover uma mensagem existente", async () => {
      const mensagemData = {
        usuario: "usuario_00",
        conteudo: "Olá, mundo!",
      };

      const mensagem = await Mensagem.create(mensagemData);
      await Mensagem.destroy({ where: { id: mensagem.id } });

      const mensagemEncontrada = await Mensagem.findByPk(mensagem.id);
      expect(mensagemEncontrada).toBeNull();
    });
  });
});
