import React, { Component } from 'react';
import { LayoutHeader } from 'tmw/components/app/LayoutHeader';
import { ResourceSearch } from 'tmw/components/app/ResourceSearch';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="landing" id="home">

                <LayoutHeader/>

                <ResourceSearch />

                <div className="footer">
                    <p>© 2019 TipsMyWeb</p>
                    <a href="#"><p>Terms</p></a>
                    <div className="social_medias">
                        <a href="#"><img src="/images/Twitter logo.svg" alt="share on twitter logo" className="social_media_img" /></a>
                        <a href="#"><img src="/images/Facebook logo.svg" alt="share on facebook logo" className="social_media_img" /></a>
                        <a href="#"><img src="/images/Share.svg" alt="share logo" className="social_media_img" /></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeScreen;
