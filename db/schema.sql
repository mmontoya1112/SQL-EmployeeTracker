DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;
-- DROP TABLE IF EXISTS manager;
-- DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS titles;
-- DROP TABLE IF EXISTS employee;

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (30),
    lastName VARCHAR (30),
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
    departmentID INT NOT NULL,
    FOREIGN KEY (departmentID) REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id  INT NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    titleID INT,
    managerID INT,
    managerConfirm BOOLEAN,
    FOREIGN KEY (titleID) REFERENCES role(id),
    FOREIGN KEY (managerID) REFERENCES role(id) ON DELETE 
    SET NULL
)
