const mysql = require('mysql'); // For connecting to the MySQL database
const inquirer = require('inquirer'); // For interacting with the user via the command-line
const consoleTable = require('console.table'); // For printing MySQL rows to the console in an attractive fashion.
const { connect } = require('node:http2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Welcome to the Employee tracker");
    init();
})

const init = () => {
    inquirer
    .prompt({
            name: "select",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View departments",
                "View roles",
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",
                "Exit",
            ],
    })
.then((answer) => {
    console.log("You've chosen: " + answer.select);
    switch (answer.select) {
        case "View all employees":
        viewAllEmploy();
        break;

        case "View departments":
        viewDep();
        break;

        case "View roles":
        viewRole();
        break;

        case "Add employee":
        addNewEmploy();
        break;

        case "Add role":
        addRole();
        break;

        case "Add department":
        addDep();
        break;

        case "Delete employee ID":
        deleteEmployee();
        break;

        // case "Update employee role";
        // updateRole();

        case "Exit":
        connection.end();
        break;

        default:
        console.log(`Invalid action: ${answer.select}`);
        break;
    }
  });
};

const viewAllEmploy = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS department, role.salary, employee.manager_id AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        init();
    })
};

const viewDep = () => {
    const query = 'SELECT department_name AS Department FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

const viewRole = () => {
    const query = 'SELECT title AS Role, salary AS Salary, department_id AS Department FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}


const addNewEmploy = () => {
    inquirer.prompt([
        {
          name: 'first_name',
          type: 'input',
          message: "What is the employee's first name?",
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'What is their surname?',
        },
        {
          name: 'roleId',
          type: 'input',
          message: 'What is their role ID?',
        },
        {
          name: 'managerId',
          type: 'input',
          message: "What is the manager's ID?", 
        }
      ])
      .then((answer) => {
          connection.query(
              'INSERT INTO employee SET ?',
                {
                  first_name: answer.first_name,
                  last_name: answer.last_name, 
                  role_id: answer.roleId,
                  manager_id: answer.managerId,
                },
                (err) => {
                  if(err) throw err;
                  console.log("Employee successfully created!");
                  init();
                }
            );
        });
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'roleTitle',
            type: 'input',
            message: 'What is the role title?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary?',
        },
        {
            name: 'departmentId',
            type: 'input',
            message: 'What is the department id',
        }
        ])
        .then((answer) => {
          connection.query(
            'INSERT INTO role SET ?',
            {
              title: answer.roleTitle,
              salary: answer.salary,
              department_id: answer.departmentId
            },
            (err) => {
                if (err) throw err;
              console.log("New Role has been added!");
              init();
            }
        );
    });
};

const addDep = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What department would you like to add?',
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO department SET ?',
            {
                department_name: answer.name,
            },
            (err) => {
                if (err) throw err;
                console.log('New department has been added!');
                init();
            }
        );
    });
};

// const updateRole = () => {
//     viewAllEmploy();
//     let employeeId;

//     const query = 'SELECT id FROM employee; SELECT title FROM role';
//         inquirer.prompt([
//             {
//                 name: 'employeeId',
//                 type: 'input',
//                 message: "Choose employee to update",
//             }
//             .then((answer) => {
//                 employee.id = answer.employeeId;
//             },
//             {
//                 name: 'roleTitle',
//                 type: 'input',
//                 message: 'What is their new role id?',
//             }
//             .then((answer) => {
//                 console.log("Updating employee's role");

//                 connection.query(
//                     'UPDATE role SET ? WHERE ?',
//                     { title: answer.roleTitle },
//                     (err) => {
//                         if (err) throw err;
//                         console.log('Your employee has been deleted!');
//                         init();
//                     }
//                 );
//             });
//         };

const deleteEmployee = () => {
    viewAllEmploy();
    inquirer.prompt([
        {
            name: 'employeeId',
            type: 'input',
            message: 'What is the ID of the employee to delete?',
        },
    ])
    .then((answer) => {
    connection.query(
            'DELETE FROM employee WHERE ?',
            {
                id: answer.employeeId,
            },
            (err) => {
                if (err) throw err;
                console.log('Your employee has been deleted!');
                init();
            }
        );
    });
};