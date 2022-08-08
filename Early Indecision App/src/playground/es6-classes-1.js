// Classes for modular coding of course. 
class Person {
    constructor(name = 'defaultName', age = 0) { // Defaults are set up by following a parameter with 
        // = and the default value.
        this.name = name // this referes to an instance of a class inside of class methods
        // fields can just be created
        this.age = age;
    }
    // non constructor methods must be called explicityly (like Java)
    getGreeting() {
        // return this.name + ' says Hi';
        // TEMPLATE STRINGS let us inject values right into
        // strings, they need back ticks instead of single quotes. They are on ~ key
        // use ${ data } to inject data to the string
        return ` ${this.name} says hi!`;
    }

    getDescription() {
        return `${this.name} is ${this.age} years old.`;
    }
}

// Creating a subclass of person called student
class Student extends Person {
    constructor(name, age, major) { // Leaving no default value makes major totally optional.
        // Defaults for name and age can still be pulled from parent constructor to set default values using Super.
        super(name, age); // just like java.
        this.major = major;
    }
    hasMajor() {
        return !!this.major; // using two ! to convert existing string to true boolean.
    }
    // To override Methods: write same method signature in child class
    getDescription() {
        // Calling parent's getDescription method
        let description = super.getDescription();
        if (this.hasMajor()) {
            return description + ` AND is studying ${this.major}`;
        }
        return description + ` AND is majorless`;
    }
}

//another subclass of person
class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }

    getGreeting() {
        if (this.homeLocation)
        {
            return super.getGreeting() + ` I'm from ${this.homeLocation}`;
        }
        return super.getGreeting() + ` I am homeless`;
    }
}

/*
const me = new Person('Cob', 22);
const empty = new Person(); // constructor parameters can be ignored. 
console.log(me);
console.log(empty);
console.log(me.getGreeting());
console.log(empty.getGreeting());
console.log(me.getDescription());
console.log(empty.getDescription());
*/
const eu = new Student('Joey', 20, 'comp sci');
console.log(eu.getDescription());
console.log(eu.hasMajor());
const defaultStudent = new Student();
console.log(defaultStudent.getDescription());
console.log(defaultStudent.hasMajor());
const travler = new Traveler('Jim', 10, 'LA');
console.log(travler.getGreeting());
const blankTrav = new Traveler();
console.log(blankTrav.getGreeting());

