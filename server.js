const inquirer = require('inquirer');
const { viewDepartment, addDepartment } = require('./library/depMethods');
const { viewEmployees, employeesByDep, viewByManager, addEmployee, employeeUpdate } = require('./library/employee');
const { showTitles, addingTitle } = require('./library/titleMethods');
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
            case 'update employee':
                employeeUpdate();
                break;
            case 'view departments':
                viewDepartment();
                break;
            case 'add department':
                addDepartment();
                break;
            case 'view titles':
                showTitles();
                break;
            case 'add title':
                addingTitle();
                break;
            case 'done':
                break;
            
        }
    })
};
