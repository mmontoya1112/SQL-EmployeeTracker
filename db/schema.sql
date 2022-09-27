DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS title;
DROP TABLE IF EXISTS employee;

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (30),
    lastName VARCHAR (30),
    PRIMARY KEY (id)
    );

CREATE TABLE department (
    id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE title (
    id  INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    departmentID INT,
    PRIMARY KEY (id),
    FOREIGN KEY (departmentID) REFERENCES department(id)
);

CREATE TABLE employee (
    id  INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    titleID INT,
    managerID INT,
    managerConfirm BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (titleID) REFERENCES titles(id),
    FOREIGN KEY (managerID) REFERENCES titles(id) ON DELETE 
    SET NULL
)
