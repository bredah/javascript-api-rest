import { Given, When, Then } from "@cucumber/cucumber";
import app from "../../../src/server";
import request from "supertest";
import assert from "assert";

let payload, response;

Given("que eu tenha uma mensagem válida", function () {
  payload = {
    usuario: "usuario_01",
    conteudo: "olá mundo",
  };
});

Given("que eu tenha uma mensagem sem o campo usuário", function () {
  payload = {
    conteudo: "olá mundo",
  };
});

When("enviar a mensagem para cadastrar", async () => {
  response = await request(app).post("/mensagens").send(payload);  
});

Then("a mensagem deve ser registrada com sucesso", function () {
  assert.equal(response.status, 201);
});

Then("a mensagem não é cadastrada", function () {
  assert.equal(response.status, 500);
});

Then(
  "deve apresentar erro indicando que o campo 'usuário' é obrigatório",
  function () {
    assert.ok(response.body.error.includes("o campo 'usuario' é obrigatório"))
  }
);
