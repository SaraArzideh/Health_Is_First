const BASE_URL = 'http://localhost:5000';

// A function to handle errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error fetching data');
  }
  return response.json();
};

export const fetchUserData = () => {
  const token = localStorage.getItem('token'); // Retrieve the stored token
  return fetch(`${BASE_URL}/user/data`,{
    headers: {
      'Content-Type':'aapplication/json',
      'auth-token':token  //attach the token in the request headers
    }
  })
    .then(handleResponse);
};
export const fetchDashboardData = () => {
  const token = localStorage.getItem('token'); // Retrieve the stored token
  return fetch(`${BASE_URL}/dashboard`)
    .then(handleResponse);
};

export const fetchActivityData = () => {
  const token = localStorage.getItem('token'); // Retrieve the stored token
  return fetch(`${BASE_URL}/activity`)
    .then(handleResponse);
};

export const fetchWeightData = () => {
  const token = localStorage.getItem('token'); // Retrieve the stored token
  return fetch(`${BASE_URL}/weight`)
    .then(handleResponse);
};

export const fetchDietData = () => {
  const token = localStorage.getItem('token'); // Retrieve the stored token
  return fetch(`${BASE_URL}/diet`)
    .then(handleResponse);
};
