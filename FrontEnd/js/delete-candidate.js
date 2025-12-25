// Check admin token
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
    alert("Access denied! Admins only.");
    window.location.href = "login.html";
}

// Handle Delete Candidate form
const deleteForm = document.getElementById("deleteCandidateForm");
deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const candidateId = document.getElementById("candidateId").value.trim();

    if (!candidateId) {
        alert("Please enter Candidate ID!");
        return;
    }

    try {
        const res = await fetch(`https://voting-app-k4tq.onrender.com/candidate/${candidateId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Something went wrong!");
            return;
        }

        alert("Candidate deleted successfully!");
        deleteForm.reset();

    } catch (err) {
        console.error(err);
        alert("Error deleting candidate!");
    }
});
