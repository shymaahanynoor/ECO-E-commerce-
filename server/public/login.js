// Select the login form element
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userEmail = document.getElementById("user-email-input").value;
  const userPassword = document.getElementById("user-password").value;
  const url = "http://localhost:3000/api/v1/login";
  try {
    // Send login data to the server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "userEmail":sessionStorage.getItem("userEmail")
      },
      body: JSON.stringify({ userEmail, userPassword }),
    });
    // Handle the server response
    if (response.ok) {
      const data = await response.json();
      
      // console.log(response)
      //save token in cookie or sessionstorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userEmail", data.userEmail);
      // console.log(data);
      alert(data.message);

      // Redirect or perform actions upon successful login
      if (data.token) {
        /* Here Ya Mohamed --------------------------------------------------------*/
        window.open("profile.html");
      }
    } else {
      const errorMessage = await response.text();
      console.error("Login failed:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
