import * as React from 'react';
import { Header, Icon, Message } from 'semantic-ui-react';

export const OverviewPage: React.FunctionComponent = () => {
    return (
        <div>
            <Header dividing as="h3">
                <Icon name='list alternate' />
                <Header.Content>
                    Overview
                    <Header.Subheader>Main statistics about TipsMyWeb</Header.Subheader>
                </Header.Content>
            </Header>
            <Message info>
                <Message.Header>Nothing to display for now...</Message.Header>
                <p>This part of the website is under construction!</p>
            </Message>
        </div>
    );
};
