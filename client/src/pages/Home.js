import React, { useEffect, useState } from 'react';
import "./home.css"
import { Link } from 'react-router-dom';
import { decoder } from '../decodeSinhala';

const url = "http://localhost:8080/api/employee";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [translate, setTranslate] = useState(false);

  const getEmployees = async () => {
    try {
    const res = await fetch(url, {
        method: "GET"
    });
    const data = await res.json();
    setEmployees(data);

    }catch (error) {
    console.error("Error getting employees\n", error);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Do you want to Delete Employee: {id: ${id}, name: ${name}} from the database`);
    if (confirmDelete){
      try{
        const res = await fetch(`${url}/${id}`, {
            method: "DELETE"
        })
        if(!res.json()){
          console.log("Something went wrong while deleting employee")
        }
        getEmployees();
      }catch (err){
        console.error("Something went wrong while deleting employee\n", err)
      }
    }else{
      return;
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className='home-page'>
      <div className='nav'>
        <button className='translate-btn' onClick={() => {setTranslate(!translate)} }>Translate names to {translate ? "English" : "Sinhala"}</button>
      </div>
      <div className='table-div'>
        <Link to={'/add'}><button className='add-btn'>Add New Employee</button></Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Phone Number</th>
              <th>BirthDay</th>
              <th>Hired Date</th>
              <th>Salary</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr className='data-row' key={employee.id}>
                <td>{employee.id}</td>
                <td className={translate? 'name-sinhala' : 'name-english'}>{translate ? decoder(employee.name) : employee.name}</td>
                <td>{employee.category_name}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.birth_day.slice(0, 10)}</td>
                <td>{employee.hire_date.slice(0, 10)}</td>
                <td>{employee.salary}</td>
                <td className='table-btn'><Link to={`/edit/${employee.id}`}><button className='edit-btn'>Edit</button></Link></td>
                <td className='table-btn'><button className='del-btn' onClick={() => {handleDelete(employee.id, employee.name)}}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
