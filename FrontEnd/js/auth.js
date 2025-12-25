(async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/user/profile", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const user = await res.json();

        if (!res.ok) {
            localStorage.clear();
            window.location.href = "login.html";
            return;
        }

        // Hide admin section for voters
        // auth.js


// Now user.role will correctly be "admin"
if (user.user.role !== "admin") {
    const adminSection = document.getElementById("admin-section");
    if (adminSection) adminSection.style.display = "none";
} else {
    // FORCE SHOW for admin to override home.js hiding it
    const adminSection = document.getElementById("admin-section");
    if (adminSection) adminSection.style.display = "block";
}

        // Optional welcome message
        const heading = document.getElementById("welcome");
        if (heading) heading.innerText = `Welcome, ${user.name}`;

    } catch (err) {
        console.error(err);
        window.location.href = "login.html";
    }
})();
