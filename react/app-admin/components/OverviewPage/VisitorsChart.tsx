import * as React from 'react';
import { serializeVisitorStatsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { getApiDateFormat } from 'tmw-common/utils/date';
import { Chart } from 'chart.js';
import {
    getSearchTagsStatsChart,
    getVisitorsStatsChart,
    visitorsChartNewVisitorsLabelName,
    visitorsChartVisitorsLabelName,
} from 'tmw-admin/utils/charts';

export const VisitorsChart: React.FunctionComponent = () => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [chart, setChart] = React.useState<Chart>();

    const updateChart = (labels: Date[], visitors: number[], newVisitors: number[]): void => {
        while (chart?.data.labels != null && chart.data.labels.length > 0) {
            chart.data.labels.pop();
        }
        labels.forEach(l => chart?.data.labels?.push(l));
        console.log(chart?.data);
        chart?.data.datasets?.forEach(dataset => {
            console.log(dataset.label);
            if (dataset.label == visitorsChartVisitorsLabelName) dataset.data = visitors;
            else if (dataset.label == visitorsChartNewVisitorsLabelName) dataset.data = newVisitors;
        });
        chart?.update();
    };

    const fetchVisitorStats = async (): Promise<void> => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        return ajaxPost('stats/visitors/search', {
            start_date: getApiDateFormat(startDate),
            end_date: getApiDateFormat(endDate),
        })
            .then(res => {
                const visitorStats = serializeVisitorStatsFromAPI(res.data);

                const labels = visitorStats.map(t => t.date);
                const visitors = visitorStats.map(t => t.visitors_count);
                const newVisitors = visitorStats.map(t => t.new_visitors_count);
                updateChart(labels, visitors, newVisitors);
            })
            .catch(() => {
                setErrorMessage('Error while fetching visitor stats from API.');
            });
    };

    React.useEffect(() => {
        setChart(getVisitorsStatsChart());
    }, []);

    React.useEffect(() => {
        fetchVisitorStats();
    }, [chart]);

    return (
        <div>
            <canvas id="visitors"></canvas>
        </div>
    );
};
