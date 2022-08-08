// Want to create a self containing class instead of global methods in the file
// A React component is tied to a class. ES6 classes can be converted to
// React components by extending React.Component
class IndecisionApp extends React.Component {

    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        // Can use props to set default state options.
        this.state = {
            options: props.options
        };
    }
    // This method gets fired the FIRST time the component gets mounted to the DOM
    // This is called a lifecycle method
    componentDidMount () {
        console.log('component did mount');
        // Using for fetching data
        // Using local storage: everything is saved as a string
        // even numbers just get converted into strings. 
        // JSON = javascribt object notation, how to represent objects as strings. 
        // JSON.stringify() takes a regular JS object and makes a JSON representation
        // JSON.parse() takes thes string version and returns a true JS object
        // localStorage.clear() wipes out local storage
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json); // JSON.parse will through errors if it is supplied a not-proper JSON
            // These JSON methods are only necessary with more complex data like arrays being stored, not straigh strings or numbers
            // like this example, numbers would have to be parsed though
            // parseInt('1234') would return the integer 1234; it returns NaN if parseInt fails. 
            // NaN also appears if you attempt math with a non number value like a string
            // to check for NaN use isNaN(value) to check a value for being NaN.
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch(e) {
            // Do nothing
        }
        
    }
    // Called when props or state change
    componentDidUpdate (prevProps, prevState) {
        // Fires if state and props are modified, even if returned
        // to the same values
        if (prevState.options.length !== this.state.options.length)
        {
            // Convert options array to JSON to store in local storage
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
        console.log('component did update');
        // used for storing data
    }
    // When component dies
    componentWillUnmount() {
        console.log('component died');
    }
    // Can pass functions in as props (CALLBACKS) so that child components can call the functions and communicate
    // with parents ( and delete from parent's state in this instance )
    handleDeleteOptions() {
        this.setState(() => ({
            options: [] 
        })); // To implicitly return an object, need parenthesis around returning object instead of curly
        // brackets for method body. Just a way to be less verbose when all a method does is straight up return an object. 
    }
    // handlePick randomly picks an option and is passed down to Option
    handlePick() {
        const randomNum=Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    }
    handleDeleteOption(option) {
        // opt => {option !== opt})
        console.log('got back to handleDeleteOption with param ' + option);
        this.setState((prevState) => ({
            options: prevState.options.filter(opt => opt !== option)
        }));
    }
    // Passing data up from child to parent through this method that takes an argument
    handleAddOption(option) {
        if (!option) {
            // case of empty string
            return 'Enter valid value to add item'; // Will get communicated back to addOption method
        } else if (this.state.options.indexOf(option) > -1) {
            // Found a match, string is already in array
            return 'This option already exists';
        }
        // console.log('option passed up is ' + option);
        this.setState((prevState) => ({
                // Dont't want to push or directly manipulate state or prev state, just 
                // figure our new value seperately
                options: prevState.options.concat([option])
        }))
    }
    // Renders the master React Class calling and rendering all of the others. 
    render () {
        // Setting value of props, props are passed to a component basically
        // as a JSON. 
        // const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
            {/* Instead of rendering HTML this master class will render other React components.
            These components are NESTED inside 
            Component props are information passed into components when we
            set them up, to tell the components to do or look certain ways 
            For when we are defining a specific instance of a component. 
            Here title is a prop whose value comes from JS*/}
            <Header subtitle={subtitle} />
            <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
            <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteOption={this.handleDeleteOption}/>
            <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}
IndecisionApp.defaultProps = { // Used to configure DEFAULT options
    options: []
}

// Just showing more info about ES6 classes
const obj = {
    name: 'Viking',
    getName() {
        return this.name; // This binding does work
    }
};
console.log(obj.getName());
const getName = obj.getName;
// console.log(getName()); // This gives an error, because the 'this' binding is broken. 
// When breaking an objects method out of the object it cannot access the properties of the object. 
// JS functions have a bind() method, when called on a method it returns the method itself, the useful reason
// is that it can be passed the argument of the object refering to it to be the 'this value' when a method is called.
const getNameFixed = obj.getName.bind({name : 'otherName'});
const getNameSame = obj.getName.bind(obj);
console.log(getNameFixed());
console.log(getNameSame());

// This component is getting simplified because it doesn't utilize state, they are just presentational. 
// This lends them to being stateless functional components
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>
            /* Now if NO props are passed in, the Title will resort to its default and the subtitle won't show */
        }
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}    
            >
            What should I do?
            </button>
        </div>
    );
}

/* Class version of action was converted to functional component ^^
class Action extends React.Component {
    // Want actions contained in Classes
    render () {
        return (
            <div>
                <button 
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}    
                >
                What should I do?
                </button>
            </div>
        );
    }
} */

const Option = (props) => {
    return (
        <div>
        Option: {props.optionText}
        <button 
            onClick={(e) => {props.handleDeleteOption(props.optionText)}}
        >X</button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All Options</button>
        {props.options.length === 0 && <p>Add an Option to get started!</p>}
            {
                // Another solution would be to bind handleRemoveAll above 

                // Key value is still needed for React components, but is not available as a prop so another 'attribute' is needed
                props.options.map((option) => <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption}/>)
            }
        </div>
    );
}

// AddOption component will house the form for adding Option components
// Events work differently in React Components
class AddOption extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined // by default there is no error
        }
    }
    // Form sends the event here, use e.preventDefault to avoid the entire page refreshing
    handleAddOption(e) {
        // In here 'this' no longer refers to our class this is unbounded. 
        e.preventDefault();
        // trim removes all leading and trailling spaces
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => ({
                error // Shorthand if property comes from variable with exact same name, aka error: error
        }))

        if (!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}


/* This jsx variable was replaced by the master IndecisionApp Component that renders each other component

const jsx = (
    <div>
        { We effectively make a React Component into JSX by using our React compoenent like it was a 'custom'
        HTML tag. With React components MUST have uppercase first letter for classes. So it can make it into an HTML like element }
        <Header />
        <Action />
        <Options />
        <AddOption />
    </div>
); 
*/

// Creating an example stateless functional components
// Cannot use state but CAN use props
const User = (props) => {
    return (
        <div>
            {/* this is not accessible in functional components, so props are passed in as the first argument*/}
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
};

// Rendering a component instead of a variable pointing to JSX
ReactDOM.render(<IndecisionApp options={['Hell\'s kitchen', 'Gotham']}/>, document.getElementById('app'));
// An uppercase tag tell React to look for a variable with the matching name in scope, instead of a standard HTML tag
// ReactDOM.render(<User name="Cob" age="22"/>, document.getElementById('about'));


