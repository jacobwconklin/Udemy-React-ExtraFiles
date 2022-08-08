// A Node Script ooOOOoooh

const path = require('path');
console.log(path.join(__dirname, 'public')); // __dirname contains the path to the current location
// node Path is a built in module for path manipulations for stuff like path.join to combine paths, 

module.exports = {
    // Entry tells webpack where to start
    entry: './src/app.js',
    // mode: 'development',
    output: {
        path: '/Users/jconklin/Library/CloudStorage/OneDrive-RedVentures/UdemyReactCourse/Indecision App/public', // absolute path to where you output file
        filename: 'bundle.js' // name of file to output, can be anything
    }

};


