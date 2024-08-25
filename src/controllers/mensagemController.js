import MensagemService from "../services/mensagemService";

class MensagemController {
  /**
   * @param {MensagemService} service
   */
  constructor(service) {
    this.service = service;
  }

  async registrar(req, res) {
    try {
      const mensagem = await this.service.registrar(req.body);
      res.status(201).json(mensagem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscar(req, res) {
    try {
      const mensagem = await this.service.buscarPorId(req.params.id);
      return res.status(200).json(mensagem);
    } catch (error) {
      return res.status(404).json({
        code: 2001,
        error: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const mensagemAtualizada = await this.service.atualizar(
        req.params.id,
        req.body
      );
      if (!mensagemAtualizada) {
        return res.status(404).json({ error: "mensagem não encontrada" });
      }
      res.status(200).json(mensagemAtualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      await this.service.eliminar(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default MensagemController;
