import axios from 'axios';
import popData from './state_pop.json';


const url = 'https://covidtracking.com/api/v1';

export const fetchSimpleData = async () => {
    try {
        const { data } = await axios.get(`${url}/states/current.json`);

        let array = [];
        for(let key in popData)
            array.push(popData[key]);
        
        let modifiedData = data;


        for(let i in array)
        {
            modifiedData[i].pop = array[i];
            let math = modifiedData[i].total / modifiedData[i].pop;
            math = Math.round(math * 100000);
            modifiedData[i].testedPerPop = math;

            math = modifiedData[i].positive/ modifiedData[i].pop;
            math = Math.round(math * 100000);
            modifiedData[i].posPerPop = math;
        }

        modifiedData.sort(function(a,b) { return a.posPerPop - b.posPerPop}).reverse();

        return modifiedData;
    } catch(err) {
        console.log('Error!');
        console.error(err);
    }
}


export const fetchData = async () => {
    try {
        const { data } = await axios.get(`${url}/states/current.json`);

        let array = [];
        for(let key in popData)
            array.push(popData[key]);
    
        let modifiedData = data.map((stateData) => ({
            state: stateData.state,
            pos: stateData.positive,
        }));

        for(let i in array)
        {
            modifiedData[i].pop = array[i];
            let math = modifiedData[i].pos / modifiedData[i].pop;
            math = Math.round(math * 100000);
            modifiedData[i].posPerPop = math;

        }
        
        return modifiedData;
    } catch(err) {
        console.log('Error!');
        console.error(err);
    }
}

export const fetchDailyData = async (state) => {
    let changeableUrl = url;
    changeableUrl = (state) ? url + `/states/${state}/daily.json` 
                            : url + '/us/daily.json'; 
                            
    try {
        const { data } = await axios(changeableUrl);

        let modifiedData = data.map((dailyData) => ({
            pos: dailyData.positive,
            death: dailyData.death,
            date: dailyData.date,
            posInc: dailyData.positiveIncrease,
            deathInc: dailyData.deathIncrease,
        }));
        modifiedData.reverse();

        modifiedData[0].posAcc = 0;
        modifiedData[0].deathAcc = 0;

        for(let i = 1; i< modifiedData.length; i++) {
            modifiedData[i].posAcc = modifiedData[i].posInc - modifiedData[i - 1].posInc ;
            modifiedData[i].deathAcc = modifiedData[i].deathInc - modifiedData[i - 1].deathInc;
        }

        return modifiedData;
    } catch(err) {
        console.log('Error!');
        console.error(err);
    }
    
}

export const fetchStates = async () => {
    try {
        const { data } = await axios.get(`${url}/states/info.json`);
        
        const states = data.map(res => res.state);
        
        return states;
    } catch(err) {
        console.log('Error!');
        console.error(err);
    }
}