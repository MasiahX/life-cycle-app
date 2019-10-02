import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';


// using fetch returns an HTTP response and not the actual JSON data
// to extract the JSON body content from the response, we use the json() method
// it is part of the body mixin
//Body.json() takes a response stream and reads it to completion. It returns a promise
// that resolves with the result of parsing the body text as JSON.

    fetch(topStories)
       .then(data => data.json())
       .then(data => data.map(id => {
         const url = `${storyUrlBase}${id}.json`;
           return fetch(url).then(d => d.json());
       }))
       .then(promises => Promise.all(promises))
       .then(stories => this.setState({stories}))
       .catch((e) => console.log(e, 'e'));
  }

  render() {
    let views = <div> loading... </div>
    const {stories} = this.state;
    if(stories && stories.length) {
      views = stories.map(s => (
        <p key={s.id}>
          <a href={s.url}>{s.title}</a> from <strong> {s.by} </strong>
          </p>
      ))
    }
    return(
       <div className="App">
         <h2> Hacker News Top Stories </h2>
          {views}
       </div>
    )
  }
}

export default App;
