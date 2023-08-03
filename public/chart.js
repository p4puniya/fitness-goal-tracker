// Function to fetch the user's progress data from the server
function fetchProgressData(userId) {
  // Make an API request to retrieve the logged-in user's progress data
  // Use fetch or an AJAX library like Axios
  return fetch(`/api/progress/${userId}`)
    .then(response => response.json())
    .then(data => data.progress);
}
// Function to process and prepare the progress data for charting
function prepareChartData(progressData) {
  // Sort the progress data based on dates (if it's not already sorted)
  progressData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Extract necessary information from the progress data
  const dates = progressData.map(entry => entry.date);
  const weights = progressData.map(entry => entry.weight);

  return {
    labels: dates,
    datasets: [
      {
        label: 'Weight Progress',
        data: weights,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };
}
