import React, { Component } from 'react';


class AdminScreen extends React.Component {
    render() {
        return (
            <div id="admin">
                <div id="fullpage">
                    <div className="section">
                        <div className="landing">
                            <div className="landingWrapper">
                                <div className="nav">
                                    <a href="index.html"><img src="images/logo.svg" alt="logo" className="logo" /></a>
                                    <div className="pages">
                                        <a href="#">Tips myWeb</a>
                                        <a href="#">Update About</a>
                                        <a href="#">Update Contact</a>
                                    </div>
                                </div>
                                <div className="landingContent">
                                    <h1>Tips myWeb | Admin</h1>
                                        <div className="addWebsite">
                                        </div>
                                        <div className="addWebsite">
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <p>© 2019 Tips myWeb</p>
                            <a href="#"><p>Terms</p></a>
                            <div className="pagesRight">
                                <a href="#"><img src="images/Twitter logo.svg" alt="share on twitter logo" class="share" /></a>
                                <a href="#"><img src="images/Facebook logo.svg" alt="share on facebook logo" class="share" /></a>
                                <a href="#"><img src="images/share.svg" alt="share logo" class="share" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                    <p>Tips dmewd</p>
            </div>
        )
    }
}

export default AdminScreen;