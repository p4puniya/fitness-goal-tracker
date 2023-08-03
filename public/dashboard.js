// Function to fetch the logged-in user ID (replace this with your authentication system)
function getUserId() {
    // Example: Assume the user ID is stored in a variable named 'loggedInUserId'
    const loggedInUserId = 'user123';
    return loggedInUserId;
  }
  
  // Function to fetch goals and render them on the dashboard
  function fetchAndRenderGoals(userId) {
    const goalsContainer = document.getElementById('goals-container');
  
    fetch(`/goals?userId=${userId}`)
      .then((response) => response.json())
      .then((goals) => {
        // Clear the existing goals container
        goalsContainer.innerHTML = '';
  
        // Loop through the goals and create elements to display each goal
        goals.forEach((goal) => {
          const goalElement = document.createElement('div');
          goalElement.classList.add('goal'); // Apply appropriate CSS classes
  
          // Build the content of the goal element based on the goal data
          const goalContent = `
            <h3>${goal.type}</h3>
            <p>Weight: ${goal.metrics.weight}</p>
            <p>Reps: ${goal.metrics.reps}</p>
            <p>Distance: ${goal.metrics.distance}</p>
          `;
  
          // Set the content of the goal element
          goalElement.innerHTML = goalContent;
  
          // Append the goal element to the goals container
          goalsContainer.appendChild(goalElement);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Function to handle the progress update form submission
    document.getElementById('progressForm').addEventListener('submit', (event) => {
        event.preventDefault();

        // Retrieve progress data from the form fields
        const goalId = document.getElementById('goalId').value;
        const weight = document.getElementById('progress-weight').value;
        const reps = document.getElementById('progress-reps').value;
        const distance = document.getElementById('progress-distance').value;

        // Send AJAX request to the server-side API endpoint
        fetch('/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goalId, weight, reps, distance }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Update the user's dashboard with the updated progress data
            console.log(data); // You can handle the response data as per your application requirements
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

  // Function to handle form submission and create a new goal
  function handleGoalFormSubmit(event) {
    event.preventDefault();
  
    const goalType = document.getElementById('goal-type').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const distance = parseFloat(document.getElementById('distance').value);
  
    // Create a new goal object with the form data
    const newGoal = {
      type: goalType,
      metrics: {
        weight: isNaN(weight) ? null : weight,
        reps: isNaN(reps) ? null : reps,
        distance: isNaN(distance) ? null : distance,
      },
      userId: loggedInUserId,
    };
  
    // Send a POST request to create the new goal
    fetch('/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    })
      .then((response) => response.json())
      .then((data) => {
        // Successfully created the new goal, fetch and render the updated list of goals
        fetchAndRenderGoals(loggedInUserId);
        // Reset the form fields after successful submission
        document.getElementById('new-goal-form').reset();
      })
      .catch((error) => {
        console.error('Error creating goal:', error);
      });
  }
  
  // Get the logged-in user ID from your authentication system
  const loggedInUserId = getUserId();
  
  // Fetch and render the goals on the dashboard
  fetchAndRenderGoals(loggedInUserId);
  
  // Add an event listener to the form to handle form submission
  const goalForm = document.getElementById('new-goal-form');
  goalForm.addEventListener('submit', handleGoalFormSubmit);
  