import { Chart, ChartDataSets } from 'chart.js';

export const primaryChartColor = 'rgba(153, 102, 255, 0.4)';
export const secondaryChartColor = 'rgba(153, 22, 35, 0.4)';

export const searchTagsChartName = 'search_tags';
export const searchTagsChartLabelName = 'Search';

export const visitorsChartName = 'visitors';
export const visitorsChartVisitorsLabelName = 'Visitors';
export const visitorsChartNewVisitorsLabelName = 'New Visitors';

export const getNewChart = (
    chartName: string,
    chartType: string,
    datasets: ChartDataSets[],
): Chart => {
    return new Chart(chartName, {
        type: chartType,
        data: {
            labels: [],
            datasets: datasets,
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
};

export const getNewChartDataset = (datasetName: string, chartColor: string): ChartDataSets => {
    return {
        data: [],
        label: datasetName,
        fill: false,
        lineTension: 0.1,
        backgroundColor: chartColor,
        borderColor: chartColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
    };
};

export const getSearchTagsStatsChart = (): Chart => {
    const datasets = [getNewChartDataset(searchTagsChartLabelName, primaryChartColor)];
    return getNewChart(searchTagsChartName, 'bar', datasets);
};

export const getVisitorsStatsChart = (): Chart => {
    const datasets = [
        getNewChartDataset(visitorsChartVisitorsLabelName, primaryChartColor),
        getNewChartDataset(visitorsChartNewVisitorsLabelName, secondaryChartColor),
    ];
    return getNewChart(visitorsChartName, 'line', datasets);
};
