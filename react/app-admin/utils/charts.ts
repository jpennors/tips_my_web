import { Chart } from 'chart.js';

export const getNewBarChart = (): Chart => {
    return new Chart('search_tags', {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    label: 'Search',
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
    });
};
