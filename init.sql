
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
('Kamal Silva', 1, '1111111111', '1985-04-12', '2010-01-15', 120000.00),
('Bob Silva', 2, '1111111112', '1990-06-20', '2015-03-10', 95000.00);


