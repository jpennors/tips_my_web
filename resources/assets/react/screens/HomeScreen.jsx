import React, { Component } from 'react';
import { ResourceSearch } from 'tmw/components/app/ResourceSearch';
import { ajaxPost } from 'tmw/utils/Ajax';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestion: {
                url: '',
                description: '',
            },
            contact: {
                email: '',
                message: '',
            },
            loading: false,
        };
    }

    handleSuggestionChange = event => {
        const { name, value } = event.target;
        this.setState(previousState => ({
            suggestion: {
                ...previousState.suggestion,
                [name]: value,
            },
        }));
    };

    handleContactChange = event => {
        const { name, value } = event.target;
        this.setState(previousState => ({
            contact: {
                ...previousState.contact,
                [name]: value,
            },
        }));
    };

    openModal = event => {
        const modalId = event.target.getAttribute('data-tag');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    };

    closeModal = event => {
        const modalId = event.target.getAttribute('data-tag');
        const modal = document.getElementById(modalId);
        if (modal && modalId) {
            modal.style.display = 'none';
        }
    };

    saveSuggestion = async () => {
        this.setState({ loading: true });
        ajaxPost('suggestions', this.state.suggestion).then(() => {
            this.setState({
                loading: false,
                suggestion: {
                    url: '',
                    description: '',
                },
            });
            const modal = document.getElementById('sharing_modal');
            modal.style.display = 'none';
        })
        .catch(() => {
            this.setState({
                loading: false,
            });
        });
    };

    saveContact = async () => {
        this.setState({ loading: true });
        ajaxPost('contacts', this.state.contact).then(() => {
            this.setState({
                loading: false,
                contact: {
                    email: '',
                    message: '',
                },
            });
            const modal = document.getElementById('contact_modal');
            modal.style.display = 'none';
        })
        .catch(() => {
            this.setState({
                loading: false,
            });
        });
    };


    render() {
        return (
            <div className="landing" id="home">


                {/* Modals */}

                {/* Sharing modal */}
                <div data-tag="sharing_modal" id="sharing_modal" className="modal_container" onClick={this.closeModal}>

                    <div className="modal">
                        <span className="modal_heading">share a website</span>
                        <div className="modal_content black_color">
                            <p className="font15">
                                share with the community your best resources
                            </p>
                            <form>
                                <input
                                    type="url"
                                    placeholder="https://tipsmyweb.com"
                                    name="url"
                                    value={this.state.suggestion.url}
                                    onChange={this.handleSuggestionChange}
                                    required
                                />
                                <textarea
                                    rows="4"
                                    placeholder="description"
                                    name="description"
                                    value={this.state.suggestion.description}
                                    onChange={this.handleSuggestionChange}
                                />
                            </form>
                        </div>
                        <div className="modal_btn">
                            <a data-tag="sharing_modal" className="close" role="button" onClick={this.closeModal}>Close</a>
                            <a className="btnSubmit" onClick={this.saveSuggestion}>Submit</a>
                        </div>
                    </div>

                </div>

                {/* About modal  */}
                <div data-tag="about_modal" id="about_modal" className="modal_container" onClick={this.closeModal}>

                    <div className="modal">
                        <span className="modal_heading">
                            about – tips myWeb
                            <br />
                            <span className="font15">resources to improve your workflow</span>
                        </span>
                        <div className="modal_content black_color">
                            <p className="font15">
                                tips myWeb is giving you the best resources in a specific field.
                                These websites that you normally discover after 2 years in a specific domain
                            </p>
                            <p className="font12">
                                This project has been created by two students after seeing that too many people
                                are struggling in their daily workflow, and they don’t imagine how much developer
                                have created awesome websites to help them.
                            </p>
                            <br />
                            <p className="font10">
                                Created by Josselin Pennors & Hugo Jouffre
                            </p>
                        </div>
                        <div className="modal_btn">
                            <a data-tag="about_modal" className="close" onClick={this.closeModal}>Close</a>
                            <a className="btnSubmit" onClick={this.saveSuggestion}>Support us</a>
                        </div>
                    </div>

                </div>

                {/* Contact modal */}
                <div data-tag="contact_modal" id="contact_modal" className="modal_container" onClick={this.closeModal}>
                    <div className="modal">
                        <span className="modal_heading">contact</span>
                        <div className="modal_content black_color">
                            <p className="font15">
                                send us your comments
                            </p>
                            <form>
                                <input
                                    type="text"
                                    placeholder="your email"
                                    name="email"
                                    value={this.state.contact.email}
                                    onChange={this.handleContactChange}
                                    required
                                />
                                <textarea
                                    placeholder="message"
                                    name="message"
                                    value={this.state.contact.message}
                                    onChange={this.handleContactChange}
                                />
                            </form>
                        </div>
                        <div className="modal_btn">
                            <a data-tag="contact_modal" className="close" onClick={this.closeModal}>Close</a>
                            <a className="btnSubmit" onClick={this.saveContact}>Submit</a>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="landing_wrapper">
                    <div className="nav_landing">
                        {/* Logo */}
                        <a href=""><img src="/images/logo.svg" alt="logo" className="logo" /></a>
                        {/* Lien pour les modals */}
                        <div className="nav_pages">
                            <a data-tag="sharing_modal" onClick={this.openModal}>Share a website</a>
                            <a data-tag="about_modal" onClick={this.openModal}>About</a>
                            <a data-tag="contact_modal" onClick={this.openModal}>Contact</a>
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
