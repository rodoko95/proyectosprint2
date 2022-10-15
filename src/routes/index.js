import { Router } from 'express';
import {
    homeTlfn, 
    formCliente,
    listadoclientes,
    borrarCliente,
    getClienteByID,
    updateClientes,
    getPlans,
    getFeatures,
    getPedidos
} from '../controllers/controllerTlfn.js';



export const router = Router();

router.get('/', homeTlfn);
router.get('/plans', getPlans);
router.get('/features', getFeatures);
router.get('/clientela', listadoclientes);
router.get('/pedidos', getPedidos);
router.post('/addPedidos', formCliente);
router.get('/editarconsulta/:id', getClienteByID);
//router.get('/clientela', formCliente);
router.put('/editarconsulta/:id', updateClientes);
router.get('/delete/:id', borrarCliente);
