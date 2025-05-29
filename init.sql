
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    category_id INT, 
    phone_number VARCHAR(10),
    birth_day DATE,
    hire_date DATE,
    salary FLOAT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (category_name)
VALUES ('Manager'), ('Backend'), ('Frountend'), ('Accountant');

INSERT INTO employee (name, category_id, phone_number, birth_day, hire_date, salary) VALUES 
('sanjeewa Silva', 1, '0778888888', '2001-04-12', '2020-01-15', 120000.00),
('kamal herath', 2, '0778888889', '2000-06-20', '2022-03-10', 95000.00);


DELIMITER $$


CREATE PROCEDURE get_all_employees()
BEGIN
    SELECT employee.id, employee.name, category.category_name, employee.phone_number, employee.birth_day, employee.hire_date, employee.salary 
    FROM employee 
    LEFT JOIN category ON employee.category_id = category.id; 
END $$

CREATE PROCEDURE get_employee_byID(IN emp_id INT)
BEGIN
    SELECT * 
    FROM employee 
    WHERE id = emp_id;
END $$

CREATE PROCEDURE add_employee(
    IN emp_name VARCHAR(255),
    IN emp_category_id INT,
    IN emp_phone_number VARCHAR(10),
    IN emp_birth_day DATE,
    IN emp_hire_date DATE,
    IN emp_salary FLOAT
)
BEGIN
    INSERT INTO employee (
        name, 
        category_id, 
        phone_number, 
        birth_day, 
        hire_date, 
        salary
    ) VALUES (
        emp_name, 
        emp_category_id, 
        emp_phone_number, 
        emp_birth_day, 
        emp_hire_date, 
        emp_salary
    );
END $$

CREATE PROCEDURE update_employee_byID(
    IN emp_id INT,
    IN emp_name VARCHAR(255),
    IN emp_category_id INT,
    IN emp_phone_number VARCHAR(10),
    IN emp_birth_day DATE,
    IN emp_hire_date DATE,
    IN emp_salary FLOAT
)
BEGIN
    UPDATE employee
    SET 
        name = emp_name,
        category_id = emp_category_id,
        phone_number = emp_phone_number,
        birth_day = emp_birth_day,
        hire_date = emp_hire_date,
        salary = emp_salary
    WHERE id = emp_id;
END $$

CREATE PROCEDURE delete_employee_byID(IN emp_id INT)
BEGIN
    DELETE FROM employee WHERE id = emp_id;
END $$


DELIMITER ;
