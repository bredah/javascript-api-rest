import { afterEach, describe, expect, test } from "@jest/globals";

import Mensagem from "../../../src/models/mensagem";
import MensagemService from "../../../src/services/mensagemService";

jest.mock("../../../src/models/mensagem");

const mensagemService = new MensagemService(Mensagem);
const MSG_ID = "71c869f0-ce23-4da0-804f-71e735199da3";

afterEach(() => {
  jest.clearAllMocks();
});

describe("service: mensagem", () => {
  describe("contexto: registrar", () => {
    test("deve permitir registrar mensagem", async () => {
      // Arrange
      mockRegistrarMensagem(msgMock());
      // Act
      const mensagemRegistrada = await mensagemService.registrar(msgData());
      // Assert
      expect(Mensagem.build).toHaveBeenCalledWith(msgData());
      expect(mensagemRegistrada).toEqual(msgMock());
    });

    test("deve lançar erro ao registrar mensagem", async () => {
      Mensagem.build.mockReturnValueOnce({
        save: jest.fn().mockRejectedValue(new Error("erro gerado pelo mock")),
      });

      await expect(mensagemService.registrar(msgData())).rejects.toThrow(
        "erro gerado pelo mock"
      );
    });
  });

  describe("contexto: listar", () => {
    test("deve permitir listar todas as mensagens", async () => {
      mockListarMensagens()

      const msgEncontradas = await mensagemService.listar();
      expect(msgEncontradas.length).toBe(2)
    });
    test("deve permitir listar todas as mensagens mesmo que existam", async () => {
      mockListarMensagensVazio();
      const msgEncontradas = await mensagemService.listar();
      expect(msgEncontradas.length).toBe(0)
    });

    test("deve gerar exceção quando houver erro ao obter mensagens", async () => {
      Mensagem.findAll.mockRejectedValue(new Error("erro gerado pelo mock"));
      await expect(mensagemService.listar()).rejects.toThrow("não foi possível obter as mensagens")
    });
  });
});

function msgData() {
  return {
    usuario: "usuario_00",
    conteudo: "olá  mundo",
  };
}

function msgMock() {
  return {
    id: MSG_ID,
    ...msgData(),
  };
}

function mockRegistrarMensagem(mensagem) {
  Mensagem.build.mockReturnValueOnce({
    ...mensagem,
    save: jest.fn().mockResolvedValue(mensagem),
    toJSON: jest.fn().mockResolvedValue(mensagem),
  });
}

function mockListarMensagens() {
  Mensagem.findAll.mockReturnValueOnce([msgMock(), msgMock()]);
}
function mockListarMensagensVazio() {
  Mensagem.findAll.mockReturnValueOnce([]);
}
