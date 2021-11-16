import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const RadarChart = () => {

    const data = {
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
          {
            label: 'Meteorites Fell and Found Radar Chart',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        scale: {
          ticks: { beginAtZero: true },
        },
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
        <><div className="radar">
          <div className='header'>
            <h1 className='title'>🌌 Meteorites Fell and Found Radar Chart</h1>
            <div className='links'>
              <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Radar.js'
              >
              </a>
            </div>
          </div>
          <Radar data={data} options={options} />
        </div>
      </>
    )
}

export default RadarChart;