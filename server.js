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

        case "Update employee role":
        updateEmploy();
        break;

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
    console.log("View all Employees")
    const query = 'SELECT * FROM employee';
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
    console.log('Adding a New Employee');
    inquirer
      .prompt([
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
      .then(function(results) {
        const firstName = results.first_name;
        const lastName = results.last_name;
        const roleID = results.roleId;
        const managerID = results.managerId;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
        connection.query(query, function(err, results) {
          if (err) throw err;
          console.table(results);
          console.log("Employee successfully added!");
          init();
        });
    });
};

const addRole = () => {
    // connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", 
    // (err, res) => {
    //   if (err) throw err;
  
      inquirer
        .prompt([
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
    console.log('Adding new department');
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
