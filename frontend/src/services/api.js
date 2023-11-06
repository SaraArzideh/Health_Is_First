const BASE_URL = 'http://localhost:3000/api'; // Adjust according to your backend server address and port

// A function to handle errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error fetching data');
  }
  return response.json();
};

export const fetchDashboardData = () => {
  return fetch(`${BASE_URL}/dashboard`)
    .then(handleResponse);
};

export const fetchActivityData = () => {
  return fetch(`${BASE_URL}/activity`)
    .then(handleResponse);
};

export const fetchWeightData = () => {
  return fetch(`${BASE_URL}/weight`)
    .then(handleResponse);
};

export const fetchDietData = () => {
  return fetch(`${BASE_URL}/diet`)
    .then(handleResponse);
};
