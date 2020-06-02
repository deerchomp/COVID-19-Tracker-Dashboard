import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { fetchDailyData } from '../../api';

export default class Chart extends React.Component
{
    state = {
        data: null,
    }

    async componentDidMount() {
        const fetchedData = await fetchDailyData('CA');

        this.setState({ data: fetchedData});
    }

    render() {
        if (!this.state.data) {
            return (
                <div>
                    <h1>Internet stopped working.....</h1>
                </div>
            );
        }
        console.log(this.state.data);

        let dailyData = this.state.data;
        dailyData.reverse();

        const data = {
            labels: dailyData.map(res => res.date),
            datasets: [
                {
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                    data: dailyData.map(res => res.pos),
                }, {
                    label: 'Death',
                    borderColor: 'red',
                    fill: true,
                    data: dailyData.map(res => res.death),
                }
            ]
        }
        console.log(data);

        return (
            <div className={styles.container}>
               <Line data={data} />
            </div>
        )
    }
}