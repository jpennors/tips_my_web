import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { PageHeader } from 'tmw-admin/components/PageHeader';
import { StatsTagsChart } from './StatsTagsChart';
import {StatsVisitorsChart} from "tmw-admin/components/Statistics/StatsVisitorsChart";

export const Statistics: React.FunctionComponent = () => {
    React.useEffect(() => {}, []);

    return (
        <div>
            <PageHeader
                iconName="chart bar outline"
                headerContent="Statistics"
                subHeaderContent="Detailed statistics about TipsMyWeb"
            />

            <Message info>
                <Message.Header>Stats Tags</Message.Header>
                <StatsTagsChart />
                <StatsVisitorsChart />
            </Message>
        </div>
    );
};
