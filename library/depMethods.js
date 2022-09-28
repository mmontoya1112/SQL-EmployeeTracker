const { promptUser } = require ('..server');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root!234',
    database: 'employees'
});

const viewDepartment = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    )
}
const addDepartment = () => {
    inquire
    .prompt({
        type: 'text',
        name: 'departmentName',
        message: 'name the department you want to add: '
    })
    .then((data) => {
        connection.query(
            `INSERT INTO department (name)
            VALUES(?)`,
            [data.departmentName],
            function (err, results, fields) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log('department added');
                promptUser();
            }
        )
    })
}
module.exports = { viewDepartment, addDepartment }