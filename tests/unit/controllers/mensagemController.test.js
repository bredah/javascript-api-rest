import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import MensagemController from "../../../src/controllers/mensagemController";
import MensagemService from "../../../src/services/mensagemService";

const MensagemModelMock = {
  build: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

const MSG_ID = "71c869f0-ce23-4da0-804f-71e735199da3";

let req;
let res;

const mensagemService = new MensagemService(MensagemModelMock);
const mensagemController = new MensagemController(mensagemService);

beforeEach(() => {
  req = { body: {}, params: {}, query: {} };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("controller: mensagem", () => {
  describe("contexto: registrar", () => {
    test("deve permitir registrar mensagem via requisição", async () => {
      // arrange
      MensagemModelMock.build.mockReturnValueOnce({
        ...msgMock(),
        save: jest.fn().mockResolvedValue(msgMock()),
        toJSON: jest.fn().mockResolvedValue(msgMock()),
      });
      req.body = msgData();
      // act
      await mensagemController.registrar(req, res);
      // assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(msgMock());
    });

    test("deve retornar erro ao registrar mensagem via requisição", async () => {
      MensagemModelMock.build.mockReturnValueOnce({
        save: jest.fn().mockRejectedValue(new Error("erro gerado pelo mock")),
      });

      req.body = msgData();

      await mensagemController.registrar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining("erro gerado pelo mock"),
        })
      );
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
