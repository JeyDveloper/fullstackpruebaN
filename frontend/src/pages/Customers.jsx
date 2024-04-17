import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCustomer } from "../context/CustomerContext";
import { Link } from "react-router-dom";

function Customers() {
  //se llaman propiedades de react-hook-form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Se importa las funciones y variables necesarias que se utilizará en la página
  const {
    customers,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomer();

  //Se crean manejadores de estados para facilitar respuestas y estados de la página

  /*En este estado prefuntamos si está dilegenciado un formulario, para de esta manera
  deshabilitar otros botones que pueden interrumpir las operaciones*/
  const [formIsActivate, setFormIsActivate] = useState(false);

  /*Este controlador me permite mostrar los botones correspondiente para crear un registro desde cero
  o los botones de edición, todo depende de su estado*/
  const [newUser, setNewUser] = useState(false);

  /*Este estado es el que me permite saber si a la hora guardar la función submit sabrá si debe 
  actualizar o crear desde cero */
  const [paramId, setParamId] = useState(0);

  /*Este estado ayuda a cambiar los botnoes de la tabla de su estado activo a inactivo */
  const [activeEditButton, setActiveEditButton] = useState(null);

  //Se hace un uso de un useEffect par a mantener los datos que estan el bd actualizado a simple vista
  useEffect(() => {
    getCustomers();
  },[]);

  //Se crea la función que se encargará de enviar los datos a la API
  const onSubmit = handleSubmit(async (data) => {
    try {
      /*Primero se verifica si no un id, esto es es porque si se quiere editar un dato,
      los datos se verán reflejados en el mismo formulario que se utiliza para crear un
      registro desde cero*/
      if (paramId !== 0) {
        console.log("editando");
        updateCustomer({ ...data }, paramId); //Se actualiza el registro
        setFormIsActivate(false);
        setValue("brand", "");
        setValue("office", "");
        setValue("name", "");
        setActiveEditButton(null);
      } else {
        createCustomer({ ...data });
        setFormIsActivate(false);
        setValue("brand", "");
        setValue("office", "");
        setValue("name", "");
      }
    } catch (error) {
      console.log(error);
    }
  });

  //Contenido de la página
  return (
    <div className="w-full h-screen">
      {/*Contenedor principal*/}
      <div className="w-full flex-col h-[calc(100vh-70px)] p-10">
        {/*Contenido de la página */}
        {/*Botones para la navegación de páginas */}
        <div className="z-30 flex space-x-4 mb-3">
          <Link to={"/"} className="hover:cursor-pointer z-30">
            <img src="/Imagologo_motion.svg" className="w-10" />
          </Link>
          <Link to={"/customers"} className="hover:cursor-pointer z-30">
            <img src="/Icon_Customers.svg" className="w-10" />
          </Link>
        </div>
        {/*Contenedor de los objetos*/}
        <div className="flex flex-row p-3 w-full space-x-16 justify-between">
          <div className="w-1/2 px-5">
            {/*Contenedor del botón crear del formulario*/}
            <div className="w-full shadow-[0px_3px_10px_4px_rgba(197,197,197,1)] p-7 rounded-2xl bg-white">
              {/*Primero se confirma que el formulario no se esté utilizando*/}
              {formIsActivate ? (
                <>
                  {/* Si el formulario está activo el botón no podrá realizar ninguna función*/}
                  <button
                    className="z-30 flex absolute justify-self-start -mt-3 -ml-1 w-6"
                    disabled
                  >
                    <img src="/Icon_crear1.svg" />
                  </button>
                </>
              ) : (
                <>
                  {/*Si el formulario no está activo ya se puede ejecutar*/}
                  <button
                    onClick={() => {
                      setFormIsActivate(true);
                      setNewUser(true);
                      setParamId(0);
                      setValue("brand", "");
                      setValue("office", "");
                      setValue("name", "");
                    }}
                    className="z-30 flex absolute justify-self-start -mt-3 -ml-1 w-6"
                  >
                    <img src="/Icon_crear.svg" />
                  </button>
                </>
              )}
              <form onSubmit={onSubmit} className="w-full flex-col px-5">
                <div className="flex gap-10">
                  {/* Para cada icono tambíen se hace una validación para saber cual ruta de imagen mostrar*/}
                  <div className="w-10 flex">
                    {formIsActivate ? (
                      <>
                        <img src="/Icon_vehiculo1.svg" />
                      </>
                    ) : (
                      <>
                        <img src="/Icon_vehiculo.svg" />
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    name="brand"
                    {...register("brand", { required: true })}
                    disabled={!formIsActivate}
                    className="w-full  text-gray pl-7 py-2 rounded-2xl my-2 border-2 border-gray focus:border-blue-light focus:outline-none transition-colors duration-700"
                    placeholder="Marca"
                  />
                </div>
                {/*React-hook-form permite manejar el formulario para que no hayan valores en blanco*/}
                {errors.brand && (
                  <p className="text-red w-full pl-20">
                    Debe ingresar la marca
                  </p>
                )}
                <div className="flex gap-10">
                  <div className="w-10 flex">
                    {formIsActivate ? (
                      <>
                        <img src="/Icon_puntoubicacion1.svg" />
                      </>
                    ) : (
                      <>
                        <img src="/Icon_puntoubicacion.svg" />
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    name="office"
                    {...register("office", { required: true })}
                    disabled={!formIsActivate}
                    className="w-full  text-gray pl-7 py-2 rounded-2xl my-2 border-2 border-gray focus:border-blue-light focus:outline-none transition-colors duration-1000"
                    placeholder="Sucursal"
                  />
                </div>
                {errors.office && (
                  <p className="text-red w-full pl-20">
                    Debe ingresar la sucursal
                  </p>
                )}
                <div className="flex gap-10">
                  <div className="w-10 flex">
                    {formIsActivate ? (
                      <>
                        <img src="/Icon_persona1.svg" />
                      </>
                    ) : (
                      <>
                        <img src="/Icon_persona.svg" />
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    disabled={!formIsActivate}
                    className="w-full  text-gray pl-7 py-2 rounded-2xl my-2 border-2 border-gray focus:border-blue-light focus:outline-none transition-colors duration-700"
                    placeholder="Aspirante"
                  />
                </div>
                {errors.name && (
                  <p className="text-red w-full pl-20">
                    Debe ingresar un nombre
                  </p>
                )}
                <div className="flex w-full gap-2 justify-end">
                  {/*Se verifican dos estados, primero si el formulario está habilitado, y segundo si
                  se está creando o editando
                  */}
                  {formIsActivate &&
                    (newUser ? (
                      <>
                        {/*Si es un nuevo registro el formulario mostrá los botones de correspondiente*/}
                        <div className="w-full flex justify-end space-x-14 mt-2">
                          <button
                            onClick={() => {
                              setFormIsActivate(false);
                              setValue("brand", "");
                              setValue("office", "");
                              setValue("name", "");
                            }}
                            className="w-1/3 border-pink border-2 rounded-md px-5 py-1 text-gray"
                          >
                            cancelar
                          </button>
                          <button
                            type="submit"
                            className="w-1/3 border-blue-light border-2 rounded-md px-5 py-1 text-gray"
                          >
                            crear
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/*En caso de que se está editando se mostrarán otros botones*/}
                        <div className="w-full flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setFormIsActivate(false);
                              setParamId(0);
                              setActiveEditButton(null);
                              setValue("brand", "");
                              setValue("office", "");
                              setValue("name", "");
                            }}
                            className="w-7"
                          >
                            <img src="/Icon_cancelar.svg" />
                          </button>
                          <button type="submit" className="w-7">
                            <img src="/Icon_confirmar.svg" />
                          </button>
                        </div>
                      </>
                    ))}
                </div>
              </form>
            </div>
          </div>

          <div className="w-1/2">
            {/*Tabla que trae los datos*/}
            <table className="grid grid-cols-1">
              <thead className="">
                <tr className="grid grid-cols-3 gap-x-2 w-full p-0">
                  <th className="bg-pink text-white w-auto">
                    <h1>Marca</h1>
                  </th>
                  <th className="bg-pink text-white w-auto">
                    <h1>Sucursal</h1>
                  </th>
                  <th className="bg-pink text-white w-auto">
                    <h1>Aspirante</h1>
                  </th>
                </tr>
              </thead>
              <tbody className=" max-h-[400px] overflow-auto no-scrollbar">
                {/*Para mostrar los datos llaman y recorre los datos que contiene 
                customer (que viene del context) y por cada registro inserta el valor correspondiente
                en cada campo*/}
                {customers.map((customer) => (
                  <div key={customer.id}>
                    <tr className="grid grid-cols-3 gap-x-2 w-full p-0 justify-items-center my-2">
                      <td className="w-full text-left pl-2">
                        <p>{customer.car_brand}</p>
                      </td>
                      <td className="w-full text-left pl-14">
                        <p>{customer.office}</p>
                      </td>
                      <td className="w-full flex gap-2 pl-2">
                        <p className="w-3/4">{customer.customer_name}</p>
                        <div className="flex w-1/4 gap-2">
                          {/*Para los botones que se encuentran dentro de la tabla también verifican 
                          que el formulario no esté activo para poder ser habilitados*/}
                          {formIsActivate ? (
                            /*Esta compración permite saber cuál registro se está editando, sin embarlo los
                            botones no pueden ejecutar ninguna accíon ya que si está editando se debe utilizar
                            los botones del formulario*/
                            activeEditButton === customer.id ? (
                              <>
                                <button className="w-4" disabled>
                                  <img
                                    src="/Icon_editar1.svg"
                                    alt="Botón editar"
                                  />
                                </button>
                                <button className="w-4" disabled>
                                  <img
                                    src="/Icon_eliminar1.svg"
                                    alt="Botón eliminar"
                                  />
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="w-4" disabled>
                                  <img
                                    src="/Icon_editar.svg"
                                    alt="Botón editar"
                                  />
                                </button>
                                <button className="w-4" disabled>
                                  <img
                                    src="/Icon_eliminar.svg"
                                    alt="Botón eliminar"
                                  />
                                </button>
                              </>
                            )
                          ) : (
                            <>
                              {/*Aquí veo el valor por defecto de los botones*/}
                              <button
                                onClick={() => {
                                  setActiveEditButton(customer.id);
                                  setFormIsActivate(true);
                                  setNewUser(false);
                                  setParamId(customer.id);
                                  setValue("brand", customer.car_brand);
                                  setValue("office", customer.office);
                                  setValue("name", customer.customer_name);
                                }}
                                className="w-4"
                              >
                                <img
                                  src="/Icon_editar1.svg"
                                  alt="Botón editar"
                                />
                              </button>
                              <button
                                onClick={() => deleteCustomer(customer.id)}
                                className="w-4"
                              >
                                <img
                                  src="/Icon_eliminar1.svg"
                                  alt="Botón eliminar"
                                />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="w-full grid grid-cols-1 col-span-3">
                        <hr className="border-pink border" />
                      </td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/*Se agrega un pie de página*/}
      <footer>
        <div className="w-full flex justify-center">
          <img src="/Imagologotipo_motion.svg" className="w-40" />
        </div>
      </footer>
    </div>
  );
}

export default Customers;
