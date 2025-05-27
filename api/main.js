import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv'


const PORT = 8080;

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors()) 

const database = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "employee_manager"
}).promise()

const testConnection = async () => {
    try {
        await database.query('SELECT 1');
        console.log('Database connected');
    } catch (err) {
        console.error('Database couldnt connect', err.message);
    }
}

await testConnection();

console.log('connect using:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME
});

app.get("/api", (req,res) => {
    res.json("Hello")
});

app.get("/api/employee", async (req, res) => {
  try{
    const data = await database.query(`
      SELECT employee.id, employee.name, category.category_name, employee.phone_number, employee.birth_day, employee.hire_date, employee.salary 
      FROM employee 
      LEFT JOIN category ON employee.category_id = category.id;
      `);
    return res.json(data[0])
  }catch(err){
    console.error("Error getting employees")
  }
});

app.get("/api/category", async (req, res) => {
  try{
    const data = await database.query("SELECT * FROM category");
    return res.json(data[0])
  }catch(err){
    console.error("Error getting category\n", err);
  }
});

app.get("/api/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await database.query("SELECT * FROM employee WHERE id = ?", [id]);

    return res.json(data[0][0]);
  } catch (err) {
    console.error("Error fetching employee\n", err.message);
  }
});


app.put("/api/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id, phone_number, birth_day, hire_date, salary } = req.body;

    const [data] = await database.query(
      `UPDATE employee 
       SET name = ?, category_id = ?, phone_number = ?, birth_day = ?, hire_date = ?, salary = ? 
       WHERE id = ?`,
      [name, category_id, phone_number, birth_day, hire_date, salary, id]
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
    const data = await database.query("INSERT INTO employee (name, category_id, phone_number, birth_day, hire_date, salary) VALUES (?, ?, ?, ?, ?, ?)", values);
    
    return res.json(true);

    }catch(err){
    console.error("Failed to insert employee\n", err.message);
    return res.json(false);
    }

})

app.delete("/api/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await database.query("DELETE FROM employee WHERE id = ?", [id]);
    return res.json(true);

  } catch (err) {
    console.error("Error deleteing employee\n", err.message);
    return res.json(true);
  }
});


app.listen(PORT, () => {
    console.log("Listening... to " + PORT)
})