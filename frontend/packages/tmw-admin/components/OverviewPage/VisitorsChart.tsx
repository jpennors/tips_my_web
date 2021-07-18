import * as React from 'react';
import { serializeVisitorStatsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { getApiDateFormat } from 'tmw-common/utils/date';
import {Chart} from 'chart.js';


export const VisitorsChart: React.FunctionComponent = () => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const fetchVisitorStats = async() : Promise<void> => {
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth()-1);
        
        return ajaxPost('stats/period/visitors', { 
            start_date: getApiDateFormat(startDate),
            end_date: getApiDateFormat(endDate) 
            })
            .then(res => {
                const visitorStats = serializeVisitorStatsFromAPI(res.data);
                const myChart = new Chart('canvas', {
                    type: 'line',
                        data: {
                            labels: visitorStats.map(s => s.date),
                            datasets: [{
                                data: visitorStats.map(s => s.visitors),
                                label: 'Visitors',
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
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
        fetchVisitorStats();
    }, []);


    return (
        <div>
            <canvas id="canvas"></canvas>
        </div>
    );
};
