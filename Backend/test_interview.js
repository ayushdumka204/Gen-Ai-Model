const axios = require('axios');
const FormData = require('form-data');

(async () => {
  try {
    const formData = new FormData();
    formData.append('jobDescription', 'SDE role');
    formData.append('selfDescription', '5 years JS experience');

    const response = await axios.post('http://localhost:3000/api/interview/', formData, {
      headers: { ...formData.getHeaders() },
      withCredentials: true
    });
    console.log('success', response.data);
  } catch (err) {
    console.error('error', err.message);
    if (err.response) console.error('status', err.response.status, err.response.data);
  }
})();