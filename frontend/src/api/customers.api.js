import axios from "./axios"; // se importa la configuración de axios creada

//Ruta para traer todos los datos del servidor
export const getCustomersRequest = () => axios.get("/customers");

//Ruta para crear un nuevo registro
export const createCustomerRequest = (customer) =>
  axios.post(`/customers`, customer);

//Ruta para actualizar un dato seleccionado
export const updateCustomerRequest = (customer, id) =>
  axios.put(`/customers/${id}`, customer);

//Ruta para borrar un registro
export const deleteCustomerRequest = (id) => axios.delete(`/customers/${id}`);
