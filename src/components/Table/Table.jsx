import React, { useState, useEffect } from 'react';
import styles from './Table.module.css';
import { fetchSimpleData } from '../../api';
import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const InfoTable = () => {
    const [fetchedData, setFetchedData ] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedData(await fetchSimpleData());
        }

        fetchAPI();
    }, [])

    if(!fetchedData)
        return (<h1>Loading....</h1>);

    console.log(fetchedData);

    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'><b>State</b></TableCell>
                        <TableCell align='center'><b>PosPer100k</b></TableCell>
                        <TableCell align='center'><b>Positive</b></TableCell>
                        <TableCell align='center'><b>TestPer100k</b></TableCell>
                        <TableCell align='center'><b>Tested</b></TableCell>
                        <TableCell align='center'><b>Deaths</b></TableCell>
                        <TableCell align='center'><b>Recovered</b></TableCell>
                        <TableCell align='center'><b>HosCurr</b></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {fetchedData.map( res => (
                        <TableRow key={res.state}>
                            <TableCell align='center'>{res.state}</TableCell>
                            <TableCell align='center'>{res.posPerPop}</TableCell>
                            <TableCell align='center'>{res.positive}</TableCell>
                            <TableCell align='center'>{res.testedPerPop}</TableCell>
                            <TableCell align='center'>{res.total}</TableCell>
                            <TableCell align='center'>{res.death}</TableCell>
                            <TableCell align='center'>{res.recovered}</TableCell>
                            <TableCell align='center'>{res.hospitalizedCurrently}</TableCell>
                        </TableRow>                        
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}

export default InfoTable;