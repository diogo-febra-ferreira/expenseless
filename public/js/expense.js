document.addEventListener("DOMContentLoaded", async () => {
    const monthlyTableBody = document.querySelector("#expenses-table tbody");
    const allExpensesTableBody = document.querySelector("#all-expenses-table tbody");

    try {
        console.log("Loading expenses...");

        // Fetch expenses from backend
        const response = await fetch("/api/expense");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const expenses = await response.json();

        // Clear tables
        monthlyTableBody.innerHTML = "";
        allExpensesTableBody.innerHTML = "";

        if (expenses.length === 0) {
            monthlyTableBody.innerHTML = `<tr><td colspan="3">No expenses found.</td></tr>`;
            allExpensesTableBody.innerHTML = `<tr><td colspan="4">No expenses found.</td></tr>`;
            return;
        }

        // ---- MONTHLY SUMMARY ----
        const monthlyData = {};

        expenses.forEach(exp => {
            const date = new Date(exp.date);
            const year = date.getFullYear();
            const month = date.getMonth(); // 0–11
            const key = `${year}-${month}`;

            if (!monthlyData[key]) {
                monthlyData[key] = { year, month, total: 0 };
            }
            monthlyData[key].total += parseFloat(exp.value) || 0;
        });

        Object.values(monthlyData).forEach(entry => {
            const { year, month, total } = entry;

            // Days in month
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const avgDaily = total / daysInMonth;

            // Format month name
            const monthName = new Date(year, month).toLocaleString("default", {
                month: "long",
                year: "numeric",
            });

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${monthName}</td>
                <td>€${total.toFixed(2)}</td>
                <td>€${avgDaily.toFixed(2)}</td>
            `;
            monthlyTableBody.appendChild(row);
        });

        // ---- ALL EXPENSES (detailed list) ----
        // Sort by date (newest first)
        expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

        expenses.forEach(exp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${new Date(exp.date).toLocaleDateString()}</td>
                <td>${exp.description || "No description"}</td>
                <td>${exp.name}</td>
                <td>€${parseFloat(exp.value).toFixed(2)}</td>
            `;
            allExpensesTableBody.appendChild(row);
        });

    } catch (err) {
        console.error("Error loading expenses:", err);
        monthlyTableBody.innerHTML = `<tr><td colspan="3" style="color:red;">Failed to load summary.</td></tr>`;
        allExpensesTableBody.innerHTML = `<tr><td colspan="4" style="color:red;">Failed to load expenses.</td></tr>`;
    }
});
