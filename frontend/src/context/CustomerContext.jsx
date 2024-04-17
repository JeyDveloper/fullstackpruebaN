import { createContext, useContext, useState } from "react";

//Se importan las funciones que contienen las rutas para realizar peticiones
import {
  createCustomerRequest,
  deleteCustomerRequest,
  getCustomersRequest,
  updateCustomerRequest,
} from "../api/customers.api";

//Se crea un contexto (permitirá compartir los datos a todas las páginas dentro de éste)
export const CustomerContext = createContext();

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("Error with usCustomer");
  }
  return context;
};

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]); //Controlador de estado que manejará los registros

  //Función para traer todos los registros
  const getCustomers = async () => {
    try {
      const res = await getCustomersRequest();
      setCustomers(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  //Función para guardar un nuevo registro
  const createCustomer = async (customer) => {
    try {
      const res = await createCustomerRequest(customer);
      //después de crear el registro se añade a los ya contenido en customers para mostrarlos en pantalla y evitar refrezcar la página
      setCustomers([...customers, { ...res.data }]);
    } catch (error) {
      console.log(error.data);
    }
  };

  //Función para actualizar datos
  const updateCustomer = async (customer, id) => {
    try {
      const res = await updateCustomerRequest(customer, id);
      //Después de actualizar un dato se realiza una busqueda en los datos cargados, esto permite ver las modificaciones de un dato editado de forma inmediata
      setCustomers(
        customers.map((customer) => (customer.id === id ? res.data : customer))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Función para borrar datos
  const deleteCustomer = async (id) => {
    try {
      const res = await deleteCustomerRequest(id);
      //Después de eliminar los datos se hace una limpieza en los registros para remover de forma inmediarta de la lista de registros el elemento eliminado
      if (res.status === 204)
        setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //Se pasan los datos que podrán ser utilizado desde todas las páginas contenidas en el context
  return (
    <CustomerContext.Provider
      value={{
        customers,
        getCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
