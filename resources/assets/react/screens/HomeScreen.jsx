import React, { Component } from 'react';
import { LayoutFooter } from 'tmw/components/app/LayoutFooter';
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
                <LayoutFooter/>
            </div>
        );
    }
}

export default HomeScreen;
