import React, { Component } from 'react';
import SearchScreen from './SearchScreen';

class HomeScreen extends React.Component {
  render() {
    return (
        <div className="landing" id="home">
            <div className="landing_wrapper">
                <div className="nav_landing">
                    <a href=""><img src="/images/logo.svg" alt="logo" className="logo" /></a>
                    <div className="nav_pages">
                        <a href="#">Share a website</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
            <SearchScreen/>
            <div className="footer">
                <p>© 2019 TipsMyWeb</p>
                <a href="#"><p>Terms</p></a>
                <div className="social_medias">
                    <a href="#"><img src="/images/Twitter logo.svg" alt="share on twitter logo" className="social_media_img" /></a>
                    <a href="#"><img src="/images/Facebook logo.svg" alt="share on facebook logo" className="social_media_img" /></a>
                    <a href="#"><img src="/images/share.svg" alt="share logo" className="social_media_img" /></a>
                </div>
            </div>
        </div>
    )
  }
}

export default HomeScreen;
