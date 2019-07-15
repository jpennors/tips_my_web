import React, { Component } from 'react';
import SearchScreen from './SearchScreen';
import {ajaxPost} from "../utils/Ajax";

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suggestion : {
                'name': '',
                'url' : '',
                'main': '',
                'purpose' : '',
            },
            loading : false,
        };

        this.handleChange = this.handleChange.bind(this)
        this.saveSuggestion = this.saveSuggestion.bind(this)
    }

    handleChange(event){
        this.setState({
            suggestion: {
                ...this.state.suggestion,
                [event.target.name]: event.target.value
            }
        })
    }

    async saveSuggestion(){
        this.setState({loading:true})
        ajaxPost('suggestions', this.state.suggestion).then(result => {
            this.setState({
                loading : false
            });
        })
        .catch((errors) => {
            this.setState({
                loading:false,
            });
        });
    }


    render() {
        return (
            <div className="landing" id="home">
                {/* Popup */}

                <div className="modal_container" id="modal">
                    <div className="modal">
                        {/* <a href="#" className="close">X</a> */}
                        <span className="modal_heading">Share a website</span>
                        <form action="#">
                            <input
                                type="text"
                                placeholder="Website name"
                                name = "name"
                                value = {this.state.suggestion.name}
                                onChange = {this.handleChange}
                                required
                            />
                            <input
                                type="url"
                                placeholder="URL"
                                name = "url"
                                value = {this.state.suggestion.url}
                                onChange = {this.handleChange}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Main purpose"
                                name = "main"
                                value = {this.state.suggestion.main}
                                onChange = {this.handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Purpose"
                                main = "purpose"
                                value = {this.state.suggestion.purpose}
                                onChange = {this.handleChange}
                            />
                        </form>
                        <a href="#" className="close2">Close</a>
                        <a href="#" className="btnSubmit" onClick={this.saveSuggestion}>Submit</a>
                    </div>
                </div>
                <div className="landing_wrapper">
                    <div className="nav_landing">
                        <a href=""><img src="/images/logo.svg" alt="logo" className="logo" /></a>
                        <div className="nav_pages">
                            <a href="#modal">Share a website</a>
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
