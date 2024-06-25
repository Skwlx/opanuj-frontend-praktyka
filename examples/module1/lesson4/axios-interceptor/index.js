import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const startTime = new Date().getTime();
  config.startTime = startTime;
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(
    'Request time:',
    new Date().getTime() - response.config.startTime,
    'ms'
  );
  return response;
});

const {
  data: { articles },
} = await axios.get('/api/data/articles?timeout=3000');

document.querySelector('#data').innerHTML = articles[0].content;
