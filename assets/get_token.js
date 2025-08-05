function getToken() {
    const emailInput = document.getElementById('email');
    const responseDiv = document.getElementById('response');
    const email = emailInput.value.trim();
    
    if (!email) {
        responseDiv.innerHTML = '<span style="color: #ff6b6b; text-align: center; display: block;">Please enter an email 🙏</span>';
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        responseDiv.innerHTML = '<span style="color: #ff6b6b; text-align: center; display: block;">Please enter a valid email address</span>';      return;
    }

    responseDiv.innerHTML = '<span style="color: #4ecdc4;">Loading...</span>';

    const myHeaders = new Headers();
    myHeaders.append("Email", email);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch("https://europe-west1-publicdatasource.cloudfunctions.net/token-generator", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        responseDiv.innerHTML = `
          <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 5px; margin-top: 1rem;">
            <h3 style="color: #4ecdc4; margin: 0 0 0.5rem 0;">📋 Response</h3>
            <div style="color: white; text-align: left; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 3px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;">${data}</div>
          </div>
        `;
        return;
      }

      if (parsedData.token) {
    responseDiv.innerHTML = `
      <div style="text-align: center;">
        <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 5px; margin-top: 1rem;">
          <h3 style="color: #4ecdc4; margin: 0 0 0.5rem 0;">Token successfully generated ✅</h3>
          <h4 style="color: white; margin: 0.5rem 0;"><strong>Your token is:</strong> <span style="background: rgba(0,0,0,0.3); padding: 0.2rem 0.5rem; border-radius: 3px; font-family: monospace;">${parsedData.token}</span></h4>
          ${parsedData.message ? `<p style="color: white; margin: 0.5rem 0;"><strong>Message:</strong> ${parsedData.message}</p>` : ''}
        </div>
      </div>
    `;
  } else {
    responseDiv.innerHTML = `
      <div style="text-align: center;">
        <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 5px; margin-top: 1rem;">
          <h3 style="color: #4ecdc4; margin: 0 0 0.5rem 0;">📋 Response</h3>
          <pre style="color: white; text-align: left; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 3px; overflow-x: auto;">${JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      </div>
    `;
  }
})
    .catch(error => {
      console.error('Error:', error);
      responseDiv.innerHTML = `
        <div style="background: rgba(255, 107, 107, 0.2); padding: 1rem; border-radius: 5px; margin-top: 1rem; border: 1px solid #ff6b6b;">
          <h3 style="color: #ff6b6b; margin: 0 0 0.5rem 0;">❌ Error</h3>
          <p style="color: white; margin: 0;">An error occurred while processing your request.</p>
          <p style="color: #ffd93d; margin: 0.5rem 0 0 0; font-size: 0.9rem;">${error.message}</p>
        </div>
      `;
    });
  }
  