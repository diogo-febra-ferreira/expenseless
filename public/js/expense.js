document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("expenses-container");

    try {
        console.log("Loading expenses...");

        // Fetch expenses from backend
        const response = await fetch("/api/expense");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const expenses = await response.json();

        // Clear container
        container.innerHTML = "";

        if (expenses.length === 0) {
            container.innerHTML = "<p>No expenses found.</p>";
            return;
        }

        // Create a list of expenses
        const ul = document.createElement("ul");
        ul.classList.add("expense-list");

        expenses.forEach(exp => {
            const li = document.createElement("li");
            li.classList.add("expense-item");

            li.innerHTML = `
                <strong>$${parseFloat(exp.value).toFixed(2)}</strong><br>
                <small>${new Date(exp.date).toLocaleDateString()}</small><br>
                <p>${exp.description || "No description"}</p>
                <em>Category: ${exp.name}</em>
            `;

            ul.appendChild(li);
        });

        container.appendChild(ul);
    } catch (err) {
        console.error("Error loading expenses:", err);
        container.innerHTML = "<p style='color:red;'>Failed to load expenses.</p>";
    }
});
