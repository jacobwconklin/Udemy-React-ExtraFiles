// This creates the indecision app wiht jsx instead of components

const app = {
    title: 'Indecision App',
    subTitle: 'If you could change your fate, wud you?',
    options: []
}

// React components can be every individual part of the UI. 

// React docs has a place to view all React Dom Events showing all SyntheticEvents available to us. 
// Supported Evenets is the best part to look at. onSubmit lets us run conde when a form is submitted. 

// the e object is the event object called when events happen.
const onFormSubmit = (e) => {
    e.preventDefault(); // Stops the ENTIRE page from being refreshed which is costly.

    //Get value the user typed if any
    const option = e.target.elements.option.value; //e.target points to the element that the event started at (here it's the form)
    // an empty string is a falsey value so it will check if there is anything
    if (option) {
        // Use push to add on to an array
        app.options.push(option);
        e.target.elements.option.value = ''; // resets the value in the form
        render();
    }
};

const clearOptions = () => {
    app.options = [];
    render();
};

const onMakeDecision = () => {
    let randomNum = Math.random(); // randum number 0 <= x < 1
    randomNum = Math.floor(randomNum * app.options.length);
    console.log('random number is ' + randomNum); 
    const option = app.options[randomNum];
    alert(option); // aparently something called moduls is better, but this quickly displays on screen.
    render();
};

const appRoot = document.getElementById('app');

const numbers = [55, 101, 1000];

const render = () => {
    // JSX works well with arrays, objects aren't directly supported nor null nor undefined nor booleans. 
    // Can have an array of JSX items that all get rendered
    // arrays of JSX need unique keys for each item so they can be individually rendered for efficiency when changed
    // In reality the key would be the identifier for the item in the database. 
    // JS arrays in JSX will all render side by side, arrays of JSX will render more nicely. JS arrays can
    // easily be mapped to JSX arrays for nicity. 
    const template = (
        <div>
            <h1>{app.title}</h1> 
            {app.subTitle && <p>{app.subTitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options: ' : 'No Options availalbe'}</p>
            <button disabled={app.options.length == 0} onClick={onMakeDecision}>What should I do?</button>
            <ol>
            {
                /* To leave a comment in JSX do it in regular JS comment wherever you are in {} working in JS */
                app.options.map (option => {
                    return <li key={option}>Options: {option}</li>
                })
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>   
            <button onClick={clearOptions}>Clear Options</button>
        </div>
    ); // These parenthesis are PURELY for aesthetics not necessary. 
    // if JSX calls a method without parenthesis the action just happens, but 
    // if it calls it with parenthesis like {onFormSubmit()} it tries to use the return value
    
    
    ReactDOM.render(template, appRoot);
}

render();