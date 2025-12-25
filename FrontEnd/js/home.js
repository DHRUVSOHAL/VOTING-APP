// AUTH CHECK
const token = localStorage.getItem("token");
const role = localStorage.getItem("role"); // "admin" or "voter"

if (!token || !role) {
    window.location.href = "login.html";
}

// Sections
const userSection = document.getElementById("user-section");
const adminSection = document.getElementById("admin-section");

// Hide both first
userSection.style.display = "none";
adminSection.style.display = "none";

// ROLE-BASED UI
if (role === "admin") {
    adminSection.style.display = "block";
} else if (role === "voter") {
    userSection.style.display = "block";
} else {
    // Safety fallback
    window.location.href = "login.html";
}

// NAVIGATION
document.getElementById("profileBtn").onclick = () => {
    window.location.href = "profile.html";
};

document.getElementById("changePasswordBtn").onclick = () => {
    window.location.href = "change-password.html";
};

document.getElementById("voteBtn").onclick = () => {
    window.location.href = "vote.html";
};

document.getElementById("reportBtn").onclick = () => {
    window.location.href = "record.html";
};

document.getElementById("addCandidateBtn").onclick = () => {
    window.location.href = "add-candidate.html";
};

document.getElementById("updateCandidateBtn").onclick = () => {
    window.location.href = "update-candidate.html";
};

document.getElementById("deleteCandidateBtn").onclick = () => {
    window.location.href = "delete-candidate.html";
};

document.getElementById("logoutBtn").onclick = () => {
    localStorage.clear();
    window.location.href = "login.html";
};
