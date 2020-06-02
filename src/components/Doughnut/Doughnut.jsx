import React, { useState, useEffect } from 'react';
import styles from './Doughnut.module.css';

import { fetchData } from '../../api';
import { Doughnut } from 'react-chartjs-2';

const Doughnut_Chart = () => {
    let perData = null;
    let bgArray = ['red', 'orange', 'yellow', 'green', '#98FB98', 'navy', 'teal', '#87cefa', 'violet', 'purple'];

    const [fetchedData, setFetchedData ] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedData(await fetchData());
        }

        fetchAPI();
    }, [])

    if(fetchedData[0]) {
        perData = fetchedData;
        perData.sort(function (a,b) {
            return a.posPerPop - b.posPerPop;
        });
        perData.reverse();
        perData = perData.slice(0, 10);
    }

    const doughnutChart = (
        perData
            ? (
                <Doughnut
                    data={{
                        labels: perData.map(res => res.state),
                        datasets: [
                            {
                                data: perData.map(res => res.posPerPop),
                                backgroundColor: bgArray,
                                label: 'Infected / 100k'
                            },
                        ],
                    }}
                    options={{
                        legend: { display: true},
                        title: {
                            display: true,
                            text: ''
                        }
                    }}
                
                />
            ) : null
    );

    return (
        <div className={styles.container}>
            { (doughnutChart) ? doughnutChart : 'Doughnut Chart'}
        </div>
    );


}

export default Doughnut_Chart;