CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(20, 2) NULL,
    departments_id INT NOT NULL,
    FOREIGN KEY (departments_id)
          REFERENCES departments(id)
          ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employees(
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  FOREIGN KEY (roles_id)
  REFERENCES roles(roles_id)
  ON DELETE SET NULL,
  manager_id INT DEFAULT NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(employee_id)
  ON DELETE SET NULL
);







