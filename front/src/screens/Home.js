import React, { Component } from 'react';
import TagList from '../components/tag/tag_list.js';

class HomeScreen extends React.Component {
  render() {
    return (
        <div className="landingContent">
            <h1>What are your centers of interest?</h1>
            <p>Let’s find your most useful websites</p>
            <div className="table">
                <TagList/>
            </div>
        </div>
    )
  }
}

export default HomeScreen;
