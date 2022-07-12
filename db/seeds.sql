USE employee;

/*department table values */
INSERT INTO department (department_name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
("Administration");

/*role table values*/
INSERT INTO role (title, salary, department_id)
VALUES
('Lead Engineer', 100000, 2),
('Software Engineer', 80000, 2),
('Sales Lead', 150000, 1),
('Salesperson', 120000, 1),
('Legal Team Lead', 160000, 4),
('Lawyer', 125000, 4),
('Accountant', 250000, 3),
('Chief Executive Officer', 190000, 5);

/*employee table values*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 8),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, 8),
('Dev', 'Patel', 4, 3),
('Kevin', 'Tupik', 5, 8),
('Malia', 'Brown', 6, 5),
('Sarah', 'Lourd', 7, 8),
('Tom', 'Allen', 8, null);