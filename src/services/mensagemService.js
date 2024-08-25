import MensagemModel from "../models/mensagem";

class MensagemService {
  /**
   * @param {MensagemModel} model
   */
  constructor(model) {
    this.model = model;
  }

  async registrar(mensagem) {
    try {
      const novaMensagem = this.model.build(mensagem);
      await novaMensagem.save();
      return novaMensagem.toJSON();
    } catch (error) {
      throw new Error(`erro ao registrar mensagem: ${error.message}`);
    }
  }

  async buscarPorId(id) {
    try {
      const mensagem = await this.model.findByPk(id);
      if (!mensagem) {
        throw new Error("mensagem não encontrada");
      }
      return mensagem.toJSON();
    } catch (error) {
      throw new Error(`erro ao obter a mensagem: ${id} - ${error.mesagem}`);
    }
  }

  async listar() {
    try {
      const mensagens = await this.model.findAll();
      return mensagens;
    } catch (error) {
      throw new Error("não foi possível obter as mensagens");
    }
  }

  async atualizar(id, mensagem) {
    try {
      const { conteudo } = mensagem;
      if (conteudo === undefined) {
        throw new Error(
          "o campo 'conteudo' é obrigatório para atualizar a mensagem"
        );
      }

      const [updatedCount] = await this.model.update(
        { conteudo },
        {
          where: { id },
        }
      );

      if (updatedCount === 0) {
        return null;
      }

      const updatedMessage = await this.model.findByPk(id);
      return updatedMessage ? updatedMessage.toJSON() : null;
    } catch (error) {
      throw new Error(`erro ao atualizar mensagem ${id}: ${error.message}`);
    }
  }

  async eliminar(id) {
    try {
      await this.buscarPorId(id);
      await this.model.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`não foi possível eliminar mensagem: ${id}`, error);
    }
  }
}

export default MensagemService;
