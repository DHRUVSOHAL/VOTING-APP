document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        mobile: document.getElementById("mobile").value,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        aadharCardNumber: document.getElementById("aadhar").value
        // role → default voter (backend handles)
        // isVoted → default false
    };

    try {
        const response = await fetch("http://localhost:3000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Signup failed");
            return;
        }

        // Save token
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        // Redirect to home
        window.location.href = "home.html";

    } catch (error) {
        alert("Server error");
        console.error(error);
    }
});
