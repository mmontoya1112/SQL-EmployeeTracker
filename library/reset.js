const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'local host',
    user: 'root',
    password: 'Root!234',
    database: 'employees'
});

const dropManager = () => {
    connection.query(
        `DROP TABLE IF EXISTS manager`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('hello')
        }
    )
};

const makeManagerTable = () => {
    connection.query(
        `CREATE TABLE manager (
            id INT NOT NULL AUTO_INCREMENT,
            firstName VARCHAR (30),
            lastName VARCHAR (30),
            PRIMARY KEY (id)
        )`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('hello')
        }
    )
};

const addingManager = () => {
    connection.query(
        `INSERT INTO manager (firstName, lastName)
        SELECT firstName, lastName
        FROM employee
        WHERE managerConfirm = 1`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('hello')
        }
    )
};

module.exports = { dropManager, makeManagerTable, addingManager }