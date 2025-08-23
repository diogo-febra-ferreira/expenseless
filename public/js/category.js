document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("categories-container");

    try {
        console.log("Loading categories...");

        // Fetch categories from backend
        const response = await fetch("/api/category");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const categories = await response.json();

        // Clear container
        container.innerHTML = "";

        if (categories.length === 0) {
            container.innerHTML = "<p>No categories found.</p>";
            return;
        }

        // Create a list of categories
        const ul = document.createElement("ul");
        ul.classList.add("category-list");

        categories.forEach(cat => {
            const li = document.createElement("li");
            li.classList.add("category-item");

            li.innerHTML = `
                <strong>${cat.name}</strong>
                ${cat.description ? `<p>${cat.description}</p>` : ""}
            `;

            ul.appendChild(li);
        });

        container.appendChild(ul);
    } catch (err) {
        console.error("Error loading categories:", err);
        container.innerHTML = "<p style='color:red;'>Failed to load categories.</p>";
    }
});
