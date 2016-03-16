# Flux


1. [Flux vs MVC](#flux-vs-mvc)
2. [MVC](#mvc)
3. [Flux](#flux)
4. [Flux implementation by Facebook](#flux-implementation-by-facebook)
5. [Flux implementation by Redux](#flux-implementation-by-redux)


## Flux vs MVC

![flux-vs-mvc][flux-vs-mvc-source]

To really understand what is the big deal with flux instead of just using MVC as always. Let's understand what MVC means in frontend side.


## MVC

MVC is a software pattern design that allow us to separate our systems/apps/programs into at least 3 layers that will be described right now

- **Model** is the layer that represents data and business logic inside our software. This layer is commonly
done in javascript taking a JSON object as a store or using an indexed db in browser side.
- **View** is the layer that represents data to user in a meaningful way. Also, this layer is responsible to react to user interactions creating actions.
- **Controller** this layer is responsible to bind view actions to make updates directly to our model in a secure way. Also, all the changes done in model layer can be abstracted in this layer to send this info to view layer.

As you can see, this representation of MVC differs a little from original backend side version of MVC. This is because in frontend side, all these layers have a little blurry line between them. It is too common that this separation can be easily forgotten.

So, for these cases in frontend we have alternatives to pure version of MVC, they are called MV* versions. In these versions, our MV* can be represented as MVC(model-view-controller), MVVM(model-view-viewmodel) and so on.

Just to show you an example of this, we can see this picture to understand best

![mvc-1][mvc-source-0]

It is important to say, that some frameworks like Angular and Ember to make things simpler, they offer to do a big step creating two-way data binding. This, allow us to synchronize our view updates directly into model and viceversa.

However, when apps grew bigger, this approach can give us some headaches trying to figure out what race condition is being triggered after few actions.

To demonstrate what i am saying, let me show you this(this picture represents perfectly what I have to live some time ago).

![mvc-nightmare][mvc-source-1]


## Flux

For the opposite side, facebook created flux as a software design pattern to deal with this problem.

These are the parts compose Flux architecture:

- **Action / Action creator** This is responsible to represent what type of action we are doing in the app,
E.g.: adding a product to a shopping cart, press play button to watch a video, etc.
- **Dispatcher** This is responsible to receive our actions and it have to deal to send these actions to all stores that are registered here(you might compare it with our C part of MVC).
- **Store** We might call it our model part. In this section, we hold all our data, but unlikely model, stores can represent more than just 1 type of data. So, it is more flexible and old models.
- **View** This represents the View as we now.

To understand what is this representation in a picture, let me show you this

![flux][flux-source]


## Flux implementation by Facebook

To make things as simple as possible, we will not use modules to keep components separated at all. Instead, we will use the module pattern to encapsulate our inner implementation from public interface.

If you do not know about which software design patterns are commonly used in javascript, you can visit this link to learn about [JAVASCRIPT DESIGN PATTERNS][javascript-design-patterns-source]

Our very first step is import all the dependencies that we will need

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';
````

`Dispatcher` is the one made by facebook and `EventEmitter` is a nodejs library that allow us to use in some sense the publisher/subscriber pattern.

Now, we need to create our custom dispatcher handler that allow us to use for our needs.


````javascript

//we encapsulate it inside our 'flux' module
const flux = (() => {
  //facebook dispatcher
  const dispatcher = new Dispatcher();

  const publicAPI = {
    register(callback){
      dispatcher.register(callback);
    },
    dispatch(action){
      dispatcher.dispatch(action);
    }
  };

  return publicAPI;
})();
````

Them, we code the action creators, responsibles of emit the action we want to trigger:

````javascript

//all our actions will be kept inside our actions object
const actions = (() => {
  return {
    addProducts(products){
      flux.dispatch({
        actionType: 'ADD_PRODUCTS',
        products
      })
    },
    findAllProducts(){
      flux.dispatch({
        actionType: 'ALL_PRODUCTS'
      });
    },
    addProduct(product){
      flux.dispatch({
        actionType: 'ADD_PRODUCT',
        product
      });
    },
    removeProduct(index){
      //just in case we need to implement it later
    }
  };
})();
````

Next step is our own implementation of store:

````javascript
//this will be our event we will be listening to emit changes and responding to changes
const CHANGE_EVENT = 'change';

//our flux store
const store = (() => {
  //catalog products
  var catalogProducts = [];

  //shopping cart products
  var basketItems = [];

  //with this function we will add products to our basket
  const addProduct = product => basketItems.push(product);

  //with this function we will replenish all the products to our catalog
  const addProducts = products => catalogProducts = products;

  //we extend the original EventEmitter to make it as a store
  const Store = {
    ...EventEmitter.prototype,
    emitChange(){
      this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
      this.removeListener(callback);
    },
    getProducts(){
      return catalogProducts;
    },
    getBasketItems(){
      return basketItems;
    },
    dispatcherIndex: flux.register((action) => {
      switch(action.actionType){
        case 'ADD_PRODUCTS':
          addProducts(action.products);
          break;
        case 'ALL_PRODUCTS':
          break;
        case 'ADD_PRODUCT':
          addProduct(action.product);
          break;
      }

      Store.emitChange();
    })
  };

  return Store;
})();
````

Now, we need to create all our components we will use

````javascript

const ProductImage = props => <img src={props.URL} />;

const Product = props => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);

const ProductList = props => (
  <div className="u-center">
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

const Basket = props => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);
````

Now, we need to create our App(root component)

````javascript
class FluxApp extends React.Component {
  constructor(){
    super();

    this.state = { products: [], basketProducts: [] };
    this.refreshState = this.refreshState.bind(this);
  }

  //before this can be actually rendered in DOM, we will be listening for store changes
  componentWillMount(){
    store.addChangeListener(this.refreshState);
  }

  //it will be executed each time when our store emits a change
  refreshState(state){
    this.setState({
      products: store.getProducts(),
      basketProducts: store.getBasketItems()
    });
  }

  //this is our action creator, that will execute our add to cart action
  addToCart(props) {
    return function(){
      actions.addProduct({
        id: props.id,
        description: props.description,
        price: props.price,
        trademark: props.trademark,
        imageURL: props.imageURL
      });
    };
  }

  render() {
    const basketProducts = this.state.basketProducts;
    const catalogProducts = this.state.products;

    return (
      <div>
        <Basket products={basketProducts} />
        <h3>Product List</h3>
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}

ReactDOM.render(<FluxApp />, document.getElementById('example'));

//we retrieve the product catalog via AJAX
$.get('/data.json', function(products){
  actions.addProducts(products);
});
````

Finally, our code should look similar to this(removing all comments)

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';

const flux = (() => {
  const dispatcher = new Dispatcher();

  const publicAPI = {
    register(callback){
      dispatcher.register(callback);
    },
    dispatch(action){
      dispatcher.dispatch(action);
    }
  }

  return publicAPI;
})();

const actions = (() => {
  return {
    addProducts(products){
      flux.dispatch({
        actionType: 'ADD_PRODUCTS',
        products
      })
    },
    findAllProducts(){
      flux.dispatch({
        actionType: 'ALL_PRODUCTS'
      });
    },
    addProduct(product){
      flux.dispatch({
        actionType: 'ADD_PRODUCT',
        product
      });
    },
    removeProduct(index){
    }
  };
})();

const CHANGE_EVENT = 'change';

const store = (() => {
  var catalogProducts = [];

  var basketItems = [];

  const addProduct = product => basketItems.push(product);

  const addProducts = products => catalogProducts = products;

  const Store = {
    ...EventEmitter.prototype,
    emitChange(){
      this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
      this.removeListener(callback);
    },
    getProducts(){
      return catalogProducts;
    },
    getBasketItems(){
      return basketItems;
    },
    dispatcherIndex: flux.register((action) => {
      switch(action.actionType){
        case 'ADD_PRODUCTS':
          addProducts(action.products);
          break;
        case 'ALL_PRODUCTS':
          break;
        case 'ADD_PRODUCT':
          addProduct(action.product);
          break;
      }

      Store.emitChange();
    })
  };

  return Store;
})();

const ProductImage = props => <img src={props.URL} />;

const Product = props => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);

const ProductList = props => (
  <div className="u-center">
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

const Basket = props => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);

class FluxApp extends React.Component {
  constructor(){
    super();

    this.state = { products: [], basketProducts: [] };
    this.refreshState = this.refreshState.bind(this);
  }

  componentWillMount(){
    store.addChangeListener(this.refreshState);
  }

  refreshState(state){
    this.setState({
      products: store.getProducts(),
      basketProducts: store.getBasketItems()
    });
  }

  addToCart(props) {
    return function(){
      actions.addProduct({
        id: props.id,
        description: props.description,
        price: props.price,
        trademark: props.trademark,
        imageURL: props.imageURL
      });
    };
  }

  render() {
    const basketProducts = this.state.basketProducts;
    const catalogProducts = this.state.products;

    return (
      <div>
        <Basket products={basketProducts} />
        <h3>Product List</h3>
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}

ReactDOM.render(<FluxApp />, document.getElementById('example'));

$.get('/data.json', function(products){
  actions.addProducts(products);
});
````

our CSS should be like this

````css
.u-center{
  text-align: center;
}

.u-box{
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
}

.Product{
  display: inline-block;
  vertical-align: top;
  border: 1px solid #eaeaea;
  padding: 1em;
  box-sizing: border-box;
  width: 20%;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  transition: all 0.3s linear;
}

.Product:hover{
  -webkit-filter: grayscale(0%);
  filter: grayscale(00%);
}

.Product-image{
}

.Product-trademark{
  text-align: left;
}

.Product-description{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}

.Product-price:before{
  content: '$ ';
}

.Button{
  padding: 0.5em;
  border-radius: 0.3em;
  cursor: pointer;
}

.Button--green{
  background-color: #4ade35;
  color: white;
  border: 3px solid #4ade35;
}
````

Then, our json data should be something like this

````json
[
    {
        "id": 1,
        "description": "Product 1 description",
        "price": 1900,
        "trademark": "Juan Valdez",
        "imageURL": "http://placehold.it/150.jpeg/e35fe3/969696"
    },
    {
        "id": 2,
        "description": "Product 2 description",
        "price": 2000,
        "trademark": "Coca cola",
        "imageURL": "http://placehold.it/150.jpeg/e0284d/969696"
    },
    {
        "id": 3,
        "description": "Product 3 description",
        "price": 3500,
        "trademark": "Starbucks",
        "imageURL": "http://placehold.it/150/1b9457/969696"
    },
    {
        "id": 4,
        "description": "Product 4 description",
        "price": 1000,
        "trademark": "Mc Cafe",
        "imageURL": "http://placehold.it/150/4d0a19/969696"
    },
    {
        "id": 5,
        "description": "Product 5 description",
        "price": 2500,
        "trademark": "Hard rock cafe",
        "imageURL": "http://placehold.it/150/5e1b5e/969696"
    }
]
````

So, our example should look similar to this(regardless the pictures)

![screen][screen14]


## Flux implementation by Redux

However, the former example using the facebook implementation is somewhat redundant and you need code that can be omitted.

In this same example we will continue using flux, but with another approach, we will use Redux library. Redux, alongside original facebook implementation, is the most popular library to implement flux and is widely adopted between javascript developers.

Redux besides follows three main principles:

- Application state is stored in just 1 store.
- The state is just readonly, to make changes in this state it should emit an action explicitly.
- Any state change inside our store, it must be represented by a completely new object.

To install redux, we need to

Redux, aparte de lo que profesa facebook, adicionalmente se basa en tres principios principales:

El estado de la aplicación es almacenado en un objeto dentro de un solo store.

Los estados son de solamente lectura, para realizar cambios sobre dicho estado se debe emitir una acción de manera explicita. Con esto se evitan las "race conditions"

Cualquier cambio de estado del store, debe ser representado por un objeto completamente nuevo.
Para instalar redux ingresaremos las siguientes lineas en nuestra terminal

````shell
$ npm install --save redux
````

To simplify the example, We are going to just work within 1 file. The first thing we should do is to import our dependencies:

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
````

As you can see, we are importing two functions ... `createStore` and `combineReducers`, these we will know what they are and what they do later.

Then, we create our reducers, but first we need to know what are reducers. Reducers, are functions that receive
the former application state as first argument and the triggered action as second argument. Then, they must return the new application state. They have the following restrictions:

- They must be pure functions(they must not alter any element outside of their scope).
- They must always return the new application state.
- If our new application state changes, we must return a whole new object for the state. We must not mutate the former one.   

To apply these restrictions, we will do it through our product catalog:

````javascript
/**
  we receive these arguments in this order:
  1.- previous application state
  2.- action that is being triggered
*/
function productCatalog(previousState = [], action){
  switch(action.type){
    case 'ALL_PRODUCTS':
      return previousState;
    case 'ADD_PRODUCTS':
      //in ES5 this is equal to: previousState.slice(0).concat(action.products);
      return [...previousState, ...action.products];
    default:
      return previousState;
  }
}
````

The most important thing here is to notice in 'ADD_PRODUCTS' case occurs something very interesting:

We take the previous state(that is an array), we create a copy of this and then we add the new elements.
As I said before, the main idea is not mutate the previous state, but to create a new one from the former one.

So, we have our first reducir responsible of doing product catalog stuff. Now, we can create another reducer to handle our shopping cart basket.

````javascript
function shoppingCart(previousState = [], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      return [...previousState, action.product];
    case 'REMOVE_PRODUCT':
      return [
        ...previousState.slice(0, action.index),
        ...previousState.slice(action.index + 1)
      ];
    default:
      return previousState;
  }
}
````

The best thing about reducers is you can create as many as you want. Each of these will be responsible for a specific section in our application. Each of these can listen to certain actions.

Then, our reducers can be composed to create just one reducer that has all the functionalities of each of those through this simple line:

````javascript
var rootReducer = combineReducers({ productCatalog, shoppingCart });

//Babel translates the code from above to this one
var rootReducer = combineReducers({ productCatalog: productCatalog, shoppingCart: shoppingCart });
````

To create the store, we need to do this

````javascript
var store = createStore(rootReducer);

//we just subscribe a callback to know when our store state changes
store.subscribe(() => console.log('new state : ', store.getState()));
````

Now, we will begin to create our React components like as we have done before.

Ahora, comenzaremos a crear nuestros componentes React como ya lo hemos hecho anteriormente.

Lets start with ProductImage component

````javascript
//if we are not going to handle state, we can refactor this component as below shows
class ProductImage extends React.Component {
  render() {
    return <img src={this.props.URL} />;
  }
}

const ProductImage = (props) => <img src={props.URL} />;
````

Then we create Product component

````javascript
class Product extends React.Component {
  render() {
    return (
      <div className="Product">
        <div className="u-center"><ProductImage URL={this.props.imageURL} /></div>
        <div className="Product-trademark">{this.props.trademark}</div>
        <div className="Product-description">{this.props.description}</div>
        <div className="Product-price">{this.props.price}</div>
        <div className="u-center">
          <button className="Button Button--green" onClick={this.props.onClick(this.props)}>Add to cart</button>
        </div>
      </div>
    );
  }
}

const Product = (props) => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);
````

Also we need to create ProductList component

````javascript
class ProductList extends React.Component {
  render() {
    return (
      <div>
        {this.props.products.map(productData => (
          <Product
            onClick={this.props.addToCart}
            key={productData.id}
            {...productData} />
          )
        )}
      </div>
    );
  }
}

const ProductList = (props) => (
  <div>
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

class Basket extends React.Component {
  render() {
    return (
      <div>
        <h4>Items in basket</h4>
        {this.props.products.map((product, index) => <Item key={index} {...product} />)}
      </div>
    );
  }
}

const Basket = (props) => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);
````

Now, we just need to create our App

````javascript
/**
  this one is different, because it holds some actions inside our app
  so, for this case we will not
*/
class ReduxApp extends React.Component {
  constructor(){
    super();
    store.subscribe(this.forceUpdate.bind(this));
  }

  addToCart(props) {
    return function(){
      store.dispatch({
        type: 'ADD_PRODUCT',
        product: { ...props }
      });
    };
  }

  render() {
    const basketProducts = store.getState().shoppingCart;
    const catalogProducts = store.getState().productCatalog;

    return (
      <div>
        <Basket products={basketProducts} />
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}
````

Finally, our code should look like this :

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

function productCatalog(state = [], action){
  switch(action.type){
    case 'ALL_PRODUCTS':
      return state;
    case 'ADD_PRODUCTS':
      return [...state, ...action.products];
    default:
      return state;
  }
}

function shoppingCart(state = [], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      return [...state, action.product];
    case 'REMOVE_PRODUCT':
      return {
        products: [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
}

var rootReducer = combineReducers({ productCatalog, shoppingCart });
var store = createStore(rootReducer);
store.subscribe(() => console.log('new state : ', store.getState()));

const ProductImage = props => <img src={props.URL} />;

const Product = props => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);

const ProductList = props => (
  <div className="u-center">
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

const Basket = props => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);

class ReduxApp extends React.Component {
  constructor(){
    super();
    store.subscribe(this.reRender.bind(this));
  }

  reRender(){
    this.forceUpdate();
  }

  addToCart(props) {
    return function(){
      store.dispatch({
        type: 'ADD_PRODUCT',
        product: { ...props }
      });
    };
  }

  render() {
    const basketProducts = store.getState().shoppingCart;
    const catalogProducts = store.getState().productCatalog;

    return (
      <div>
        <Basket products={basketProducts} />
        <h3>Product List</h3>
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}

ReactDOM.render(<ReduxApp />, document.getElementById('example'));

$.get('/data.json', function(products){
  store.dispatch({ type: 'ADD_PRODUCTS', products});
});
````

We are going to use the same CSS used in facebook flux. So, in this case the application should behave as before

![screen][screen14]


[flux-vs-mvc-source]:http://www.pro-tekconsulting.com/blog/wp-content/uploads/2015/07/FLUX-vs-MVC.jpg
[wiki-mvc-source]:https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
[mvc-source-0]:https://manojjaggavarapu.files.wordpress.com/2012/05/mvcbase.png
[mvc-source-1]:https://cdn-images-1.medium.com/max/800/1*gSSDaoZsDB-dZGKqnVk1gQ.jpeg
[flux-source]:https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png
[javascript-design-patterns-source]:https://addyosmani.com/resources/essentialjsdesignpatterns/book/
[screen14]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen14.png
