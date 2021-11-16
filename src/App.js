import './App.css';
import PieChart from './components/PieChart';
import BarChart from './components/ColumnChart';
import RadarChart from './components/RadarChart';

function App() {

  return (
    <div className="App">
      <PieChart className="PieChart"/>
      <BarChart />
      <RadarChart />
    </div>
  );
}

export default App;
