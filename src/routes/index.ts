import{ Router} from "express";
import { home, timeAtual } from "../controllers/homeController";
import { filaClientes, filaClientesGet} from "../controllers/clientesController";
import * as pagination from "../controllers/paginationController";
import * as ordination from "../controllers/ordinationController";
import {pesquisar} from "../controllers/researchController";
import * as btn from "../controllers/btnController";

const router = Router();

//Rotas de Home
router.get("/", home);
router.get("/horario-atual", timeAtual);

//Rotas de Clients
router.get("/fila-de-espera", filaClientesGet);
router.post("/fila-de-espera", filaClientes);

//Rotas de Botoes
router.post("/fila-de-espera/:id/:name/editar", btn.editar);
router.get("/fila-de-espera/:id/deletar", btn.deletar)
router.get("/fila-de-espera/:id/chamando-cliente", btn.chamarCliente)
router.post("/fila-de-espera/:id/chamando-cliente", btn.chamarCliente)
router.get("/fila-de-espera/:id/cliente-desistiu", btn.clienteDesistiu)
 
//Rotas de ordernação
router.get("/fila-de-espera", ordination.chegada)
router.get("/fila-de-espera/recentes", ordination.recentes)
router.get("/fila-de-espera/aguardando", ordination.aguardando)
router.get("/fila-de-espera/chamados", ordination.chamados)
router.get("/fila-de-espera/desistentes", ordination.desistentes)

//Rota de pesquisa
router.post("/fila-de-espera/pesquisar", pesquisar)

//Rotas de paginação
router.get("/fila-de-espera2", pagination.pagina2)
router.get("/fila-de-espera3", pagination.pagina3)
router.get("/fila-de-espera/recentes2", pagination.paginaRescentes2)
router.get("/fila-de-espera/recentes3", pagination.paginaRescentes3)
router.get("/fila-de-espera/aguardando2", pagination.paginaAguardando2)
router.get("/fila-de-espera/aguardando3", pagination.paginaAguardando3)
router.get("/fila-de-espera/chamados2", pagination.paginaChamados2)
router.get("/fila-de-espera/chamados3", pagination.paginaChamados3)
router.get("/fila-de-espera/desistentes2", pagination.paginaDesistentes2)
router.get("/fila-de-espera/desistentes3", pagination.paginaDesistentes3)


export default router;