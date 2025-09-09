document.addEventListener("DOMContentLoaded", async () => {
    const monthlyTableBody = document.querySelector("#expenses-table tbody");
    const allExpensesTableBody = document.querySelector("#all-expenses-table tbody");
    const categoryTableHead = document.querySelector("#category-expenses-table thead");
    const categoryTableBody = document.querySelector("#category-expenses-table tbody");

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
        categoryTableHead.innerHTML = "";
        categoryTableBody.innerHTML = "";

        if (expenses.length === 0) {
            monthlyTableBody.innerHTML = `<tr><td colspan="3">No expenses found.</td></tr>`;
            allExpensesTableBody.innerHTML = `<tr><td colspan="4">No expenses found.</td></tr>`;
            categoryTableBody.innerHTML = `<tr><td colspan="99">No expenses found.</td></tr>`;
            return;
        }

        // ---- MONTHLY SUMMARY ----
        const monthlyData = {};

        expenses.forEach(exp => {
            const date = new Date(exp.date);
            const year = date.getFullYear();
            const month = date.getMonth();
            const key = `${year}-${month}`;

            if (!monthlyData[key]) {
                monthlyData[key] = { year, month, total: 0 };
            }
            monthlyData[key].total += parseFloat(exp.value) || 0;
        });

        // Sort months chronologically
        const sortedMonths = Object.values(monthlyData).sort((a, b) =>
            a.year === b.year ? a.month - b.month : a.year - b.year
        );

        sortedMonths.forEach(entry => {
            const { year, month, total } = entry;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const avgDaily = total / daysInMonth;

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

        // ---- CATEGORY PER MONTH (pivot) ----
        const categoryData = {};
        const categories = new Set();

        expenses.forEach(exp => {
            const date = new Date(exp.date);
            const year = date.getFullYear();
            const month = date.getMonth();
            const key = `${year}-${month}`;
            const cat = exp.name || "Uncategorized";

            categories.add(cat);

            if (!categoryData[key]) {
                categoryData[key] = { year, month, categories: {} };
            }
            if (!categoryData[key].categories[cat]) {
                categoryData[key].categories[cat] = 0;
            }
            categoryData[key].categories[cat] += parseFloat(exp.value) || 0;
        });

        const sortedCategoryMonths = Object.values(categoryData).sort((a, b) =>
            a.year === b.year ? a.month - b.month : a.year - b.year
        );

        // Build header
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `<th>Month</th>`;
        [...categories].sort().forEach(cat => {
            headerRow.innerHTML += `<th>${cat}</th>`;
        });
        categoryTableHead.appendChild(headerRow);

        // Build rows
        sortedCategoryMonths.forEach(entry => {
            const { year, month, categories: catTotals } = entry;
            const monthName = new Date(year, month).toLocaleString("default", {
                month: "long",
                year: "numeric",
            });

            const row = document.createElement("tr");
            let rowHTML = `<td>${monthName}</td>`;

            [...categories].sort().forEach(cat => {
                const value = catTotals[cat] || 0;
                rowHTML += `<td>€${value.toFixed(2)}</td>`;
            });

            row.innerHTML = rowHTML;
            categoryTableBody.appendChild(row);
        });

        // ---- ALL EXPENSES (detailed list) ----
        expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

        expenses.forEach(exp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${new Date(exp.date).toLocaleDateString()}</td>
                <td>${exp.description || "No description"}</td>
                <td>${exp.name || "Uncategorized"}</td>
                <td>€${parseFloat(exp.value).toFixed(2)}</td>
            `;
            allExpensesTableBody.appendChild(row);
        });

    } catch (err) {
        console.error("Error loading expenses:", err);
        monthlyTableBody.innerHTML = `<tr><td colspan="3" style="color:red;">Failed to load summary.</td></tr>`;
        categoryTableBody.innerHTML = `<tr><td colspan="99" style="color:red;">Failed to load category data.</td></tr>`;
        allExpensesTableBody.innerHTML = `<tr><td colspan="4" style="color:red;">Failed to load expenses.</td></tr>`;
    }
});
