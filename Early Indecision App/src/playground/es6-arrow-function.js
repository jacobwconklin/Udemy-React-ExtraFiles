const square = function (x) {
    return x * x;
}

// Equivalent non - arrow function
function square2(x) {
    return x * x;
}


// Arrow functions start with argument list not the word function.
const squareArrow = (x) => {
    return x * x;
}; // This is an arrow function, aka an anonymous function but here saved to a variable
// ES6 arrow functions are always anonymous there is no where to just name them 
// Notice the semi-colon following the close curly bracket. 

console.log('Squared: ' + square(8));
console.log('SquaredArrow: ' + squareArrow(8));

// Working with an arrowfunction returning a single expression does not even need return 
// it just has to be a single line without brackets
const squareArrow2 = (x) => x * x;

console.log('SquaredArrow2: ' + squareArrow2(8));

// Completing challenge
const getFirstName = (fullName) => {
    let firstName = fullName.split(' ')[0];
    return firstName;
};

const getFirstName2 = (fullName) => fullName.split(' ')[0];

console.log('first name is: ' + getFirstName('John Jacob Jing'));
console.log('first name2 is: ' + getFirstName2('Johnny Jacob Jing'));



// Looking at more details of arrow-functions
// arguments object are no longer bound with arrow functions
// the this keyboard is no longer bound with arrow functions
const add = function (a, b) {
    console.log(arguments); // Gives all arguments as an array, but is not supported in arrow functions
    return a + b;
} // Anonymous ES5 aka non arrow-function

const addArrow = (a, b) => {
    //No longer have access to arguments
    return a + b; 
};

console.log(add(55, 1));


const user = {
    name: 'Cob',
    cities: ['Salem', 'Roanoke', 'Goiania'],
    printPlacesLived: function () { // This is an anonyous function used as a value in the data object user.
        // This is good to NOT be an arrow function, because now it binds 'this' as user, whereas if it 
        // were an arrow function it would leave 'this' unbound and pointing to the entire file.
        console.log(this.name);
        console.log(this.cities);
        const that = this;

        // forEach is an array method that gets called once for each item in the array with the item as the argument each time
        this.cities.forEach(function (city) {
            console.log(that.name + ' has lived in city: ' + city); // THIS cannot be used at this point, it is bound earlier and won't go in to nested functions,
            // So saving this to that is a possible workaround for non-arrow nested functions
            // but with arrow functions it isn't bound and works!
        });
        this.cities.forEach( (city) => {
            console.log(this.name + ' lived in ' + city);
        });
    },

    // New syntax for ES6 functions: if defining methods on objects and want to use 'this'
    printPlacesLived2() {
        console.log(this.name + ' this works');

        // map is more popular than for each it gets called once for every item in the array and that item is the first argument like for each
        // but foreach only lets you do something with each item, map lets you change them and returns a new array. 
        // map method does NOT effect original array at all, it just creates a new array. 
        const cityMessages = this.cities.map((city) => {
            return this.name + ' has lived in ' + city + '!';
        });
        return cityMessages;
    },

    printPlacesLived3() {
        return this.cities.map((city) => this.name + ' has lived at ' + city);
    }

};

user.printPlacesLived();
console.log(user.printPlacesLived2());


const multiplier = {
    numbers: [1, 2, 3],
    multiplyBy(multiples) {
        return this.numbers.map(num => num * multiples);
    }
}

console.log(multiplier.multiplyBy(5));












