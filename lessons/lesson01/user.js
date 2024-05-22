class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }


}

function printName(User) {
    console.log(`User's name is ${User.name}`)
}

function printAge(User) {
    console.log(`User is ${User.age} yearl old`)
}

export default User
export { printName, printAge }