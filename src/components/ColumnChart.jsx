import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const BarChart = () => {

    const data = {
        labels: ['1', '2'],
        datasets: [
          {
            label: 'Metorites Fell and Found',
            data: [],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };

    const [displayData, setDisplayData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
      
    useEffect(() => {
        setIsLoading(true);
        console.log('fetching data...')
        fetch(`https://data.nasa.gov/resource/gh4g-9sfh.json`)
        .then((res) => {
            return res.json();
        })
        .then(dataRes => {
            let fallData;
            console.log(dataRes);
            fallData = dataRes.map((item) => item.fall);
            let fallenData = fallData.filter(item => item === 'Fell').length;
            let foundData = fallData.filter(item => item === 'Found').length;
            const categories = [...new Set(dataRes.map((item) => item.fall))];
            setDisplayData({data: [fallenData, foundData], categories})
            setIsLoading(false);
        })
      }, 
    []);
    
    data.datasets[0].data = displayData.data;
    data.labels = displayData.categories;
    
    console.log(data);
    
    if(isLoading){
      console.log('...loading')
      return <p>loading...</p>
    }

    return (
        <>
        <div className="column">
        <div className='header'>
          <h1 className='title'>👨‍🚀 Meteorites Fell and Found Column Chart</h1>
          <div className='links'>
            <a
              className='btn btn-gh'
              href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
            >
            </a>
          </div>
        </div>
        
            <Bar data={data} options={options} />
        </div>
      </>
    )
}

export default BarChart;