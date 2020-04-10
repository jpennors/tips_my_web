import * as React from 'react';
import { Message, Loader, Table, Label } from 'semantic-ui-react';
import { ActionMessage } from 'tmw-admin/components/ActionMessage';
import { PageHeader } from 'tmw-admin/components/PageHeader';
import { serializeLogsFromAPI } from 'tmw-admin/utils/api-serialize';
import { ajaxGet, ajaxPost } from 'tmw-common/utils/ajax';
import { Log } from 'tmw-admin/constants/app-types';
import {Line} from 'react-chartjs-2';

export const OverviewPage: React.FunctionComponent = () => {
    const [visitorsNumber, setVisitorNumbers] = React.useState<number>(0);
    const [logs, setLogs] = React.useState<Log[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const hasError = errorMessage.length > 0;
    var data = {
        labels: [""],
        datasets: [
          {
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
            data: [0]
          }
        ]
      };

    const fetchVisitorNumbers = async (): Promise<void> => {
        const endDate = new Date();
        const startDate = new Date(endDate.setMonth(endDate.getMonth()-1));

        console.log(startDate);
        return ajaxGet('current/visitors')
            .then(res => {
                setVisitorNumbers(res.data.visitors);
            })
            .catch(() => {
                setErrorMessage('Error while fetching visitors number from API.');
            });
    };

    const fetchVisitors = async() : Promise<void> => {
        return ajaxGet('visitors')
            .then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    data.labels.push(res.data[index].created_date);
                    // data.datasets.data.push(int(res.data[index].visitors));
                }
                console.log(res.data);
            })
            .catch(() => {
                setErrorMessage('Error while fetching visitors number from API.');
            });
    }

    const fetchLogs = async (): Promise<void> => {
        return ajaxPost('logs', { date: '2020-03-15' })
            .then(res => {
                const logs = serializeLogsFromAPI(res.data);
                setLogs(logs);
            })
            .catch(() => {
                setErrorMessage('Error while fetching logs list from API.');
            });
    };

    React.useEffect(() => {
        fetchVisitorNumbers().finally(() => {
            setIsLoading(false);
        });
        fetchVisitors();
        fetchLogs();
    }, []);

    const getLabelColor = function(logLevel: string) {
        if (logLevel == 'warning') {
            return 'yellow';
        } else if (logLevel == 'error') {
            return 'red';
        } else if (logLevel == 'info') {
            return 'teal';
        } else {
            return 'grey';
        }
    };

    return (
        <div>
            <PageHeader
                iconName="list alternate"
                headerContent="Overview"
                subHeaderContent="Main statistics about TipsMyWeb"
            />

            <ActionMessage type="error" message={errorMessage} />

            {/* Visitor stats */}
            {isLoading ? (
                <Loader active inline="centered" />
            ) : (
                <Message info>
                    <Message.Header>Stats</Message.Header>
                    <p>
                        Number of visitors today : <strong>{visitorsNumber}</strong>
                    </p>
                    <Line data={data} />
                </Message>
            )}

            {/* Logs table */}
            {isLoading ? (
                ''
            ) : (
                <Table celled striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell>Route</Table.HeaderCell>
                            <Table.HeaderCell>Localisation</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {logs.map(log => (
                            <Table.Row key={log.id}>
                                <Table.Cell>{log.description}</Table.Cell>
                                <Table.Cell>
                                    <Label color={getLabelColor(log.level)}>{log.level}</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {log && log.routeMethod && log.routeUri ? (
                                        <span>
                                            {log.routeMethod}: {log.routeUri}
                                        </span>
                                    ) : (
                                        '--'
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {log && log.geoipCountry && log.geoipStateName ? (
                                        <span>
                                            {log.geoipCountry}/{log.geoipStateName}
                                        </span>
                                    ) : (
                                        '--'
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </div>
    );
};
