import { Router } from "express";

//Se importan las funciones del controllador para crear las rutas de la API
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from "../controllers/customers.controller.js";

const router = Router(); //Se crea un router para realizar las peticiones get, post, put y delete

router.get("/customers", getAllCustomers);

router.post("/customers", createCustomer);

router.put("/customers/:id", updateCustomer);

router.delete("/customers/:id", deleteCustomer);

export default router;
