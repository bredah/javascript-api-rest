import { mensagemService } from "../services";
import MensagemController from "./mensagemController";

export const mensagemController = new MensagemController(mensagemService);
