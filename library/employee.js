const { inquirer } = require('inquirer')
const { promptUser} = require('../server')
const mysql = require('mysql2')
const {dropManager, createManagerTable, addManagers} = require('./reset')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root!234',
    database: 'employees'
});

const viewEmployees = () => {
    connection.query(
        `SELECT employee.id, employee.firstName, employee.lastName, titles.title, titles.salary AS salary, manager.firstName AS manager, department.name AS department
        FROM employee
        LEFT JOIN roles
        ON employee.title_id = titles.id
        LEFT JOIN department
        ON titles.department_id = department.id
        LEFT JOIN manager
        ON employee.manager_id = manager.id`,
        function (err, results, fields){
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    );
};

const employeesByDep = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
                depArray = [];
                results.forEach(item => {
                    depArray.push(item.name)
                });
                inquirer
                .prompt({
                    type: 'list',
                    name: 'filterByDep',
                    message: 'filter by department',
                    choices: depArray
                })
                .then((data) => {
                    connection.query(
                        `SELECT employee.id, employee.firsName, employee.lastName, department.name AS department
                        FROM employee
                        LEFT JOIN roles
                        ON employee.title_id = titles.id
                        LEFT JOIN department
                        ON titles.department_id = department.id
                        WHERE department.name = ?`,
                        [data['filterByDep']],
                        function (err, results, fields) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.table(results);
                            promptUser();
                        }

                    )
                });
            }
        }
    );
};
const viewByManager = () => {
    connection.query(
        `SELECT * FROM manager`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            managerArray = [];
            results.forEach(item => {
                managerArray.push(item.firstName)
            })
            inquirer
                .prompt({
                    type: 'list',
                    name: 'filterManager',
                    message: 'manager to filter by: ',
                    choices: managerArray
                })
                .then((data) => {
                    connection.query(
                        `SELECT employee.id, employee.firstName AS manager
                        FROM employee
                        LEFT JOIN manager
                        ON employee.manager_id = manager.id
                        WHERE manager.firstName = ?`,
                        [data['filterManager']],
                        function (err, results, fields) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.table(results);
                            promptUser();
                        }
                    );
                });
        }
    );
};