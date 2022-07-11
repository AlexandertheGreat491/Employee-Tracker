DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;

CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR (30) 
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT
    CONSTRAINT fk_party FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE NULL
);


