// Check if user is logged in
const token = localStorage.getItem("token"); // replace "token" with your actual token key
if (!token) {
    window.location.href = "login.html";
}

// Navigation
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
