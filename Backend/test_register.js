const axios=require('axios');
(async ()=>{
  try {
    const api = axios.create({ baseURL:'http://localhost:3000', withCredentials:true});
    const res = await api.post('/api/auth/register', { username:'testuser3', email:'test3@example.com', password:'secret123'});
    console.log('ok', res.data);
  } catch (err) {
    console.error('err', err.message);
    if (err.response) {
      console.error('status', err.response.status);
      console.error('data', err.response.data);
    }
  }
})();