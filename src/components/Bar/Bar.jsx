import React, { useState, useEffect } from 'react';
import styles from './Bar.module.css';

import { fetchData } from '../../api';
import { HorizontalBar } from 'react-chartjs-2';

const Bar = () => {
    let perData = null;
    let bgArray = ['red', 'orange', 'yellow', 'green', '#98FB98', 'navy', 'teal', '#87cefa', 'violet', 'purple'];

    const [fetchedData, setFetchedData ] = useState({});

    // (() => {
    //     for(let i = 0; i < 10; i++) {
    //         const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    //         bgArray.push(randomColor);
    //     }
    // }) ()

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

    const barChart = (
        perData
            ? (
                <HorizontalBar
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
                        legend: { display: false},
                        title: {
                            display: true,
                            text: 'Top 10 Infected States per 100,000 people'
                        }
                    }}
                
                />
            ) : null
    );

    return (
        <div className={styles.container}>
            { (barChart) ? barChart : 'Bar Chart'}
        </div>
    );


}

export default Bar;