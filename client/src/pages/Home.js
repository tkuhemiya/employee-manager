import React, { useEffect, useState } from 'react';
import "./home.css"
import { Link } from 'react-router-dom';
import { decoder } from '../decodeSinhala';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

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
    console.log(data)
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

const PDFButton = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    const headers = [["ID", "Name", "Employee category", "Phone number", "Birthday", "Hired date", "Salary"]];
    
    const data = employees.map(emp => ([
      emp.id,
      emp.name,
      emp.category_name,
      emp.phone_number,
      emp.birth_day.slice(0,10),
      emp.hire_date.slice(0,10),
      emp.salary
    ]));

    doc.text("Employee List", 15, 10);
    console.log(data,headers)
    autoTable(doc,{head: headers, body: data, startY: 20})
    // doc.autoTable({head: headers, body: data, startY: 20})

    doc.save("employee_list.pdf");
  };

  return (
    <button onClick={generatePDF}>
      Download Employee List
    </button>
  );
}

  return (
    <div className='home-page'>
      <div className='nav'>
        <button className='translate-btn' onClick={() => {setTranslate(!translate)} }>Translate names to {translate ? "English" : "Sinhala"}</button>
        <PDFButton />
      </div>
      <div className='table-div'>
        <Link to={'/add'}><button className='add-btn'>Add New Employee</button></Link>
        <table id='employee-table'>
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
                <td>{employee.birth_day.slice(0,10)}</td>
                <td>{employee.hire_date.slice(0,10)}</td>
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
