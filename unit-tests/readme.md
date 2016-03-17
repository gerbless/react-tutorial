# Unit tests

1. [What are unit tests](#what-are-unit-tests)
2. [Tape vs Mocha](#tape-vs-mocha)
3. [My first unit test](#my-first-unit-test)


Until now, we have learned how to create React components, configure webpack and browserify, use gulp and how to create tasks with it.

So, with this in mind, if all of our work is being automated, how we can automate our tests ?

Well, I have to say we can achieve this with units tests.

### What are unit tests

According to wikipedia, unit tests are this:

> In programming, unit test is a way to test the correct behavior from a specific module or code. This is useful to have the confidence each of modules can works perfectly.

With unit test we can achieve the next ideas

- Test automation
- Easier bug detection
- Easier code refactoring

### Tape vs Mocha

To make use of unit tests, we have to choose among many tools. I can recommend you two among them that make my life easier.

- **Tape** A simple tool to test your code by assertion tests. It is easy to use and is easy to learn.
- **Mocha** A complete tool that allow us to customize everything in it.

For this tutorial we will use Tape. So, we need to install a couple of dependencies to begin to work with.

````shell
$ npm install --save-dev tape babel-tape-runner extend-tape tape-jsx-equals react-addons-test-utils react-unit faucet
````

Now, we need to modify our package.json file just a little bit:


````javascript
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack --progress --colors",
  "build-prod": "webpack --optimize-minimize --progress --colors",
  "gulp-copy": "gulp copy",
  "gulp": "gulp",
  "test": "babel-tape-runner test.js | faucet"
},
"babel": {
  "presets": ["es2015", "react", "stage-2"]
}
````

With this, we now can use tape to start unit testing of our code.


### My first unit test

To make our first example for an unit test, we will create a function that adds two numbers.

````javascript
import test from 'tape';

//function to make a sum of a plus b
function add(a, b) {
  return a + b;
}

//this is our test we are going to run
test('it should add correctly in these cases', t => {
  //actual values and expected values
  const values = [
    { actual: add(1, 2), expected: 3 },
    { actual: add(2, 2), expected: 4 },
    { actual: add(2, -5), expected: -3 }
  ];

  values.forEach(value => (
    t.equal(value.actual, value.expected,
      `actual ${value.actual} expected ${value.expected}`
    )
  ));

  //we will finish our tests for this case
  t.end();
});
````

with this file, we can run our tests this way

![screen][screen15]

In this case, we have prove that adding two numbers was done as expected. However, if we want to use our test cases to our function to be "bug free" we need to add more tests.

````javascript
const values = [
  { actual: add(1, 2), expected: 3 },
  { actual: add(2, 2), expected: 4 },
  { actual: add(2, -5), expected: -3 },
  //new test cases
  { actual: add(2, '3'), expected: 5 },
  { actual: add('a', 'b'), expected: 0 },
  { actual: add(), expected: 0 },
  { actual: add(null, false), expected: 0 },
  { actual: add(undefined, ''), expected: 0 },
  { actual: add(true, []), expected: 0 }
];
````

Now, we execute again our test and this happens

![screen][screen16]

As you can see, our function is not robust as we think. So we need to do some little changes if we want to behave properly:

````javascript
function add(a, b) {
  a = isNaN(a) ? 0 : parseInt(a, 10);
  b = isNaN(b) ? 0 : parseInt(b, 10);

  return isNaN(a + b) ? 0 : a + b;
}
````

We execute our test again and we get this

![screen][screen17]

So, as you can see, we can create tests to achieve automatic tests with our modules and components.

Also, we can test our react components to make sure they behave as expected. To do this, we need to create a test like this:

````javascript
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
const test = addAssertions(tape, {jsxEquals});

//Our react component we will use for test purposes
class Button extends React.Component {
  render() {
    return <button className="test-button">Im a button</button>;
  }
}

test('it should render a button component', t => {
  //with this way we will render our component and its children
  const renderer = createRenderer();
  renderer.render(<Button />);
  const fullComponent = renderer.getRenderOutput();

  //this is other way to do it, but it just renders the component alone
  const shallowComponent = createComponent.shallow(<Button />);

  t.equal(shallowComponent.props.className, 'test-button', 'it does not have a text-button className');
  t.equal(shallowComponent.text, 'Im a button', `it shows ${shallowComponent.text} instead of Im a button`);

  t.equal(fullComponent.props.className, 'test-button', 'it does not have a text-button className');
  t.equal(fullComponent.props.children, 'Im a button', `it shows ${fullComponent.props.children} instead of Im a button`);

  t.end();
});
````

For this test, this execution should be similar to this

![screen][screen18]

So, it should be our main priority create automatic tests to make our code healthier and if we need to do some changes in our code, the tests will tell us if we are creating a new bug or does not meet the previous requirements.


[back to previous page](../README.md#unit-tests)


[screen15]:../images/screen15.png
[screen16]:../images/screen16.png
[screen17]:../images/screen17.png
[screen18]:../images/screen18.png
