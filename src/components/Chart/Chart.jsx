import React, {useState, useEffect} from 'react'
import { fetchDailyData } from '../../Api/api'
import {Line, Bar} from 'react-chartjs-2'
import Styles from './Chart.module.css'
export default function Chart({data : {confirmed,recovered,deaths} ,country}) {
    const [dailyData, setDailyData] = useState([])
    useEffect(() => {
        const getDailyData = async () => {
            setDailyData(await fetchDailyData())
        }
        getDailyData();
        // console.log(dailyData)
    }, [])

    const lineChart = (
        dailyData.length ?
            (<Line
                data = {{
                    labels : dailyData.map(({date}) => date),
                    datasets : [{
                        data : dailyData.map(({confirmed})=>confirmed),
                        label : "Infected",
                        borderColor : '#3333ff',
                        fill : true
                    },{
                        data : dailyData.map(({deaths}) => deaths),
                        label : 'Deaths',
                        borderColor : 'rgba(255,40,0,0.5)',
                        backgroundColor : 'rgba(255,0,0,0.5)',
                        fill : true
                    }]
                }}

                />):null
    )
    const barChart = (
        confirmed ? (
            <Bar
              data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                  {
                    label: 'People',
                    backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                    data: [confirmed.value, recovered.value, deaths.value],
                  },
                ],
              }}
              options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
              }}
            />
          ) : null
    )
    return (
        <div className = {Styles.container}>
            {/* {barChart} */}
          {country ? barChart : lineChart}
        </div>
    )
}
