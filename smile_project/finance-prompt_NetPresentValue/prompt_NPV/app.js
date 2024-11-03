function calculateNPV() {
    // Get input values
    let initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    let cashFlow = parseFloat(document.getElementById('cashFlow').value);
    let discountRate = parseFloat(document.getElementById('discountRate').value) / 100; // Convert percentage to decimal
    let years = parseInt(document.getElementById('years').value);

    // Validate input
    if (isNaN(initialInvestment) || isNaN(cashFlow) || isNaN(discountRate) || isNaN(years)) {
        document.getElementById('result').textContent = "Please enter valid numerical values.";
        return;
    }

    // Calculate NPV
    let npv = 0;
    for (let t = 1; t <= years; t++) {
        npv += cashFlow / Math.pow(1 + discountRate, t);
    }
    npv -= initialInvestment;

    // Display the result
    document.getElementById('result').textContent = "NPV: " + npv.toFixed(2) + " dinars";
}
