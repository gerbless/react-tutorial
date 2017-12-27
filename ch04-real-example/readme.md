# Real example

Until now, we have done some basic examples to understand how ReactJS works. This time, we are going to create a real example with a real use case.

We will create a Flickr search term which allow us to find photos related to search terms(It's pretty easy to do this with all the stuff we know already).

- We need to use jQuery.js or Zepto.js to manage AJAX calls
- This library has to be included in index.html

The HTML code should look as below

![screen09][screen09]

We will follow the main idea about create multiple React components. So, in this case we need to create
several Javascript files to achieve that:

- services: we save all the logic to make AJAX calls to server side and to create correct URL.
- FlickrImage: responsible for showing the retrieved image.
- ImageGallery: component that holds a FlickImage list to show to us.
- SearchTermContainer: component with the search term input and action button to begin search.
- FlickrApp: Wrapper holding everything else.


First of all, we are going to write all the needed logic to create AJAX calls in services.js

```javascript
//function that allow us to create the correct URL according to search term
const url = searchTerm => (
  `https://api.flickr.com/services/feeds/photos_public.gne?tags=${searchTerm}&format=json&&jsoncallback=?`
);

//function that allow us to make AJAX request to retrieve the info according to URL
export const findPhotosByTerm = (searchTerm, cb) => $.get(url(searchTerm), cb);
```

So, when we create a ajax call searching for **cats**, the created URL for that term should be similar to this:
`https://api.flickr.com/services/feeds/photos_public.gne?tags=cat&format=json&&jsoncallback=?`

After this, we will create the code for FlickrImage component

```javascript
import React from 'react';

/**
 *  component for image rendering
 *  @param <string> url: needed URL to show in HTML
 **/
class FlickrImage extends React.Component {
  render() {
    return <img src={this.props.url} />;
  }
}

export default FlickrImage;
```

Then, we need to create an Image gallery component to wrap all our FlickImages we found with
search term.

```javascript
import React from 'react';
import FlickrImage from './FlickrImage';

/**
 *  wrapper component that holds all the FlickrImages
 *  @param <list<string>> photos: URL list where we will fetch images
 **/
class ImageGallery extends React.Component {
  render() {
    var photos = this.props.photos.map((photoURL, index) => <FlickrImage key={index} url={photoURL} />);
    return <div>{photos}</div>;
  }
}

export default ImageGallery;
```

Now, the code for SearchTermContainer component should be similar to this

```javascript
import React from 'react';
import { findPhotosByTerm } from './services';

/**
 *  it holds the input for search term to search for
 *  @param <function> queryResolvedHandler: function that manage what we will do with search results
 **/
class SearchTermContainer extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const searchTerm = this.refs.input.value;
    findPhotosByTerm(searchTerm, this.props.queryResolvedHandler);
  }

  render() {
    return (
      <div>
        <input ref="input" type="text" />
        <button onClick={this.onClick}>Search</button>
      </div>
    );
  }
}

export default SearchTermContainer;
```

The last component we need is FlickApp that contains all other components

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import SearchTermContainer from './SearchTermContainer';
import ImageGallery from './ImageGallery';

/**
 *  main component that holds application state
 **/
class FlickrApp extends React.Component {
  constructor() {
    super();
    this.state = { photos: [] };
    this.handleAjaxResponse = this.handleAjaxResponse.bind(this);
  }

  handleAjaxResponse(data) {
    this.setState({ photos: data.items.map(item => item.media.m) });
  }

  render() {
    return (
      <div>
        <SearchTermContainer queryResolvedHandler={this.handleAjaxResponse} />
        <ImageGallery photos={this.state.photos} />
      </div>
    );
  }
}

export default FlickrApp;
```

Finally, we should get this:

![screen][screen08]

As you can see, the code above is pretty simple and straightforward. This code it's just an example for doing anything that we want to do with ReactJS.

[screen08]: ../images/screen08.png
[screen09]: ../images/screen09.png
