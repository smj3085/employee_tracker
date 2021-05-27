DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name  VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT,
    PRIMARY KEY (id)
);

USE employees_db;

----- Department Seeds -----

INSERT INTO department (id, department_name)
VALUES (1, "Sales");

INSERT INTO department (id, department_name)
VALUES (2, "IT");

INSERT INTO department (id, department_name)
VALUES (3, "HR");

INSERT INTO department (id, department_name)
VALUES (4, "Customer Service");

----- Role Seeds -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Business Development Manager", 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Business Development Associate", 70000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Assistant", 60000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "IT Manager", 120000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "IT Associate", 80000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "HR Director", 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "HR Manager", 80000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Customer Service Manager", 70000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "Customer Service Rep", 50000, 4);

----- Employees Seeds -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Anne", "Smith", 1, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Ben", "Lee", 2, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Amy", "Kane", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Hannah", "Duong", 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Jessica", "Lung", 5, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Kelly", "Hansen", 6, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Emma", "Potter", 7, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Helen", "Adams", 8, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Jack", "Smith", 9, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Robert", "Downey", 2, 10);