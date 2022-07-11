CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(20, 2) NULL,
    departments_id INT NOT NULL,
    FOREIGN KEY (departments_id)
          REFERENCES departments(id)
          ON DELETE CASCADE ON UPDATE CASCADE
);








