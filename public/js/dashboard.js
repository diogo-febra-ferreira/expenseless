document.addEventListener("DOMContentLoaded", async () => {

    const backupBtn = document.getElementById("backupBtn");
    const alertContainer = document.getElementById("alert-container");

    backupBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("/api/dashboard/backup-db", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });

            const result = await response.json();

            if (result.success) {
                showAlert("success", result.message);
            } else {
                showAlert("danger", result.message || "Backup failed");
            }
        } catch (err) {
            console.error("Backup request failed:", err);
            showAlert("danger", "An error occurred while backing up the database.");
        }
    });

    function showAlert(type, message) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
});
