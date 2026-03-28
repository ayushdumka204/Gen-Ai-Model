(async ()=>{
  try {
    const resp = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ username:'testroute', email:'testroute2@example.com', password:'Password123!' }),
      credentials: 'include'
    });
    console.log('status', resp.status);
    console.log('headers', Object.fromEntries(resp.headers.entries()));
    console.log('body', await resp.text());
  } catch(err){
    console.error('error', err);
  }
})();