const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  

  if (name && email && password) {
      const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
              name,
              email,
              password
          }),
          headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
          console.log('success');
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText);
      }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);