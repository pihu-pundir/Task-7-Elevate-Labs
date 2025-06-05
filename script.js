const userContainer = document.getElementById("userContainer");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
    userContainer.innerHTML = "";
    errorMsg.textContent = "";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Something went wrong: " + response.status);
        }

        const users = await response.json();

        users.forEach((user) => {
            const userCard = document.createElement("div");
            userCard.className = "user-card";

            userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

            userContainer.appendChild(userCard);
        });
    } catch (error) {
        errorMsg.textContent = "Failed to load users. Please check your connection.";
        console.error("Fetch error:", error);
    }
}

// Reload users on button click
reloadBtn.addEventListener("click", fetchUsers);

// Fetch users initially on page load
fetchUsers();
