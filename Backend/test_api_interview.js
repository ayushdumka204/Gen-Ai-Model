const axios = require('axios')
;(async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/interview/', {
      jobDescription: 'AI engineer open role',
      selfDescription: '5 years experience in AI and cloud'
    })
    console.log('OK', res.status, res.data)
  } catch (err) {
    if (err.response) {
      console.error('ERR', err.response.status, JSON.stringify(err.response.data))
    } else {
      console.error('ERR', err.message)
    }
  }
})()
