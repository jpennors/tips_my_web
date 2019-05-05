import React, { Component } from 'react';
import './App.css';
import HomeScreen from './screens/Home';
import AdminScreen from './screens/Admin';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (

             <div id="fullpage">
                <div className="section">
                    <div className="landing">
                        <div className="landingWrapper">
                            <div className="nav">
                                <a href="index.html"><img src="/assets/images/logo.svg" alt="logo" className="logo" /></a>
                                <div className="pages">
                                    <a href="#">Share a website</a>
                                    <a href="#">About</a>
                                    <a href="#">Contact</a>
                                </div>
                            </div>
                        </div>
                        <HomeScreen/>
                        {/* <Route path="/" component={HomeScreen}/> */}
                        <div className="footer">
                            <p>© 2019 TipsMyWeb</p>
                            <a href="#"><p>Terms</p></a>
                            <div className="pagesRight">
                                <a href="#"><img src="/assets/images/Twitter logo.svg" alt="share on twitter logo" className="share" /></a>
                                <a href="#"><img src="/assets/images/Facebook logo.svg" alt="share on facebook logo" className="share" /></a>
                                <a href="#"><img src="/assets/images/share.svg" alt="share logo" className="share" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        //     <Route path="/admin" component={AdminScreen}/>
        //      <div id="fullpage">
        //         <div className="section">
        //             <div className="landing">
        //                 <div className="landingWrapper">
        //                     <div className="nav">
        //                         <a href="index.html"><img src="/assets/images/logo.svg" alt="logo" className="logo" /></a>
        //                         <div className="pages">
        //                             <a href="#">Share a website</a>
        //                             <a href="#">About</a>
        //                             <a href="#">Contact</a>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <Route path="/" component={HomeScreen}/>
        //                 <div className="footer">
        //                     <p>© 2019 TipsMyWeb</p>
        //                     <a href="#"><p>Terms</p></a>
        //                     <div className="pagesRight">
        //                         <a href="#"><img src="/assets/images/Twitter logo.svg" alt="share on twitter logo" className="share" /></a>
        //                         <a href="#"><img src="/assets/images/Facebook logo.svg" alt="share on facebook logo" className="share" /></a>
        //                         <a href="#"><img src="/assets/images/share.svg" alt="share logo" className="share" /></a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Router>
    )
  }
}

export default App;
