import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { PageHeader } from 'tmw-admin/components/PageHeader';

export const OverviewPage: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                iconName="list alternate"
                headerContent="Overview"
                subHeaderContent="Main statistics about TipsMyWeb"
            />
            <Message info>
                <Message.Header>Nothing to display for now...</Message.Header>
                <p>This part of the website is under construction!</p>
            </Message>
        </div>
    );
};
