import * as React from 'react';
import { Form } from 'semantic-ui-react';
import { serializeStatsTagsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { getApiDateFormat } from 'tmw-common/utils/date';
import { Chart } from 'chart.js';
import { convertToSelectOptions, InputSelectOption } from 'tmw-admin/utils/select-options';
import { StatTag } from 'tmw-admin/constants/app-types';

export const StatsTagsChart: React.FunctionComponent = () => {
    const [selectedTagOption, setSelectedTagOption] = React.useState<string>('primaries');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [statsTags, setStatsTags] = React.useState<StatTag[]>([]);
    const [chart, setChart] = React.useState<Chart>();

    const getParentTagOptions = (): InputSelectOption[] => {
        let options: InputSelectOption[] = [
            {
                key: 'primaries',
                value: 'primaries',
                text: 'Main Tags',
            },
            {
                key: 'best_primaries',
                value: 'best_primaries',
                text: 'Best Main Tags',
            },
            {
                key: 'best_secondaries',
                value: 'best_secondaries',
                text: 'Best Secondary Tags',
            },
        ];

        options = options.concat(
            convertToSelectOptions(
                statsTags.filter(t => t.primary),
                'id',
                'name',
            ),
        );

        return options;
    };

    const getBestTags = (primary: boolean, quantity = 10): StatTag[] => {
        return statsTags
            .filter(t => t.primary == primary)
            .sort((a, b) => {
                return a.stats.totalCount > b.stats.totalCount ? -1 : 1;
            })
            .slice(0, quantity);
    };

    const selectLabels = (tagId: string): string[] => {
        const selectedMainTag = statsTags.find(t => t.id === tagId);

        if (selectedMainTag == null) return [];

        return [selectedMainTag.name].concat(selectedMainTag.relatedTags.map(rt => rt.name));
    };

    const selectDefaultLabels = (): string[] => {
        return statsTags.filter(t => t.primary).map(t => t.name);
    };

    const selectBestLabels = (primary: boolean, quantity = 10): string[] => {
        return getBestTags(primary, quantity).map(t => t.name);
    };

    const selectData = (tagId: string): number[] => {
        const selectedMainTag = statsTags.find(t => t.id === tagId);

        if (selectedMainTag == null) return [];

        return [selectedMainTag.stats.totalCount].concat(
            selectedMainTag.relatedTags.map(rt => rt.stats.totalCount),
        );
    };

    const selectDefaultData = (): number[] => {
        return statsTags.filter(t => t.primary).map(t => t.stats.totalCount);
    };

    const selectBestData = (primary: boolean, quantity = 10): number[] => {
        return getBestTags(primary, quantity).map(t => t.stats.totalCount);
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

    const updateChartData = (selectedTagOption: string): void => {
        let labels: string[] = [];
        let data: number[] = [];
        switch (selectedTagOption) {
            case 'primaries':
                labels = selectDefaultLabels();
                data = selectDefaultData();
                break;
            case 'best_primaries':
                labels = selectBestLabels(true);
                data = selectBestData(true);
                break;
            case 'best_secondaries':
                labels = selectBestLabels(false);
                data = selectBestData(false);
                break;
            default:
                labels = selectLabels(selectedTagOption);
                data = selectData(selectedTagOption);
        }

        updateChart(labels, data);
    };

    const onTagOptionInputChange = (_: any, { value }: { value: string }): void => {
        setSelectedTagOption(value);
        updateChartData(value);
    };

    const fetchStatTags = async (): Promise<void> => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        return ajaxPost('stats/tags/search', {
            start_date: getApiDateFormat(startDate),
            end_date: getApiDateFormat(endDate),
        })
            .then(res => {
                const statsTagsResults = serializeStatsTagsFromAPI(res.data).sort((a, b) => {
                    return a.stats.totalCount > b.stats.totalCount ? -1 : 1;
                });
                setStatsTags(statsTagsResults);
                const labels = statsTagsResults.filter(t => t.primary).map(t => t.name);
                const data = statsTagsResults.filter(t => t.primary).map(t => t.stats.totalCount);
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
        fetchStatTags();
    }, []);

    return (
        <div style={{ marginTop: 20 }}>
            <Form>
                <Form.Select
                    fluid
                    placeholder="Select primary tag"
                    options={getParentTagOptions()}
                    value={selectedTagOption}
                    onChange={onTagOptionInputChange}
                />
            </Form>
            <canvas id="search_tags" />
        </div>
    );
};
