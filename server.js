const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const config = require("./package.json");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("The Employee tracker");
    init();
})

const init = () => {
    inquirer
    .prompt([
        {
            name: "select",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View departments",
                "View roles",
                "View all employees by role",
                "View all employees by department",
                "View all employees by manager",
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",
                "Delete employee",
                "Delete role",
                "Delete department",
                "View department budgets",
                "Exit",
            ],
    },
])
.then((data) => {
    switch (data.select) {
        case "View all employees":
        viewEmploy();
        break;

        case "View departments":
        viewDep();
        break;

        case "View roles":
        viewRole();
        break;

        case "View all employees by role":
        viewByRole();
        break;

        case "View all employees by department":
        viewByDep();
        break;

        case "View all employees by manager":
        viewByManager();
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
        updateRole();
        break;

        case "Delete employee":
        deleteEmploy();
        break;

        case "Delete role":
        deleteRole();
        break;

        case "Delete department":
        deleteDep();
        break;

        case "View department budgets":
        viewBudget();
        break;

        case "Exit":
        connection.end();
        break;

        default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
  });
};

// View all employees
const viewEmploy = () => {
    connection.query('SELECT CONCAT(employee.first_name, " ", employee.last_name) AS "Employee Name", role.title, department.name AS "Department", role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id',
    (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
    }
  );
};

const viewDep = () => {
    connection.query('SELECT id, name AS Departments FROM department', 
    (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
      }
    );
};

const viewRole = () => {
    connection.query(
      `SELECT role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id `,
      (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
      }
    );
  };


const viewByManager = () => {
    connection.query(
      `SELECT CONCAT(manager.first_name, " ", manager.last_name) AS manager, CONCAT (employee.first_name, " ",employee.last_name) AS employee
    FROM employee manager
    INNER JOIN employee ON manager.id = employee.manager_id;`,
      (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
      }
    );
};


  