import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { PageHeader } from 'tmw-admin/components/PageHeader';
import { SearchTagsChart } from './SearchTagsChart';

export const StatisticsPage: React.FunctionComponent = () => {
    return (
        <div>
            <PageHeader
                iconName="chart bar outline"
                headerContent="Statistics"
                subHeaderContent="Detailed statistics about TipsMyWeb"
            />

            <Message info>
                <Message.Header>Search tags</Message.Header>
                <SearchTagsChart />
            </Message>
        </div>
    );
};
