import { pool } from "../db.js"; //Se importa la conexión a la base de datos

//función para obtener todos los registros de la base de datos
export const getAllCustomers = async (req, res, next) => {
  try {
    const allCustomers = await pool.query(
      "SELECT * FROM customers ORDER BY id"
    );
    res.json(allCustomers.rows);
  } catch (error) {
    next(error);
  }
};

//función para crear un nuevo registro
export const createCustomer = async (req, res, next) => {
  const { name, office, brand } = req.body;

  try {
    const customer = await pool.query(
      "INSERT INTO customers (customer_name, office, car_brand) VALUES ($1, $2, $3) RETURNING *",
      [name, office, brand]
    );
    res.json(customer.rows[0]);
  } catch (error) {
    next(error);
  }
};

//función para modificar un determinado registro
export const updateCustomer = async (req, res, next) => {
  const { id } = req.params;
  const { name, office, brand } = req.body;
  try {
    const updateCostumer = await pool.query(
      "UPDATE customers SET customer_name = $1, office = $2, car_brand = $3 WHERE id = $4 RETURNING *",
      [name, office, brand, id]
    );

    if (updateCostumer.rowCount === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }
    return res.json(updateCostumer.rows[0]);
  } catch (error) {
    next(error);
  }
};

//función para eliminar un registro
export const deleteCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const delCostumer = await pool.query(
      "DELETE FROM customers WHERE id = $1",
      [id]
    );

    if (delCostumer.rowCount === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }
    return res.status(204).json({
      message: "Customer deleted",
    });
  } catch (error) {
    next(error);
  }
};
