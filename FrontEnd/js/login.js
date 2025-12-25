document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginData = {
        aadhar: document.getElementById("aadhar").value,
        givenpassword: document.getElementById("password").value
    };

    try {
        const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Login failed");
            return;
        }

        // Save JWT token
        localStorage.setItem("token", data.token);

        // Optional: save role for UI control
        localStorage.setItem("role", data.user.role);

        // Redirect to home page
        window.location.href = "home.html";

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
});
