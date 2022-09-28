const inquirer = require('inquirer');
const { viewEmployees, employeesByDep, viewByManager, addEmployee } = require('./library/employee');
const promptUser = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'choose',
            message: 'what do you wish to do',
            choices: ['view employees', 
            'view employees by department', 
            'view employees by manager', 
            'add employee', 
            'update employee', 
            'view departments', 
            'add department', 
            'view titles', 
            'add title', 
            'done']
        })
    .then((data) => {
        switch (data['choose']) {
            case 'view employees':
                viewEmployees();
                break;
            case 'view employees by department':
                employeesByDep();
                break;
            case 'view employees by manager':
                viewByManager();
                break;
            case 'add employee':
                addEmployee();
                break;
        }
    })
}