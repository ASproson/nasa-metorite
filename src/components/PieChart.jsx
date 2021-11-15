import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';



const PieChart = () => {

  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const [displayData, setDisplayData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    console.log('fetching data...')
    fetch(`https://data.nasa.gov/resource/gh4g-9sfh.json`)
    .then((res) => {
        return res.json();
    })
    .then(dataRes => {
        let fallData;
        fallData = dataRes.map((item) => item.fall);
        let fallenData = fallData.filter(item => item === 'Fell').length;
        let foundData = fallData.filter(item => item === 'Found').length;
        setDisplayData([fallenData, foundData])
        // setIsLoading(false);
    })
  }, 
[]);


if(displayData.length === 2){
  console.log(displayData);
  data.datasets[0].data = displayData;
}
// if(isLoading) return <p>loading...</p>

  return (
    (
      <>
        <div className='header'>
          <h1 className='title'>Pie Chart</h1>
          <div className='links'>
            <a
              className='btn btn-gh'
              href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Pie.js'
            >
              Github Source
            </a>
          </div>
        </div>
        {/* <Pie data={displayData} /> */}
      </>
    )
  );
}

export default PieChart;