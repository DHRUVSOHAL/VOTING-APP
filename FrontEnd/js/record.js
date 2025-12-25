(async function () {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch("http://localhost:3000/candidate/vote/count", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Access denied");
            window.location.href = "home.html";
            return;
        }

        const tbody = document.querySelector("#recordTable tbody");

        data.forEach(candidate => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${candidate.name}</td>
                <td>${candidate.party}</td>
                <td>${candidate.votes}</td>
            `;

            tbody.appendChild(row);
        });

    } catch (err) {
        console.error(err);
        alert("Failed to load report");
    }
})();
