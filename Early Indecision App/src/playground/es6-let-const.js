var nameVar = 'Cob'; // Var variables can be redefined and reassigned
var nameVar = 'OtherName'; // this can cause chaos with overriding variable values
console.log('nameVar: ', nameVar);

// Let and Const eleminate this issue
let nameLet = 'jconklin'; // lets can be reassigned but not redefined
nameLet = 'newLetName';
console.log('nameLet: ' + nameLet);

const nameConst = 'constantName'; // Consts can't be redefined or even reassigned. Its value does not change after creation. 
console.log('nameConst', nameConst);
// Can use const by default, then switch to let if you realize a variable is changing, idk about this strat but I'm trusting. 

function getPetName() {
    const petName = 'Maso';
    return petName;
}
getPetName();
console.log(petName); // THIS will cause an error becasue the petName variable does not have global scope, it has function scope. This happens for let, const or var
// Let and Var are block level scoped, so they are bound to the function they are in or a for or if loop they are in (where var are not)

//Strings in JS have a split method turning them into an array based on a something that is used to split them
let nameArray = 'bob tim jacob'.split(' ');



