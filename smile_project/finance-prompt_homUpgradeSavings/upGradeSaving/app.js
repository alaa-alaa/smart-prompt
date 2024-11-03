function calculateIncome() {
    // Get input values
    let savingsGoal = parseFloat(document.getElementById('savingsGoal').value);
    let startingBalance = parseFloat(document.getElementById('startingBalance').value);
    let timeFrame = parseInt(document.getElementById('timeFrame').value);
    let growthRate = parseFloat(document.getElementById('growthRate').value) / 100; // Convert to decimal

    // Validate inputs
    if (isNaN(savingsGoal) || savingsGoal < 2500) {
        alert("Savings goal must be at least $2,500.");
        return;
    }

    if (isNaN(startingBalance) || startingBalance < savingsGoal * 0.15) {
        alert("Starting balance must be at least 15% of the savings goal.");
        return;
    }

    if (isNaN(timeFrame) || timeFrame <= 0) {
        alert("Please enter a valid time frame.");
        return;
    }

    if (isNaN(growthRate) || growthRate < 0.02 || growthRate > 0.12) {
        alert("Growth rate must be between 2% and 12%.");
        return;
    }

    // Calculate the remaining amount needed
    let remainingAmount = savingsGoal - startingBalance;

    // Calculate the required monthly freelance income with growth rate
    let monthlyIncome = 0;
    for (let i = 0; i < timeFrame; i++) {
        monthlyIncome += remainingAmount / timeFrame / Math.pow(1 + growthRate, i);
    }

    // Display result
    document.getElementById('result').textContent = `You need to earn approximately $${monthlyIncome.toFixed(2)} per month.`;
}
