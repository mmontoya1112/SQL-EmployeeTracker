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
const addEmployee = () => {
    connection.query(
        `SELECT * FROM titles`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            let titleArray = [];
            results.forEach(item => {
                titleArray.push(item.title)
            })
            connection.query(
                `SELECT * FROM manager`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    let managerArray = [];
                    results.forEach(item => {
                        managerArray.push(item.firstName)
                    });
                    inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'firstName',
                                message: 'employee first name'
                            },
                            {
                                type: 'text',
                                name: 'lasttName',
                                message: 'employee last name'
                            },
                            {
                                type: 'list',
                                name: 'pickTitle',
                                message: 'what title will your employee take?',
                                choices: titleArray
                            },
                            {
                                type: 'confirm',
                                name: 'confirmManager',
                                message: 'is this a management position?',
                            },
                            {
                                type: 'list',
                                name: 'chooseManager',
                                message: 'who will manage the employee?',
                                when: ({confirmManager}) => {
                                    if(!confirmManager) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    },
                                choices: managerArray
                                }
                        ])
                        .then((data) => {
                            let title_id;
                            for (i = 0; i < titleArray.length; i++) {
                                if (data.pickTitle === titleArray[i]) {
                                    title_id = i + 1
                                }
                            }
                            let managerConfirm;
                            if (data.confirmManager === true){
                                managerConfirm = 1;
                            } else {
                                managerConfirm = 0
                            }
                            let manager_id;
                            if (!data.chooseManager) {
                                manager_id = null;
                            } else {
                                for (i = 0; i < managerArray.length; i++) {
                                    if (data.chooseManager === managerArray[i]) {
                                        manager_id = i +1
                                    }
                                }
                            }
                           connection.query(
                            `INSERT INTO employee (firstName, lastName, title_id, manager_id, managerConfirm)
                                VALUES (?, ?, ?, ?, ?)`,
                            [data.firstName, data.lastName, title_id, manager_id, managerConfirm],
                            function (err, results, fields) {
                                if (err) {
                                    console.log(err.message);
                                    return;
                                }
                                dropManager();
                                createManagerTable();
                                addManagers();
                                console.log('successfully added');
                                promptUser();
                            }
                           ); 
                        });
                }
            );
        }
    );
};
const employeeUpdate = () => {
    connection.query(
        `SELECT * FROM titles`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            let titleArray = [];
            results.forEach(item => {
                titleArray.push(item.title)
            })
            connection.query(
                `SELECT firstName, lastName FROM employee`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
                    let nameArray = [];
                    results.forEach(item => {
                        nameArray.push(item.firstName);
                        nameArray.push(item.lastName);
                    })
                    let combineNameArray = [];
                    for (let i = 0; i < nameArray.length; i += 2)
                        if (!nameArray[i +1])
                            break;
                            combineNameArray.push(`${nameArray[i]} ${nameArray[i + 1]}`)
                },
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'selectName',
                            message: 'select an employee to update',
                            choices: combineNameArray
                        },
                        {
                            type: 'list',
                            name: 'selectTitle',
                            message: 'select title for an employee to change to',
                            choices: titleArray
                        }
                    ])
                    .then((data) => {
                        let title_id;
                        for (let i = 0; i < titleArray.length; i++) {
                            if (data.title_select === titleArray[i]) {
                                title_id = i + 1;
                            }
                        };
                        let selectNameArray = data.name_select.split(" ");
                        let lastName = selectNameArray.pop();
                        let firsName = selectNameArray[0];

                        connection.query(
                            `UPDATE employee
                                SET title_id = ?
                                WHERE firstName = ? AND lastName = ?`,
                                [title_id, firsName, lastName],
                                function (err, results, fields) {
                                    if (err) {
                                        console.log(err.message);
                                        return;
                                    }
                                    console.log('employee up to date');
                                    promptUser();
                                }
                        );
                    })
            )
        }
    );
};
module.exports = {viewEmployees, employeesByDep, viewByManager, addEmployee, employeeUpdate};