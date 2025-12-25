// Is function ko sabse upar rakhein jo candidates load karega
(async function loadCandidates() {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch("http://localhost:3000/candidate", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const candidates = await res.json();
        const container = document.getElementById("candidates");
        
        if (!container) return;
        container.innerHTML = ""; // Purana data ya loading text clear karein

        candidates.forEach(c => {
            const div = document.createElement("div");
            div.style.border = "1px solid #ccc";
            div.style.padding = "10px";
            div.style.margin = "10px 0";
            div.style.borderRadius = "5px";

            div.innerHTML = `
                <p><strong>${c.name}</strong> (${c.party})</p>
                <button class="login" onclick="vote('${c._id}')">Vote</button>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Error loading candidates:", err);
    }
})();

// Aapka voting logic (Jo aapne sahi likha hai)
async function vote(candidateId) {
    const token = localStorage.getItem("token");

    const res = await fetch(`https://voting-app-k4tq.onrender.com/candidate/vote/${candidateId}`, {
        method: "PUT", // Match with router.put in candidateRoutes.js
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.error || "Voting failed");
        return;
    }

    alert("Vote submitted successfully");
    window.location.href = "home.html";
}