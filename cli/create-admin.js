import chalk from "chalk";
import inquirer from "inquirer"
import { MongoClient } from 'mongodb'
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const log = console.log

const promptOptions = [{
    type: "list",
    name: "role",
    message: "Press arrow up and down key to choose role",
    choices: [
        chalk.green("User"),
        chalk.blue("Admin"),
        chalk.red("Exit")
    ]
}]
const requiredValidation = (input, name)=>{
    if(input.length > 0)
        return true

    return log(chalk.red(`${name} is required !`))
}

const emailValidation = (email)=>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = regex.test(email);

  if(isValid)
    return true

  return log(chalk.red(`Please enter email in valid format`))
}

const passwordValidation = (input)=>{
  if(input.length < 6)
    return log(chalk.red(`Password should be atleast 6 character`))

  return true
}

const inputOptions = [
    {
        type: "input",
        name: "fullName",
        message: "Enter your fullname ?",
        validate: (input)=>{
            return requiredValidation(input, "Fullname")
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email ?",
        validate: (input)=>{
            return (
                requiredValidation(input, "Email"),
                emailValidation(input)
            )
        }
    },
    {
        type: "password",
        name: "password",
        message: "Enter your password ?",
        mask: "*",
        validate: (input)=>{
            return (
                requiredValidation(input, "Password"),
                passwordValidation(input)
            )
        }
    }
]

const createRole = async (role, db) =>{
    try {
        const input = await inquirer.prompt(inputOptions)
        input.password = await bcrypt.hash(input.password, 12)
        input.role = role
        input.createdAt = new Date()
        input.updatedAt = new Date()
        input.__v = 0
        const User = db.collection("users")
        await User.insertOne(input)
        log(chalk.green(`${role} has been created !`))
        process.exit()
    }
    catch(err)
    {
        log(chalk.red(`Signup failed - ${err.message}`))
        process.exit()
    }
}

const exitApp =()=>{
    log(chalk.blue("Byee!! Exiting the App"))
    process.exit()
}


const welcome = async (db)=>{
    log(chalk.bgWhite.green.bold(" 🌿 Welcome to Greenatva 🌿 "))
    log(chalk.bgRed.white.bold(" ⭐ Admin Signup Console ⭐ "))

    const {role} = await inquirer.prompt(promptOptions)
    
    if(role.includes("User"))
        return createRole("user", db)

    if(role.includes("Admin"))
        return createRole("admin", db)

    if(role.includes("Exit"))
        return exitApp() 
} 

const main = async ()=>{
    MongoClient.connect(process.env.DB_URL)

    .then((conn)=>{
        const db = conn.db(process.env.DB_NAME)
        welcome(db)
    })

    .catch(()=>{
        log(chalk.redBright("Failed to connect with database"))
        process.exit()
    })
}

main()
