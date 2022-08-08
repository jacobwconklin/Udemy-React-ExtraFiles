
/* let isEnabled = true;

const clickShowDetails = () => {
    isEnabled = !isEnabled;
    render();
}

const appRoot = document.getElementById('app');

const render = () => {
    const jsxTemplate = (
        <div>
            <button onClick={clickShowDetails}>{isEnabled ? 'Hide details' : 'Show details' }</button>
            {isEnabled && (
                <div>
                    <p> Extra details... </p>
                </div>
            )}
        </div>
    );

    ReactDOM.render(jsxTemplate, appRoot);
}


render();
*/



// Converting invisibility toggle to have state and react components
class VisibilityToggle extends React.Component {
    // Constructor for binding and default state
    constructor(props) {
        super (props);
        this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
        this.state = {
            visibility: true
        }
    }

    // Method for visibility button being clicked
    handleVisibilityToggle() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        })
    }

    render () {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleVisibilityToggle}>
                    {this.state.visibility ? 'Hide details' : 'Show details'}
                </button>
                {
                    this.state.visibility && (
                        <div>
                            <p> Hidden words </p>
                        </div>
                    )
                }
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));