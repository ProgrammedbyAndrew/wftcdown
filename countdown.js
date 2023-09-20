const startDate = new Date(2023, 8, 6, 12, 0, 0);
const endDate = new Date(2023, 8, 29, 20, 0, 0);
const startingCount = 9970000;
const totalCustomers = 10000000 - startingCount;

let currentCustomerCount = startingCount;

function isCountingTime(now) {
    const dayOfWeek = now.getDay();
    const hour = now.getHours();

    // Weekdays
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        return hour >= 12 && hour < 24;
    }
    // Weekends
    else {
        return hour >= 12 || hour < 2;
    }
}

function getTotalActiveSeconds() {
    let activeSeconds = 0;
    for (let i = 0; i < (endDate - startDate) / 1000; i++) { // loop by second
        const tempDate = new Date(startDate.getTime() + i * 1000);
        if (isCountingTime(tempDate)) {
            activeSeconds++;
        }
    }
    return activeSeconds;
}

const exactRate = totalCustomers / getTotalActiveSeconds(); // customers per second

function calculateCurrentCount() {
    const now = new Date();
    let elapsedSeconds = (now - startDate) / 1000;

    for (let i = 0; i < elapsedSeconds; i++) {
        const tempDate = new Date(startDate.getTime() + i * 1000);
        if (isCountingTime(tempDate)) {
            currentCustomerCount += exactRate;
        }
    }

    if (currentCustomerCount > 10000000) {
        currentCustomerCount = 10000000;
    }

    return Math.floor(currentCustomerCount);
}

// Initial update
document.getElementById('customerCount').textContent = calculateCurrentCount();

// Update every second
setInterval(() => {
    const now = new Date();
    if (isCountingTime(now)) {
        currentCustomerCount += exactRate;
        document.getElementById('customerCount').textContent = Math.floor(currentCustomerCount);
    }
}, 1000);

// Simulation (optional, for verification purposes)
function simulateToEnd() {
    let simulationCount = startingCount;
    for (let i = 0; i < (endDate - startDate) / 1000; i++) {
        const tempDate = new Date(startDate.getTime() + i * 1000);
        if (isCountingTime(tempDate)) {
            simulationCount += exactRate;
        }
    }
    return simulationCount;
}

console.log("Simulation result:", simulateToEnd());
