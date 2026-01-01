(async function () {
    try {
        const token = localStorage.getItem("token");

        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(
            "https://voting-app-k4tq.onrender.com/user/voters",
            { headers }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Access denied");
            window.location.href = "home.html";
            return;
        }

        const tbody = document.querySelector("#voterTable tbody");

        data.voters.forEach(voter => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${voter.name}</td>
                <td>${voter.aadharCardNumber}</td>
                <td>${voter.isVoted ? "Yes" : "No"}</td>
            `;
            tbody.appendChild(row);
        });

    } catch (err) {
        console.error(err);
        alert("Failed to load voter list");
    }
})();
