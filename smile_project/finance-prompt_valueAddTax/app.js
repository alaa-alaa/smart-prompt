
function calculateNewPrice(price, vatRate) {
    return (price + price * vatRate).toFixed(2);
}

function loadStoreItems() {
    const tableBody = document.getElementById("games-list");
    let totalVAT = 0;

    fetch("games_store_items.json")
        .then((response) => response.json())
        .then((gamesItems) => {
            gamesItems.forEach((item) => {
                const newPrice = calculateNewPrice(item.price, item.vat_rate);
                const vatAmount = item.price * item.vat_rate;
                totalVAT += vatAmount;
                const row = `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.category}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>$${newPrice}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
            document.getElementById(
                "total-vat"
            ).textContent = `Total VAT: $${totalVAT.toFixed(2)}`;
        })
        .catch((error) => console.error("Error loading games items:", error));
}

function exportToCSV() {
    fetch("games_store_items.json")
        .then((response) => response.json())
        .then((gamesItems) => {
            let csvContent =
                "data:text/csv;charset=utf-8,Item Name,Category,Price (USD),New Price (After VAT)\n";
            gamesItems.forEach((item) => {
                const newPrice = calculateNewPrice(item.price, item.vat_rate);
                csvContent += `${item.name},${item.category},${item.price.toFixed(
                    2
                )},${newPrice}\n`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "games_store_items.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => console.error("Error exporting to CSV:", error));
}

window.onload = loadStoreItems;
