(async function () {
    try {
        const token = localStorage.getItem("token");

        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(
            "https://voting-app-k4tq.onrender.com/candidate/vote/count",
            { headers }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Access denied");
            window.location.href = "home.html";
            return;
        }

        const tbody = document.querySelector("#recordTable tbody");

        data.results.forEach(candidate => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${candidate.name}</td>
                <td>${candidate.party}</td>
                <td>${candidate.voteCount}</td>
            `;
            tbody.appendChild(row);
        });

    } catch (err) {
        console.error(err);
        alert("Failed to load report");
    }
})();
