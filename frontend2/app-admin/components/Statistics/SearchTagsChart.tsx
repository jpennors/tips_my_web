import * as React from 'react';
import { Form, Select } from 'semantic-ui-react';
import { serializeSearchTagsStatsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { getApiDateFormat } from 'tmw-common/utils/date';
import { Chart } from 'chart.js';
import { convertToSelectOptions, InputSelectOption } from 'tmw-admin/utils/select-options';
import { SearchTagStat } from 'tmw-admin/constants/app-types';

export const SearchTagsChart: React.FunctionComponent = () => {
    const [parentTagOptions, setParentTagOptions] = React.useState<InputSelectOption[]>([]);
    const [selectedTagOption, setselectedTagOption] = React.useState<string>('primaries');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [searchTagsStats, setSearchTagsStats] = React.useState<SearchTagStat[]>([]);
    const [chart, setChart] = React.useState<Chart>();

    const getParentTagOptions = (): InputSelectOption[] => {
        let options: InputSelectOption[] = [
            {
                key: 'primaries',
                value: 'primaries',
                text: 'Tags principaux',
            },
        ];

        options = options.concat(
            convertToSelectOptions(
                searchTagsStats.filter(t => t.primary),
                'id',
                'name',
            ),
        );

        return options;
    };

    const onTagOptionInputChange = (_: any, { value }: { value: string }): void => {
        setselectedTagOption(value);
        updateChartData(value);
    };

    const updateChartData = (selectedTagOption: string): void => {
        let labels: string[] = [];
        let data: number[] = [];
        if (selectedTagOption === 'primaries') {
            labels = selectDefaultLabels();
            data = selectDefaultData();
        } else {
            labels = selectLabels(selectedTagOption);
            data = selectData(selectedTagOption);
        }
        updateChart(labels, data);
    };

    const selectLabels = (tag_id: string): string[] => {
        return searchTagsStats.filter(t => t.id === tag_id).map(t => t.name);
    };

    const selectDefaultLabels = (): string[] => {
        return searchTagsStats.filter(t => t.primary).map(t => t.name);
    };

    const selectData = (tag_id: string): number[] => {
        return searchTagsStats.filter(t => t.id === tag_id).map(t => t.count);
    };

    const selectDefaultData = (): number[] => {
        return searchTagsStats.filter(t => t.primary).map(t => t.count);
    };

    const updateChart = (labels: string[], data: number[]): void => {
        while (chart?.data.labels != null && chart.data.labels.length > 0) {
            chart.data.labels.pop();
        }
        labels.forEach(l => chart?.data.labels?.push(l));
        chart?.data.datasets?.forEach(dataset => {
            dataset.data = data;
        });
        chart?.update();
    };

    const fetchSearchTags = async (): Promise<void> => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        return ajaxPost('stats/tags/search', {
            start_date: getApiDateFormat(startDate),
            end_date: getApiDateFormat(endDate),
        })
            .then(res => {
                const searchTagsStatsResults = serializeSearchTagsStatsFromAPI(res.data);
                setSearchTagsStats(searchTagsStatsResults);
                const labels = searchTagsStatsResults.filter(t => t.primary).map(t => t.name);
                const data = searchTagsStatsResults.filter(t => t.primary).map(t => t.count);
                setChart(
                    new Chart('search_tags', {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: data,
                                    label: 'Visitors',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(153, 102, 255, 0.4)',
                                    borderColor: 'rgba(153, 102, 255, 1)',
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
                                },
                            ],
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
                    }),
                );
            })
            .catch(() => {
                setErrorMessage('Error while fetching visitor stats from API.');
            });
    };

    React.useEffect(() => {
        fetchSearchTags();
    }, []);

    return (
        <div>
            <Form>
                <Form.Select
                    fluid
                    placeholder="Select primary tag"
                    options={getParentTagOptions()}
                    value={selectedTagOption}
                    onChange={onTagOptionInputChange}
                />
            </Form>
            <canvas id="search_tags"></canvas>
        </div>
    );
};
