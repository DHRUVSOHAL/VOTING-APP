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
        if (user.role !== "admin") {
            const adminSection = document.getElementById("admin-section");
            if (adminSection) adminSection.style.display = "none";
        }

        // Optional welcome message
        const heading = document.getElementById("welcome");
        if (heading) heading.innerText = `Welcome, ${user.name}`;

    } catch (err) {
        console.error(err);
        window.location.href = "login.html";
    }
})();
