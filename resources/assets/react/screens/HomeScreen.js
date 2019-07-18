import React, { Component } from 'react';
import SearchScreen from './SearchScreen';
import {ajaxPost} from "../utils/Ajax";
import { Button, Modal } from 'semantic-ui-react'

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

    openModal(event){
        const modal_id = event.target.getAttribute("data-tag")
        var modal = document.getElementById(modal_id);
        modal.style.display = "block";
    }

    closeModal(event){
        const modal_id = event.target.getAttribute("data-tag")
        console.log(modal_id)
        var modal = document.getElementById(modal_id);
        if (modal && modal_id){
            modal.style.display = "none"
        }
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

                <div data-tag="sharing_modal" id="sharing_modal" className="modal_container" onClick={this.closeModal}>

                    <div className="modal">
                        <span className="modal_heading">share a website</span>
                        <form>
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
                        <a data-tag="sharing_modal" className="close2" onClick={this.closeModal}>Close</a>
                        <a className="btnSubmit" onClick={this.saveSuggestion}>Submit</a>
                    </div>

                </div>

                <div data-tag="about_modal" id="about_modal" className="modal_container" onClick={this.closeModal}>

                    <div className="modal">
                        <span className="modal_heading">about - tips my web</span>
                        <a data-tag="about_modal" className="close2" onClick={this.closeModal}>Close</a>
                    </div>

                </div>
                
                <div data-tag="contact_modal" id="contact_modal" className="modal_container" onClick={this.closeModal}>

                    <div className="modal">
                        <span className="modal_heading">contact</span>
                        <a data-tag="contact_modal" className="close2" onClick={this.closeModal}>Close</a>
                    </div>

                </div>
                <div className="landing_wrapper">
                    <div className="nav_landing">
                        <a href=""><img src="/images/logo.svg" alt="logo" className="logo" /></a>
                        <div className="nav_pages">
                            <a data-tag="sharing_modal" onClick={this.openModal}>Share a website</a>
                            <a data-tag="about_modal" onClick={this.openModal}>About</a>
                            <a data-tag="contact_modal" onClick={this.openModal}>Contact</a>
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
                        <a href="#"><img src="/images/Share.svg" alt="share logo" className="social_media_img" /></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeScreen;
