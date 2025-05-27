import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./form.css"

const url = "http://localhost:8080/api/employee";

const Edit = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");

  const [message, setMessage] = useState("");

  const { id } = useParams();
  console.log(id)

  const getEmployee = async () => {
    try{
      const res = await fetch(`${url}/${id}`, {
        method: "GET"
    });
    const data = await res.json();
    console.log(data);
    setName(data.name)
    setCategoryId(data.category_id)
    setPhoneNumber(data.phone_number);
    setBirthDay(data.birth_day.slice(0, 10));
    setHireDate(data.hire_date.slice(0, 10));
    setSalary(data.salary)

    }catch(err){
      console.error("Error getting employee")
    }
  }

  const editEmployees = async () => {
    try {
      
      const requestBody = {
        name: name,
        category_id: parseInt(categoryId),
        phone_number: phoneNumber,
        birth_day: birthDay,
        hire_date: hireDate,
        salary: parseFloat(salary)
      };

      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
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
      console.error("Error inserting employee", error);
      return false;
    }
  };

  const handleEdit = async () => {
    
    const regExp = /^[a-zA-Z\s]+$/;

    if (name.length === 0 || name.length > 255) {
      setMessage("Invalid name");
      return;
    }

    if (!regExp.test(name)){
      setMessage("Name cannot contain numbers");
      return;
    }
    
    if (!categoryId || parseInt(categoryId) < 1 || parseInt(categoryId) > 4) {
      setMessage("Invalid category id");
      return;
    }
    
    if (phoneNumber.length === 0 || phoneNumber.length > 10 || phoneNumber < 10) {
      setMessage("Phone number must be 10 digits");
      return;
    }

    if (!birthDay) {
      setMessage("Birth date is required");
      return;
    }
    
    if (!hireDate) {
      setMessage("Hire date is required");
      return;
    }
    
    if (!salary || parseFloat(salary) < 0) {
      setMessage("Salary cant be a non-negative number");
      return;
    }

    console.log(name, categoryId, phoneNumber, birthDay, hireDate, salary);
    
    try {
      let res = await editEmployees();
      if (res){
        setMessage("Employee edited successfully!");
        getEmployee();
      }else{
        setMessage("An error occurred while editing the employee");
      }
    } catch (error) {
      setMessage("An error occurred while editing the employee");
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
  
  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      <Link to={"/"} ><button className='back-btn'>Go Back</button></Link>
      
      <div className='employee-form'>
        <h1>Edit Employee</h1>

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
        <br/>
        <label>Category</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select a category</option>
          <option value="1">Manager</option>
          <option value="2">Backend</option>
          <option value="3">frontend</option>
          <option value="4">Accountant</option>
        </select>
        <br/>
        <label>Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          maxLength="10"
        />
        <br/>
        <label>Birth Date</label>
        <input
          type="date"
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
        />
        <br/>
        <label>Hire Date</label>
        <input
          type="date"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
        />
        <br/>
        <label>Salary</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter salary"
          min="0"
        />
        <br/>
        <div className='form-btns'>
          <button className='edit-btn' onClick={handleEdit}>Edit</button>
          <button className='clear-btn' onClick={clear}>Clear</button>
        </div>

      </div>
    </div>
  );
};

export default Edit;