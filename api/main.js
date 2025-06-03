import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const PORT = 8080;

const SQL_HOST = process.env.DB_HOST || '127.0.0.1';
const USER = process.env.DB_USER || 'root';
const PW = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'employee_manager';
console.log('Connect using: ', { host: SQL_HOST, user: USER, database: DB_NAME });

const app = express()
app.use(express.json())
app.use(cors()) 

let database = mysql.createConnection({
    host: SQL_HOST,
    user: USER,
    password: PW,
    database: DB_NAME
}).promise()

const testConnection = async () => {
    try {
        await database.connect();
        console.log('Database connected');
        return true;
    } catch (err) {
        console.error('Database couldnt connect', err.message);
        return false;
    }
}
testConnection();

async function waitForConnection() {
  let connected = false;
  while (!connected) {

    database = mysql.createConnection({
      host: SQL_HOST,
      user: USER,
      password: PW,
      database: DB_NAME
    }).promise()

    connected = await testConnection();

    if (!connected) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

(async () => {
  await waitForConnection();
  console.log("Connected!");
})();

console.log('Connect using: ', { host: SQL_HOST, user: USER, database: DB_NAME });

app.get("/api", (req,res) => {
    res.json("Hello")
});

app.get("/api/employee", async (req, res) => {
  try{
    const data = await database.query(`CALL get_all_employees()`);
    return res.json(data[0][0])
  }catch(err){
    console.error("Error getting employees")
  }
});

app.get("/api/category", async (req, res) => {
  try{
    const data = await database.query("SELECT * FROM category");
    return res.json(data[0][0])
  }catch(err){
    console.error("Error getting category\n", err);
  }
});

app.get("/api/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await database.query(`CALL get_employee_byID(?)`,[id]);

    return res.json(data[0][0][0]);
  } catch (err) {
    console.error("Error fetching employee\n", err.message);
  }
});

app.put("/api/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id, phone_number, birth_day, hire_date, salary } = req.body;

    const [data] = await database.query(
      `CALL update_employee_byID(?, ?, ?, ?, ?, ?, ?)`,[id, name, category_id, phone_number, birth_day, hire_date, salary]
    );
    return res.json(true);

  } catch (err) {
    console.error("Error updating employee\n", err.message);
    return res.json(false);
  }
});

app.post("/api/employee", async (req, res) => {
    try{
    const { name, category_id, phone_number, birth_day, hire_date, salary } = req.body;
    const values = [name, category_id, phone_number, birth_day, hire_date, salary];
    const data = await database.query('CALL add_employee(?, ?, ?, ?, ?, ?)', values);
    
    return res.json(true);

    }catch(err){
    console.error("Failed to insert employee\n", err.message);
    return res.json(false);
    }

})

app.delete("/api/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await database.query('CALL delete_employee_byID(?)', [id]);
    return res.json(true);

  } catch (err) {
    console.error("Error deleteing employee\n", err.message);
    return res.json(false);
  }
});

app.listen(PORT, () => {
    console.log("Listening... to " + PORT)
})