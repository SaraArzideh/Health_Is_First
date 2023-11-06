import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function WeightHistoryGraph() {
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    // Function to fetch weight data from the backend
    const fetchWeightData = async () => {
      const response = await fetch('/:weightId');
      const data = await response.json();
      setWeightData(data);
    };

    fetchWeightData();
  }, []);

  const data = {
    labels: weightData.map(entry => entry.date), // entry has a date field
    datasets: [
      {
        label: 'Weight over time',
        data: weightData.map(entry => entry.weight), // entry has a weight field
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={data} />;
}
export default WeightHistoryGraph;