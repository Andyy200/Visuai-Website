// Function to handle success in getting the location
const successCallback = (position) => {
    console.log('User\'s Position:', position);

    // Extract latitude and longitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // You can now send this location to your server or use it in your app
    handleUserLocation(latitude, longitude);
};

// Function to handle errors in getting the location
const errorCallback = (error) => {
    console.log('Error:', error);
    // Handle error appropriately, maybe provide feedback to the user
};

// Options for geolocation
const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
};

// Function to get the current position of the user
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

function handleUserLocation(latitude, longitude) {
    fetch('/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: latitude, longitude: longitude }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Location processed by server:', data);
        // You can trigger a specific function or response in Vision here
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Example: Fetch location when user says "Hey Vision, where am I?"
if (command.includes('where am I')) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
}
