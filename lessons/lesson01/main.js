import U, { printAge, printName } from `/user.js`

const user = new U("John", 26);
console.log(user);

const user1 = new U("John", 26);
printName(user1);
printAge(user1);