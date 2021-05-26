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
    .prompt({
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
    })
.then((data) => {
    console.log("You've chosen: " + data.select);
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
        console.log(`Invalid action: ${answer.select}`);
        break;
    }
  });
};

// View all employees
const viewEmploy = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) throw err;
      console.table(results);
      console.log("Success");
      init();
    }
  );
};

const viewDep = () => {
    connection.query('SELECT id, department_name AS Departments FROM department', 
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
      (err, results) => {
        if (err) throw err;
        console.log("Success");
        console.table(results);
        init();
      }
    );
  };

const viewByManager = () => {
    connection.query(
      `SELECT CONCAT(manager.first_name, " ", manager.last_name) AS manager, CONCAT (employee.first_name, " ",employee.last_name) AS employee
    FROM employee manager
    INNER JOIN employee ON manager.id = employee.manager_id;`,
      (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
      }
    );
};

const addNewEmploy = () => {
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
          init();
        });
      });
  }
//       .then((answer) => {
//         if (answer.manager === "No Manager") {
  
//           let roleId = allRoles.indexOf(answer.role) + 1;
  
//           connection.query(
//             'INSERT INTO employee SET ?', {
//               first_name: answer.f_name,
//               last_name: answer.l_name,
//               role_id: roleId,
  
//             },
//             (err) => {
//               if (err) throw err;
//               console.log('Your employee was created successfully!');
//               start();
//             }
//           );
//         } else {
  
//           let roleId = allRoles.indexOf(answer.role) + 1;
//           let managerId = allManagers.indexOf(answer.manager) + 1;
  
//           connection.query(
//             'INSERT INTO employee SET ?', {
//               first_name: answer.f_name,
//               last_name: answer.l_name,
//               role_id: roleId,
//               manager_id: managerId,
//             },
//             (err) => {
//               if (err) throw err;
//               console.log('Your employee was created successfully!');
//               start();
//             }
//           );
//         }
//       });
//   };

//   var allRoles = [];

// function selectRole() {
//   connection.query("SELECT * FROM role", function (err, res) {
//     if (err) throw err
//     for (var i = 0; i < res.length; i++) {
//       allRoles.push(res[i].role_title);
//     }

//   })

//   return allRoles;
// }

// var allManagers = [];

// function selectManager() {
//   connection.query("SELECT DISTINCT CONCAT( e2.first_name, ' ', e2.last_name ) AS Manager, e1.manager_id FROM employee e1 INNER JOIN employee e2 ON e2.id = e1.manager_id WHERE e1.manager_id IS NOT NULL;",
//     function (err, res) {

//       if (err) throw err
//       for (var i = 0; i < res.length; i++) {
//         allManagers.push(res[i].Manager);
//       }
//       allManagers.push("No Manager");
//     })
//   return allManagers;
// }

  