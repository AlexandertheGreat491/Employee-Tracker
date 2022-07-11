/*department table values */
INSERT INTO departments (id, name)
VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

/*role table values*/
INSERT INTO roles (title, salary, departments_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

/*employees table values*/
INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
('John', 'Doe', 1, null),
('Mike', 'Chan', 1, 1),
('Ashley', 'Rodriguez', 2, null),
('Kevin', 'Tupik', 2, 3),
('Kunal', 'Singh', 3, null),
('Malia', 'Brown', 3, 3),
('Sarah', 'Lourd', 4, null),
('Tom', 'Allen', 4, 4);