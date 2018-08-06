// with this we can import React to use it
import React from 'react';
// this lib is needed to place our React App into the HTML
import ReactDOM from 'react-dom';
// here we import our component from a module
// import ComponentName from 'relativePath';
import ExampleApp from '../components/ExampleApp';

// this is the minimal example


// Also it can be written in this way. However this way is going to be taught later.
// const App = () => <p>Hello world</p>;

// this is responsible write it on the DOM.
ReactDOM.render(<ExampleApp/>, document.getElementById('app'));
