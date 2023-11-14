import React,{ useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {FETCH_WEIGHTS} from '../actions/dataActions';
import * as d3 from 'd3';

function WeightHistoryGraph() {
  const [weightHistory, setWeightHistory] = useState([]);

  useEffect(() => {
    // Function to fetch weight data from the backend
    const fetchWeightHistory = async () => {
      const response = await fetch('http://localhost:5000/weight/history',{
        headers:{
          'auth-token':localStorage.getItem('token')
        }
      });
      const data = await response.json();
      setWeightHistory(data);
    };

    fetchWeightHistory();
  }, []);

  const data = {
    labels: weightHistory.map(entry => entry.date), // entry has a date field
    datasets: [
      {
        label: 'Weight over time',
        data: weightHistory.map(entry => entry.weight), // entry has a weight field
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={data} />;
}
export default WeightHistoryGraph;