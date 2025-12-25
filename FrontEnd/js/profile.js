(async function () {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/user/profile", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const user = await res.json();

    document.getElementById("name").innerText = user.name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("age").innerText = user.age;
    document.getElementById("gender").innerText = user.gender;
    document.getElementById("role").innerText = user.role;
    document.getElementById("aadhar").innerText = "****" + user.aadharCardNumber.toString().slice(-4);
})();
