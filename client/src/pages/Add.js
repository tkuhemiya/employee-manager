import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./form.css"

const url = "http://localhost:8080/api/employee";

const Add = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");

  const [message, setMessage] = useState("");

  const addEmployees = async () => {
    try {

      const requestBody = {
        name: name,
        category_id: parseInt(categoryId),
        phone_number: phoneNumber,
        birth_day: birthDay,
        hire_date: hireDate,
        salary: parseFloat(salary)
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (res.ok) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error("Error inserting employee data:", error);
      return false;
    }
  };

  const handleAdd = async () => {
    
    if (name.length === 0) {
      setMessage("Enter Name");
      return;
    }
    if (!categoryId) {
      setMessage("Enter category id");
      return;
    }
    if (phoneNumber.length === 0) {
      setMessage("Enter phone number");
      return;
    }
    if (!birthDay) {
      setMessage("Enter Birthdat");
      return;
    }
    if (!hireDate) {
      setMessage("Enter hired date");
      return;
    }
    if (!salary || parseFloat(salary) < 0) {
      setMessage("Enter salary");
      return;
    }

    console.log(name, categoryId, phoneNumber, birthDay, hireDate, salary);
    
    try {
      let res = await addEmployees();
      if(res){
        setMessage("Employee added successfully!");
        clear();
      }else{
        setMessage("An error occurred while adding the employee");
      }
    } catch (error) {
      setMessage("An error occurred while adding the employee");
    }
  };

  const clear = () => {
    setName("");
    setCategoryId("");
    setPhoneNumber("");
    setBirthDay("");
    setHireDate("");
    setSalary("");
    setMessage("");
  };

  return (
    <div>
      <Link to={"/"} ><button className='back-btn'>Go Back</button></Link>
      <div className='employee-form'>
        <h1>Add New Employee</h1>

        {message && (
          <div className={message.includes('successfully') ? "noterr" : "err"}>
            {message}
          </div>
        )}

      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter employee name"
      />
      <br />

      <label>Category</label>
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select a category</option>
        <option value="1">Manager</option>
        <option value="2">Backend</option>
        <option value="3">frontend</option>
        <option value="4">Accountant</option>
      </select>
      <br />

      <label>Phone Number</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        maxLength="10"
      />
      <br />

      <label>Birth Date</label>
      <input
        type="date"
        value={birthDay}
        onChange={(e) => setBirthDay(e.target.value)}
      />
      <br />

      <label>Hire Date</label>
      <input
        type="date"
        value={hireDate}
        onChange={(e) => setHireDate(e.target.value)}
      />
      <br />

      <label>Salary</label>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Enter salary"
        min="0"
      />
      <br />

        <div>
          <button className='addform-btn' onClick={handleAdd}>Add</button>
          <button className='clear-btn' onClick={clear}>Clear</button>
        </div>

      </div>
    </div>
  );
};

export default Add;