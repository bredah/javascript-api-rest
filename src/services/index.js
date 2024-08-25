import { models } from "../models";
import MensagemService from "./mensagemService";

export const mensagemService = new MensagemService(models.mensagem);
