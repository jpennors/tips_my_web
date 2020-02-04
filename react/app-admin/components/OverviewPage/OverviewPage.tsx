import * as React from 'react';
import { Header, Message } from 'semantic-ui-react';

export const OverviewPage: React.FunctionComponent = () => {
    return (
        <div>
            <Header dividing size="huge" as="h1">
                Overview
            </Header>
            <Message info>
                <Message.Header>Nothing to display for now...</Message.Header>
                <p>This part of the website is under construction!</p>
            </Message>
        </div>
    );
};
