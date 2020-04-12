import * as React from 'react';
import { Select } from 'semantic-ui-react';
import { serializeSearchTagsStatsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { getApiDateFormat } from 'tmw-common/utils/date';
import {Chart} from 'chart.js';
import { convertToSelectOptions, InputSelectOption } from 'tmw-admin/utils/select-options';
import {SearchTagStat} from 'tmw-admin/constants/app-types'


export const SearchTagsChart: React.FunctionComponent = () => {
    const [parentTagOptions, setParentTagOptions] = React.useState<InputSelectOption[]>([]);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [searchTagsStats, setSearchTagsStats] = React.useState<SearchTagStat[]>([]);

    const updateParentTagOptions = () : void => {
        let options :InputSelectOption[] = [
            {
                key: "parent_slug",
                value: "parent_slug",
                text: "Tags principaux",
            }
        ];
        console.log(searchTagsStats);
        searchTagsStats.map(t => options.push({
            key: t.slug,
            value: t.slug,
            text: t.name,
        }));
        setParentTagOptions(options);
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
                console.log(searchTagsStats)
                // updateParentTagOptions(searchTagsStatsResults);
                
                
                const myChart = new Chart('search_tags', {
                    type: 'bar',
                        data: {
                            labels: searchTagsStatsResults
                                .filter(t => t.is_parent)
                                .map(t => t.name),
                            datasets: [{
                                data: searchTagsStatsResults
                                    .filter(t => t.is_parent)
                                    .map(t => t.count),
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
                })
            })
            .catch(() => {
                setErrorMessage('Error while fetching visitor stats from API.');
            });
    }


    React.useEffect(() => {
        fetchSearchTags().finally(() => {
            updateParentTagOptions();
        });
    }, []);


    return (
        <div>
            <Select placeholder='Select primary tag' options={parentTagOptions} />
            <canvas id="search_tags"></canvas>
        </div>
    );
};
