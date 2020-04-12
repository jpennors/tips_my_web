import * as React from 'react';
import { Form, Select } from 'semantic-ui-react';
import { serializeSearchTagsStatsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { getApiDateFormat } from 'tmw-common/utils/date';
import {Chart} from 'chart.js';
import { convertToSelectOptions, InputSelectOption } from 'tmw-admin/utils/select-options';
import {SearchTagStat} from 'tmw-admin/constants/app-types'


export const SearchTagsChart: React.FunctionComponent = () => {
    const [parentTagOptions, setParentTagOptions] = React.useState<InputSelectOption[]>([]);
    const [selectedTagOption, setselectedTagOption] = React.useState<string>('parent_slug')
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [searchTagsStats, setSearchTagsStats] = React.useState<SearchTagStat[]>([]);
    const [chart, setChart] = React.useState<Chart>();

    const getParentTagOptions = () : InputSelectOption[] => {
        let options :InputSelectOption[] = [
            {
                key: "parent_slug",
                value: "parent_slug",
                text: "Tags principaux",
            }
        ];
        searchTagsStats.map(t => options.push({
            key: t.slug,
            value: t.slug,
            text: t.name,
        }));

        return options;
    }

    const onTagOptionInputChange = (_: any, { value }: { value: string }): void => {
        setselectedTagOption(value);
        updateChartData(value);
    };

    const updateChartData = (selectedTagOption: string) : void => {
        
        let labels: string[] = [];
        let data: number[] = [];
        console.log(searchTagsStats);
        if(selectedTagOption === "parent_slug"){
            labels = selectDefaultLabels();
            data = selectDefaultData();
        } else {
            labels = selectLabels(selectedTagOption);
            data = selectData(selectedTagOption);
        }
        console.log()
        updateChart(labels, data);
    }

    const selectLabels = (slug: string) : string[] => {
        return searchTagsStats
            .filter(t => t.parent_slug === slug || t.slug === slug)
            .map(t => t.name);
    }

    const selectDefaultLabels = () : string[] => {
        return searchTagsStats
            .filter(t => t.is_parent)
            .map(t => t.name);
    }

    const selectData = (slug: string) : number[] => {
        return searchTagsStats
            .filter(t => t.parent_slug === slug || t.slug === slug)
            .map(t => t.count);
    }

    const selectDefaultData = () : number[] => {
        return searchTagsStats
            .filter(t => t.is_parent)
            .map(t => t.count);
    }

    const updateChart = (labels: string[], data: number[]) : void => {
        while (chart?.data.labels != null && chart.data.labels.length > 0) {
            chart.data.labels.pop();
        }
        labels.map(l => chart?.data.labels?.push(l));
        chart?.data.datasets?.forEach((dataset) => {
            dataset.data = data;
        });
        chart?.update();
    }

    const fetchSearchTags = async() : Promise<void> => {
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth()-1);
        
        return ajaxPost('stats/tags/main', { 
            start_date: getApiDateFormat(startDate),
            end_date: getApiDateFormat(endDate) 
            })
            .then(res => {
                const searchTagsStatsResults = serializeSearchTagsStatsFromAPI(res.data);
                setSearchTagsStats(searchTagsStatsResults);
                const labels = searchTagsStatsResults
                    .filter(t => t.is_parent)
                    .map(t => t.name);
                const data = searchTagsStatsResults
                    .filter(t => t.is_parent)
                    .map(t => t.count);
                setChart(new Chart('search_tags', {
                    type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
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
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                }))                
            })
            .catch(() => {
                setErrorMessage('Error while fetching visitor stats from API.');
            });
    }


    React.useEffect(() => {
        fetchSearchTags();
    }, []);


    return (
        <div>
            <Form>
                <Form.Select
                    fluid
                    placeholder='Select primary tag'
                    options={getParentTagOptions()}
                    value={selectedTagOption}
                    onChange={onTagOptionInputChange}
                />
            </Form>
            <canvas id="search_tags"></canvas>
        </div>
    );
};
