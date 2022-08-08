// console.log("app.js is runnning!");

// // Babel is a tool to turn all of our code into plain JS
// // JSX stands for JavaScript XML. It is provided to us by React to define
// // templates and inject data into them.

// // Remember JS is loosely typed

// // app object to hold the tile and subtitle to be dynamically displayed by the JSX template
// const app = {
//     title: 'Indecision App',
//     subTitle: 'If you could change your fate, wud you?',
//     options: ['one', 'two']
// }
// /* const itemTexts = ['Item One', 'Item Two']; <ol>
//             <li>{itemTexts[0]}</li>
//             <li>{itemTexts[1]}</li>
//         </ol>
//         */
// // This template is static because there are no variable / dynamic elements.
// // Each JSX element can only have one html element, but you can put a wrapper one with multiple inside
// const template = (
//     <div>
//         <h1>{app.title}</h1> 
//         {app.subTitle && <p>{app.subTitle}</p>}
//         <p>{app.options.length > 0 ? 'Here are your options: ' : 'No Options availalbe'}</p>
        
//     </div>); // These parenthesis are PURELY for aesthetics not necessary. 

// /* const user = {
//     name: 'Cob',
//     age: 22,
//     location: 'Charlotte'
// }

// // Arrow functions aka
// function getLocation(location) { // Set up to return a JSX expression

//     if (location)
//     {
//         return <p>Location: {location}</p>;
//     }
//     return undefined; // undefined is implicitly and defaulty returned, so this line is redundant.
//     // if a JSX expression resolves to undefined, nothing will be built in the HTML
//     // Boolean values are also all ignored by JSX as well as null. 
// }

// const username = 'jconklin'; // Any JS expression can go into JSX within curly brackets, {} like how angular needs {{}}
// const userAge = 22;
// const userLocation = 'Charlotte';
// // This is a template for personal info
// // JSX expressions can also use other JSX expressions
// const template2 = (
//     <div>
//         <h1> {user.name ? user.name.toUpperCase() + '!' : 'Anonymous'} </h1> 
//         <p>{(user.age && user.age >= 18) && 'Age: ' + user.age}</p>
//         {getLocation(user.location)}
//     </div>);

//     // Age has a more concise way to say > user.age && user.age > 18 ? 'Age: ' + user.age : null  
// */

// // const and let are better than const remember
// /* const template = React.createElement(
//     "h1",
//     {id: "someid"},
//     "Something new"
//  );
// */

// // Using the document API to refrence the HTML element directly
// const appRoot = document.getElementById('app');
// const appBottom = document.getElementById('about');

// // This will dislpay / Render the JSX elements, it takes two arguments
// // 1st argument: JSX element to be rendered.
// // 2nd argument: DOM element aka where to render it, 
// // In this case DOM element is in the html file and buit with a unique id
// ReactDOM.render(template, appRoot);


// // Class is used to add identifiers that aren't unique but go across multiple elements
// // Some attributes from HTML have the same name in JSX like id, but others like class in HTML is className in JSX
// // Just look up what JSX go to, this is because class is a reserved keyword already in JS. 
// // Can google react dom elements to see how all attributes are different or the same. 
// let count = 0;
// const someId = 'myIdHere'
// const addOne = () => {
//     console.log('add 1 count is ' + count );
//     // count++; Won't actually change the displayed count;
//     count++;
//     renderCounterApp();
// };

// const minusOne = () => {
//     console.log('minus 1');
//     count--;
//     renderCounterApp();
// }

// const reset = () => {
//     console.log('reset pressed');
//     count = 0;
//     renderCounterApp();
// }

// // JSX does not have built in data binding, it won't automatically keep looking to see if data is getting changed it just grabs values
// // that are there. So the template code and render method have to be re-run for refreshed values.  
// const renderCounterApp = () => {
//     // Building new template2
//     const template2 = (
//        <div>
//             <h1>Count: {count}</h1>
//             <button id={someId} className="button" onClick={ () => {
//                 console.log('in line add 1');
//             } }>in Line test</button>
//             <button onClick={ addOne }>+1</button>
//             <button onClick={ minusOne }>-1</button>
//             <button onClick={ reset }>reset</button>
        
//         </div>
//     );
//     // console.log(template2); // The template2 is technically still converted into just an object. 

//     ReactDOM.render(template2, appBottom); // React is super efficient and uses virtual DOM algorithms to only render what is new and changed when rendering again,
//     // this saves lots of costs on rendering (it runs in JS). 
// };

// // Now call our renderer that builds the template and renders it, this can be recalled upon changes to update what is rendered.
// renderCounterApp();


class Counter extends React.Component {

    constructor(props) {
        super(props)
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        // Creating default state object, just a JSON like object
        this.state = {
            count: props.count,
            name: 'Cob'
        }
    }
    // Practicing maniuplating state

    // Using lifecycle commands: lifecycle functions are bound on this apparently
    componentDidUpdate(prevProps, prevState) {
        // gives us access to new count values
        // each time count updates
        // Only update local storage if count changes
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);

        }
    }

    // Get value when page first appears from local storage
    componentDidMount() {
        const stringCount = localStorage.getItem('count');
        const count = parseInt(stringCount, 10);
        if (!isNaN(count)) {
            this.setState(() => { count })
        }
    }

    handleAddOne() {
        console.log('+1');
        // You don't manually update the state object like -> this.state.count++; <- wrong
        // use this.setState() it gets called with an argument that is a function that defines the updates to make by
        // returning an object with the state objects to be changed and their new values.
        // SetState takes in a parameter holding the previous state
        this.setState( (prevState) => {
            return {
                count: prevState.count + 1
            };
        });
    }

    handleMinusOne() {
        console.log('-1');
        // If you have multiple components of state, you don't have to provide them all, just the ones you want to change
        // in setState() 
        this.setState( (prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }

    handleReset() {
        console.log('resetty');
        // Pass in a function not just an object into this.setState, because passing in an object is old and not fully supported
        // and getting depreciated. 
        this.setState( (prevState) => {
            return {
                count: 0
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Name: {this.state.name}</h1>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}
Counter.defaultProps = {
    count: 0
}

ReactDOM.render(<Counter />, document.getElementById('app'));