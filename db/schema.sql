DROP TABLE if exists departments;

CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR (30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);