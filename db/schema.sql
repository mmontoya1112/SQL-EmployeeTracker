DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;
-- DROP TABLE IF EXISTS manager;
-- DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS titles;
-- DROP TABLE IF EXISTS employee;

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    PRIMARY KEY (id)
    );

CREATE TABLE department (
    id  INT NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
    name VARCHAR(30),
    
);

CREATE TABLE role (
    id  INT NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id  INT NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title_id INT,
    manager_id INT,
    manager_confirm BOOLEAN,
    FOREIGN KEY (title_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES role(id) ON DELETE 
    SET NULL
)
