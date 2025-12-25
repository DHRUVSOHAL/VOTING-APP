const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
    alert("Access denied! Admins only.");
    window.location.href = "login.html";
}

const addForm = document.getElementById("addCandidateForm");
addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const party = document.getElementById("party").value.trim();
    const gender = document.getElementById("gender").value;

    if (!name || !age || !party || !gender) {
        alert("Please fill all fields!");
        return;
    }

    // Generate candidateId (simple example)
    const candidateId = `CAND-${Date.now()}`;

    try {
        const res = await fetch("https://voting-app-k4tq.onrender.com/candidate/addCandidate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, age, candidateId, party, gender })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Something went wrong!");
            return;
        }

        alert("Candidate added successfully!");
        addForm.reset();

    } catch (err) {
        console.error(err);
        alert("Error adding candidate!");
    }
});
