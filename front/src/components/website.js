import React, { Component } from 'react';

export default class WebSiteList extends Component {
  constructor(props) {
    super(props);

    this.state = {website: []};
  }

  componentDidMount() {
    this.WebSiteList();
  }

  WebSiteList() {
    fetch("http://localhost:4001/api/v1/websites")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({website: result});
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }

  render() {
    const websites = this.state.website.map((item, i) => (
        <li><a href="#" className="btnOne">science</a></li>
    ));

    return (
      <ul id="categories">
        { websites }
      </ul>
    );
  }
}