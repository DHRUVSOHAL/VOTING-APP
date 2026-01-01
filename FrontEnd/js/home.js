document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    let role = localStorage.getItem("role");

    // 1. Strict Auth Check
    if (!token || !role) {
        console.error("No token or role found");
        window.location.href = "login.html";
        return;
    }

    role = role.trim().toLowerCase(); // Normalize data

    // 2. Element Selection with checks
    const userSection = document.getElementById("user-section");
    const adminSection = document.getElementById("admin-section");

    if (userSection) userSection.style.display = "none";
    if (adminSection) adminSection.style.display = "none";

    // 3. Role-Based UI Logic
    if (role === "admin" && adminSection) {
        adminSection.style.display = "block";
    } else if (role === "voter" && userSection) {
        userSection.style.display = "block";
    } else {
        console.error("Invalid role or missing section:", role);
        // If we get here, the role string didn't match "admin" or "voter"
        // window.location.href = "login.html"; // Uncomment only after debugging
    }

    // 4. Safe Navigation Helper
    const setupClick = (id, path) => {
        const el = document.getElementById(id);
        if (el) {
            el.onclick = () => window.location.href = path;
        }
    };

    setupClick("profileBtn", "profile.html");
    setupClick("changePasswordBtn", "change-password.html");
    setupClick("voteBtn", "vote.html");
    setupClick("addCandidateBtn", "add-candidate.html");
    setupClick("updateCandidateBtn", "update-candidate.html");
    setupClick("deleteCandidateBtn", "delete-candidate.html");
    setupClick("viewVotesBtn", "voters.html");
    // Records button for both Admin & Voter
document.querySelectorAll(".reportBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        window.location.href = "record.html";
    });
});
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.onclick = async () => {
        if (!confirm("⚠️ Are you sure? This will delete all candidates and voters!")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://voting-app-k4tq.onrender.com/user/reset", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Failed to reset data");
                return;
            }

            alert("✅ All voters and candidates deleted successfully.");
            window.location.reload(); // Refresh admin panel
        } catch (err) {
            console.error(err);
            alert("Failed to reset data");
        }
    }
}


    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.clear();
            window.location.href = "login.html";
        };
    }
});