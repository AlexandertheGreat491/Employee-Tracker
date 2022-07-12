DROP DATABASE IF EXISTS employee;
CREATE DATABASE employee;

USE employee;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8, 2),
    department_id INTEGER,
    PRIMARY KEY (id)
);


CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);












