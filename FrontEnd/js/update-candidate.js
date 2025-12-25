// Check admin token
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
    alert("Access denied! Admins only.");
    window.location.href = "login.html";
}

// Handle Update Candidate form
const updateForm = document.getElementById("updateCandidateForm");
updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const candidateId = document.getElementById("candidateId").value.trim(); // string
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const party = document.getElementById("party").value.trim();
    const gender = document.getElementById("gender").value;

    if (!candidateId) {
        alert("Please enter Candidate ID!");
        return;
    }

    // Build the request body dynamically (only fields that have values)
    const updateData = {};
    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (party) updateData.party = party;
    if (gender) updateData.gender = gender;

    try {
        const res = await fetch(`https://voting-app-k4tq.onrender.com/candidate/${candidateId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Something went wrong!");
            return;
        }

        alert("Candidate updated successfully!");
        updateForm.reset();

    } catch (err) {
        console.error(err);
        alert("Error updating candidate!");
    }
});
