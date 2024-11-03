/**
 * Calculate the new price after applying VAT.
 *
 * @param {number} price - The original price of the item.
 * @param {number} vatRate - The VAT rate for the item's category.
 * @returns {string} The new price formatted to two decimal places.
 */
function calculateNewPrice(price, vatRate) {
    return (price + (price * vatRate)).toFixed(2);
}

/**
 * Load game items from the JSON file and display them in the table.
 * This function fetches the data, calculates prices, and updates the DOM.
 */
function loadGamesItems() {
    const tableBody = document.getElementById('games-list');
    let totalVAT = 0; // Initialize total VAT variable

    // Fetch the games items from the JSON file
    fetch('games_store_items.json')
        .then(response => response.json()) // Parse JSON response
        .then(gamesItems => {
            // Iterate through each game item
            gamesItems.forEach(item => {
                const newPrice = calculateNewPrice(item.price, item.vat_rate); // Calculate new price with VAT rate from the item
                const vatAmount = item.price * item.vat_rate; // Calculate VAT for the item
                totalVAT += vatAmount; // Add to total VAT

                // Create a new table row for the item
                const row = `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.category}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>$${newPrice}</td>
                    </tr>
                `;
                tableBody.innerHTML += row; // Append row to the table body
            });

            // Update the total VAT display
            document.getElementById('total-vat').textContent = `Total VAT: $${totalVAT.toFixed(2)}`;
        })
        .catch(error => console.error('Error loading games items:', error)); // Log any errors
}

/**
 * Export the game items and their new prices to a CSV file.
 * This function generates the CSV content and triggers a download.
 */
function exportToCSV() {
    fetch('games_store_items.json')
        .then(response => response.json()) // Parse JSON response
        .then(gamesItems => {
            let csvContent = "data:text/csv;charset=utf-8,Item Name,Category,Price (USD),New Price (After VAT)\n";

            // Iterate through each game item to build CSV content
            gamesItems.forEach(item => {
                const newPrice = calculateNewPrice(item.price, item.vat_rate); // Calculate new price with VAT rate from the item
                csvContent += `${item.name},${item.category},${item.price.toFixed(2)},${newPrice}\n`; // Append row to CSV
            });

            // Create a downloadable link for the CSV content
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'games_store_items.csv');
            document.body.appendChild(link); // Append link to body
            link.click(); // Trigger the download
            document.body.removeChild(link); // Remove the link from the DOM
        })
        .catch(error => console.error('Error exporting to CSV:', error)); // Log any errors
}

// Load games items when the page is loaded
window.onload = loadGamesItems; // Call loadGamesItems function on window load
