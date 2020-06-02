import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Display.module.css';

const Display = ({ data }) => {
    if(!data)
        return (<h1>Technical Difficulties</h1>)

    console.log(data.pos, data.death);

    return ( 
        <div className={styles.container}>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={data.pos} duration={2.5} separator="," />
                    </Typography>
                </CardContent>
            </Grid>

            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={data.death} duration={2.5} separator="," />
                    </Typography>
                </CardContent>
            </Grid>
        </div>
    );
}

export default Display;