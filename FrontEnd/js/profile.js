(async function () {
    const token = localStorage.getItem("token");

    const res = await fetch("https://voting-app-k4tq.onrender.com/user/profile", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    // Check karein ki response ok hai ya nahi
    if (!res.ok) {
        alert("Session expired. Please login again.");
        window.location.href = "login.html";
        return;
    }

    // Backend { user: { ... } } bhej raha hai, isliye data.user use karein
    const user = data.user; 

    document.getElementById("name").innerText = user.name || "N/A";
    document.getElementById("email").innerText = user.email || "N/A";
    document.getElementById("age").innerText = user.age || "N/A";
    document.getElementById("gender").innerText = user.gender || "N/A";
    document.getElementById("role").innerText = user.role || "N/A";
    
    // Aadhar safety check
    if (user.aadharCardNumber) {
        document.getElementById("aadhar").innerText = "****" + user.aadharCardNumber.toString().slice(-4);
    }
})();