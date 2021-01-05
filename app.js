const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//an array that holds all of the workers
const workers = []

//manager prompts asking for name, id, email, and Office Number
function managerPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter your full name',
            name: 'Name',
        },
        {
            type: 'input',
            message: 'Please enter your ID',
            name: 'ID',
        },
        {
            type: 'input',
            message: 'Please enter your email',
            name: 'Email',
        },
        {
            type: 'input',
            message: 'Please enter your office number',
            name: 'Office-Number',
        }
        //.then function to set the answers to sppend to the workers array after they have gotten this info from the client
    ]).then(response => {
        const manager = new Manager(response.Name, response.ID, response.Email, response.Office-Number)
        workers.push(manager);
        newRole()
    })
}
//intern prompts asking for name, id, email, and school 
function internPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter your name',
            name: 'Name',
        },
        {
            type: 'input',
            message: 'Please enter your ID',
            name: 'ID',
        },
        {
            type: 'input',
            message: 'Please enter your email',
            name: 'Email',
        },
        {
            type: 'input',
            message: 'Please enter the name of your school',
            name: 'School',
        },
    ]).then(response => {
        const intern = new Intern(response.Name, response.ID, response.Email, response.School)
        workers.push(intern);
        newRole()
    })
}

//Prompting the engineers for their name, id, email, and github
function engineerPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter your name',
            name: 'Name',
        },
        {
            type: 'input',
            message: 'Please enter your ID',
            name: 'ID',
        },
        {
            type: 'input',
            message: 'Please enter your Email',
            name: 'Email',
        },
        {
            type: 'input',
            message: 'Please enter your github',
            name: 'github',
        },
    ]).then(response => {
        const engineer = new Engineer(response.Name, response.ID, response.Email, response.github)
        workers.push(engineer);
        newRole()
    })
}

//a function that will prompt the user to choose a role and than run the function that prompts the specific questions for the role
function newRole() {
    inquirer.prompt([
        {
            type: 'list',
            messages: 'Please choose a role for your team',
            choices: ['Manager', 'Intern', 'Engineer', 'Finished'],
            name: 'Role'
        }
    ]).then(function(response) {
        if (response.Role === 'Intern') {
            internPrompt();
        } else if (response.Role === 'Manager') {
            managerPrompt();
        } else if (response.Role === 'Engineer') {
            engineerPrompt();
        } else if (response.Role === 'Finished') {
            fs.writeFileSync(outputPath, render(workers), 'utf-8');
        }
    });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
