import React, { Component } from 'react';
import { AboutModalContent } from 'tmw/components/app/AboutModalContent';
import { ContactModalContent } from 'tmw/components/app/ContactModalContent';
import { HeaderModal } from 'tmw/components/app/HeaderModal';
import { ResourceSearch } from 'tmw/components/app/ResourceSearch';
import { SuggestionModalContent } from 'tmw/components/app/SuggestionModalContent';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="landing" id="home">

                {/* Header */}
                <div className="landing_wrapper">
                    <div className="nav_landing">
                        {/* Logo */}
                        <a href=""><img src="/images/logo.svg" alt="logo" className="logo" /></a>
                        {/* Lien pour les modals */}
                        <div className="nav_pages">
                            <HeaderModal content={<SuggestionModalContent/>} target={<a>Share a website</a>}/>
                            <HeaderModal content={<AboutModalContent/>} target={<a>About</a>}/>
                            <HeaderModal content={<ContactModalContent/>} target={<a>Contact</a>}/>
                        </div>
                    </div>
                </div>

                {/* Home page content, research part */}
                <ResourceSearch />

                {/* Footer */}
                <div className="footer">
                    {/* On left  */}
                    <p>© 2019 TipsMyWeb</p>
                    <a href="#"><p>Terms</p></a>
                    {/* On right */}
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
