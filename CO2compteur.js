const totalCO2Saved = 1.47;

function updateCO2Counter(co2Value) {
    const counter = document.getElementById("co2-counter");
    counter.textContent = co2Value.toFixed(3);
}

updateCO2Counter(totalCO2Saved);
