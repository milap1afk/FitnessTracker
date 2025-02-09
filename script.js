// ======================== Workout Logging ========================
function logWorkout() {
    let steps = Math.floor(Math.random() * 10000); // Generate random steps
    let calories = Math.floor(steps * 0.04); // Estimate calories burned

    document.getElementById("workout-data").innerText = 
        `Today's Workout: ${steps} steps, ${calories} calories burned`;

    updateChart(steps, calories);
}

// ======================== Nutritionix API Call ========================
async function getMealPlan() {
    let food = document.getElementById("mealInput").value.trim();
    if (!food) {
        alert("Enter a food item!");
        return;
    }

    const API_ID = "262280e9";  // Replace with your actual Nutritionix App ID
    const API_KEY = "812a13a78e738e0fad1a85293be6d422";  

    let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": API_ID,
                "x-app-key": API_KEY
            },
            body: JSON.stringify({ query: food })
        });

        let data = await response.json();

        if (data.foods && data.foods.length > 0) {
            let item = data.foods[0];

            document.getElementById("meal-data").innerText = 
                `Food: ${item.food_name}, Calories: ${item.nf_calories}, Protein: ${item.nf_protein_g}g`;
        } else {
            document.getElementById("meal-data").innerText = "No nutrition data found.";
        }
    } catch (error) {
        console.log("Error fetching meal data:", error);
        document.getElementById("meal-data").innerText = "Error fetching data.";
    }
}

// ======================== Workout Progress Chart ========================
let ctx = document.getElementById('workoutChart').getContext('2d');

let workoutChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Steps Taken',
            data: [],
            backgroundColor: 'blue'
        }]
    },
    options: {
        responsive: true
    }
});

function updateChart(steps, calories) {
    workoutChart.data.labels.push(`Workout ${workoutChart.data.labels.length + 1}`);
    workoutChart.data.datasets[0].data.push(steps);
    workoutChart.update();
}
