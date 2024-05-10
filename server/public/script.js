// Select the registration form element
const registrationForm = document.getElementById("registration-form");






registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = document.getElementById("user-Name-input").value;
  const userEmail = document.getElementById("user-Email-input").value;
  const userPassword = document.getElementById("user-Password").value;
  const isAdmin = document.getElementById("isAdmin-input").value;
  const url = "http://localhost:3000/api/v1/register";
  try {
    // Send register data to the server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userName, userEmail, userPassword,isAdmin })
    });

    // Handle the server response
    if (response.ok) {
      const data = await response.json();
      alert(data.message);

      // Redirect or perform actions upon successful registration
      if(data.message==="successful registration"){
        window.open("login.html");
      }
     

    } else {
      const errorMessage = await response.text();
      console.error("registration failed:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
