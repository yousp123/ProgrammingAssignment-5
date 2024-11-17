// Import car data from an external file
const carData = usedCars; // use the data from `usedCars.js`

// Wait until the DOM is fully loaded before displaying cars
document.addEventListener("DOMContentLoaded", () => {
    displayCars(carData); // Display all cars on initial load
});

// Function to render car data into the HTML
function displayCars(cars) {
    const container = document.getElementById("carsContainer");
    const carCount = document.getElementById("carCount");

    // Clear previous entries and update car count
    container.innerHTML = ""; 
    carCount.textContent = cars.length;

    // Iterate through each car and create a card
    cars.forEach(car => {
        const carCard = document.createElement("div");
        carCard.className = "car-card";

        // Populate card with car details
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image">
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>Mileage: ${car.mileage} miles</p>
            <p>Price: $${car.price}</p>
            <p>Color: ${car.color}</p>
            <p>Gas Mileage: ${car.gasMileage}</p>
            <button onclick="purchaseVehicle('${car.make}', '${car.model}', ${car.price})" class="purchase-button">Purchase</button>
        `;

        container.appendChild(carCard);
    });

    // Show message if no cars match criteria
    document.getElementById("noResults").style.display = cars.length ? "none" : "block";
}

// Function to apply filters based on form inputs
function applyFilters() {
    // Get filter criteria from form fields
    const minYear = parseInt(document.getElementById("minYear").value) || 0;
    const maxYear = parseInt(document.getElementById("maxYear").value) || 9999;
    const selectedMakes = Array.from(document.getElementById("make").selectedOptions).map(opt => opt.value);
    const maxMileage = parseInt(document.getElementById("maxMileage").value) || Infinity;
    const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseInt(document.getElementById("maxPrice").value) || Infinity;
    const selectedColors = Array.from(document.getElementById("color").selectedOptions).map(opt => opt.value);

    // Filter cars based on criteria
    const filteredCars = carData.filter(car => 
        car.year >= minYear &&
        car.year <= maxYear &&
        (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
        car.mileage <= maxMileage &&
        car.price >= minPrice &&
        car.price <= maxPrice &&
        (selectedColors.length === 0 || selectedColors.includes(car.color))
    );

    displayCars(filteredCars); // Display filtered cars
}

// Function to reset filters to default and show all cars
function resetFilters() {
    document.getElementById("filterForm").reset(); // Reset form fields
    displayCars(carData); // Show all cars
}

// Function to handle purchase button click, displaying a purchase message
function purchaseVehicle(make, model, price) {
    alert(`Thank you for your purchase! You have bought a ${make} ${model} for $${price}.`);
}
