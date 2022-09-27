const { promptUser } = require('../server');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root!234',
    database: 'employees'
});

const showTitles = () => {
    connection.query(
     `SELECT titles.id, titles.title, titles.salary, department.name
        FROM titles
        LEFT JOIN department
        ON titles.departmentID = department.id `,
    function (err, results, fields) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(results);
        promptUser();
        }
    );
};
const addingTitle = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return;
            }
            let depArr = [];
            results.forEach(item => {
                depArr.push(item.name)
            })

            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'title_title',
                        message: 'enter the name of the title you want to add: '
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'enter the salary for this title'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'select the department: ',
                        choices: depArr
                    }
                ])
                .then ((data) => {
                    let department_id;

                    for 
                })
        }
    )
}