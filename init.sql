
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


