document.getElementById("passwordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = {
        currentPassword: document.getElementById("currentPassword").value,
        newPassword: document.getElementById("newPassword").value
    };

    const res = await fetch("https://voting-app-k4tq.onrender.com/user/profile/password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
        alert(result.error || "Failed to change password");
        return;
    }

    alert("Password changed successfully");
    window.location.href = "home.html";
});
