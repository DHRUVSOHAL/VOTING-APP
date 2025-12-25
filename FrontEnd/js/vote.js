(async function () {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/candidate", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const candidates = await res.json();
    const container = document.getElementById("candidates");

    candidates.forEach(c => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><b>${c.name}</b> (${c.party})</p>
            <button onclick="vote('${c._id}')">Vote</button>
            <hr>
        `;
        container.appendChild(div);
    });
})();

async function vote(candidateId) {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/candidate/vote/${candidateId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.error || "You already voted");
        return;
    }

    alert("Vote submitted successfully");
    window.location.href = "home.html";
}
