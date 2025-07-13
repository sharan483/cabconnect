document.addEventListener('DOMContentLoaded', () => {
    // --- Booking Page Specific Logic ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const pickupLocationInput = document.getElementById('pickupLocation');
        const dropoffLocationInput = document.getElementById('dropoffLocation');
        const cabTypeSelect = document.getElementById('cabType');
        const bookingDateInput = document.getElementById('bookingDate');
        const bookingTimeInput = document.getElementById('bookingTime');

        const estimatedDistanceSpan = document.getElementById('estimatedDistance');
        const estimatedTimeSpan = document.getElementById('estimatedTime');
        const estimatedFareSpan = document.getElementById('estimatedFare');
        const availableCabsList = document.getElementById('availableCabsList');
        const bookingSuccessMessage = document.getElementById('bookingSuccessMessage');
        const fareEstimationContainer = document.querySelector('.fare-estimation'); // Select the container
        const availableCabsContainer = document.querySelector('.available-cabs-section'); // Select the container
        const cabFilterSelect = document.getElementById('cabFilter'); // Get the filter select element


        // Simulated location data for suggestions
        const locations = [
            "MG Road, Bengaluru", "Indiranagar, Bengaluru", "Koramangala, Bengaluru",
            "Electronic City, Bengaluru", "Bengaluru Airport (BLR)", "Shivaji Nagar, Bengaluru",
            "Jayanagar, Bengaluru", "Whitefield, Bengaluru", "Manyata Tech Park, Bengaluru"
        ];

        // Function to filter and display suggestions
        const showSuggestions = (inputElement, suggestionsContainer) => {
            const inputValue = inputElement.value.toLowerCase();
            suggestionsContainer.innerHTML = ''; // Clear previous suggestions

            if (inputValue.length < 2) {
                return;
            }

            const filteredLocations = locations.filter(location =>
                location.toLowerCase().includes(inputValue)
            );

            filteredLocations.forEach(location => {
                const suggestionItem = document.createElement('a');
                suggestionItem.href = '#';
                suggestionItem.classList.add('list-group-item', 'list-group-item-action');
                suggestionItem.textContent = location;
                suggestionItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    inputElement.value = location;
                    suggestionsContainer.innerHTML = ''; // Hide suggestions after selection
                    updateFareAndAvailability(); // Update on location change
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        };

        // Event listeners for location inputs for suggestions
        pickupLocationInput.addEventListener('input', () => {
            showSuggestions(pickupLocationInput, document.getElementById('pickupSuggestions'));
        });
        dropoffLocationInput.addEventListener('input', () => {
            showSuggestions(dropoffLocationInput, document.getElementById('dropoffSuggestions'));
        });

        // Hide suggestions when input loses focus
        pickupLocationInput.addEventListener('blur', () => {
            setTimeout(() => document.getElementById('pickupSuggestions').innerHTML = '', 200);
        });
        dropoffLocationInput.addEventListener('blur', () => {
            setTimeout(() => document.getElementById('dropoffSuggestions').innerHTML = '', 200);
        });

        // Function to show loading state
        const showLoading = (element) => {
            element.innerHTML = `
                <div class="loading-spinner-container">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `;
        };

        // Function to simulate real-time fare estimation and availability
        const updateFareAndAvailability = () => {
            const pickup = pickupLocationInput.value;
            const dropoff = dropoffLocationInput.value;
            const cabType = cabTypeSelect.value; // This is for fare estimation logic

            if (pickup && dropoff && cabType) {
                // Show loading for both sections
                fareEstimationContainer.innerHTML = `
                    <h4 class="mb-3"><i class="fas fa-calculator me-2"></i>Real-time Fare Estimation</h4>
                    <div class="loading-spinner-container">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading fare...</span>
                        </div>
                    </div>
                `;
                availableCabsList.innerHTML = `
                    <div class="loading-spinner-container">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading cabs...</span>
                        </div>
                    </div>
                `;

                setTimeout(() => { // Simulate network delay
                    // Simulate distance and time based on some arbitrary logic
                    const distance = (Math.random() * 20 + 5).toFixed(1); // 5 to 25 km
                    const time = (Math.random() * 30 + 10).toFixed(0); // 10 to 40 min

                    let baseFare = 50; // Base fare
                    let farePerKm = 10;
                    let fareMultiplier = 1;

                    if (cabType === 'premium') {
                        farePerKm = 15;
                        fareMultiplier = 1.2;
                    } else if (cabType === 'lux') {
                        farePerKm = 25;
                        fareMultiplier = 1.5;
                    }

                    const estimatedFare = (baseFare + (distance * farePerKm)) * fareMultiplier;

                    // Update fare estimation display
                    fareEstimationContainer.innerHTML = `
                        <h4 class="mb-3"><i class="fas fa-calculator me-2"></i>Real-time Fare Estimation</h4>
                        <p><strong>Distance:</strong> <span id="estimatedDistance">${distance}</span> km</p>
                        <p><strong>Estimated Time:</strong> <span id="estimatedTime">${time}</span> min</p>
                        <hr>
                        <p class="h5">Estimated Fare:</p>
                        <p class="display-4"><span id="estimatedFare">${estimatedFare.toFixed(2)}</span> INR</p>
                    `;

                    // Simulated available cabs data
                    const cabs = [
                        { id: 'CAB001', type: 'economy', model: 'Maruti Dzire', driver: 'Rahul Singh', rating: 4.8, license: 'KA01AB1234', eta: '5 min' },
                        { id: 'CAB002', type: 'premium', model: 'Toyota Innova', driver: 'Priya Sharma', rating: 4.9, license: 'KA02CD5678', eta: '8 min' },
                        { id: 'CAB003', type: 'economy', model: 'Hyundai Aura', driver: 'Amit Kumar', rating: 4.5, license: 'KA03EF9012', eta: '7 min' },
                        { id: 'CAB004', type: 'lux', model: 'Mercedes C-Class', driver: 'Sandeep Reddy', rating: 5.0, license: 'KA04GH3456', eta: '12 min' },
                        { id: 'CAB005', type: 'premium', model: 'Mahindra XUV500', driver: 'Neha Gupta', rating: 4.7, license: 'KA05IJ7890', eta: '6 min' },
                        { id: 'CAB006', type: 'economy', model: 'Suzuki Swift', driver: 'Vikram Rao', rating: 4.6, license: 'KA06KL2345', eta: '9 min' },
                    ];

                    const currentFilter = cabFilterSelect.value; // Get the selected filter from the new dropdown
                    const filteredCabs = cabs.filter(cab => currentFilter === 'all' || cab.type === currentFilter);

                    availableCabsList.innerHTML = ''; // Clear previous cabs
                    if (filteredCabs.length > 0) {
                        filteredCabs.forEach(cab => {
                            const cabCard = `
                                <div class="cab-card mb-3 p-3 border rounded shadow-sm">
                                    <h5 class="text-primary">${cab.model} <small class="text-muted">(${cab.id})</small></h5>
                                    <p class="mb-1"><i class="fas fa-user-circle me-2"></i>Driver: <strong>${cab.driver}</strong></p>
                                    <p class="mb-1"><i class="fas fa-star me-2 text-warning"></i>Rating: ${cab.rating} <small class="text-muted">(Avg)</small></p>
                                    <p class="mb-1"><i class="fas fa-car me-2"></i>License Plate: ${cab.license}</p>
                                    <p class="mb-2"><i class="fas fa-clock me-2"></i>Estimated Arrival: <strong class="text-success">${cab.eta}</strong></p>
                                    <button class="btn btn-sm btn-outline-primary w-100 mt-2 book-this-cab-btn" data-cab-id="${cab.id}">Book This Cab</button>
                                </div>
                            `;
                            availableCabsList.innerHTML += cabCard;
                        });
                        // Add event listeners to the new "Book This Cab" buttons
                        availableCabsList.querySelectorAll('.book-this-cab-btn').forEach(button => {
                            button.addEventListener('click', (e) => {
                                alert(`Simulating booking for Cab ID: ${e.target.dataset.cabId}`);
                                // Here you would add logic to pre-fill the form or directly submit
                                // For this project, we'll just show an alert.
                            });
                        });
                    } else {
                        availableCabsList.innerHTML = `<p class="text-muted text-center py-3">No ${currentFilter !== 'all' ? currentFilter : ''} cabs available at the moment. Try another type or location.</p>`;
                    }
                }, 800); // 0.8 second delay for simulation

            } else {
                // Reset to initial state if inputs are not filled
                fareEstimationContainer.innerHTML = `
                    <h4 class="mb-3"><i class="fas fa-calculator me-2"></i>Real-time Fare Estimation</h4>
                    <p><strong>Distance:</strong> <span id="estimatedDistance">0</span> km</p>
                    <p><strong>Estimated Time:</strong> <span id="estimatedTime">0</span> min</p>
                    <hr>
                    <p class="h5">Estimated Fare:</p>
                    <p class="display-4"><span id="estimatedFare">0.00</span> INR</p>
                `;
                availableCabsList.innerHTML = `<p class="text-muted text-center py-3">Enter pickup, drop-off, and cab type to see fare and availability.</p>`;
            }
        };

        // Event listeners for form fields to trigger real-time updates
        pickupLocationInput.addEventListener('input', updateFareAndAvailability);
        dropoffLocationInput.addEventListener('input', updateFareAndAvailability);
        cabTypeSelect.addEventListener('change', updateFareAndAvailability);
        bookingDateInput.addEventListener('change', updateFareAndAvailability);
        bookingTimeInput.addEventListener('change', updateFareAndAvailability);
        cabFilterSelect.addEventListener('change', updateFareAndAvailability); // Event listener for cab filter


        // Form Validation and Submission
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            bookingSuccessMessage.classList.add('d-none'); // Hide previous messages

            if (!bookingForm.checkValidity()) {
                event.stopPropagation(); // Stop propagation if form is invalid
                bookingForm.classList.add('was-validated'); // Add Bootstrap's validation styles
            } else {
                // If form is valid, simulate booking success
                console.log('Booking submitted:', {
                    pickup: pickupLocationInput.value,
                    dropoff: dropoffLocationInput.value,
                    cabType: cabTypeSelect.value,
                    date: bookingDateInput.value,
                    time: bookingTimeInput.value,
                    fare: estimatedFareSpan.textContent
                });

                // Display success message
                bookingSuccessMessage.classList.remove('d-none');

                // Reset form after a short delay
                setTimeout(() => {
                    bookingForm.reset();
                    bookingForm.classList.remove('was-validated'); // Remove validation styles
                    // Re-initialize the content for fare and availability to their default states
                    fareEstimationContainer.innerHTML = `
                        <h4 class="mb-3"><i class="fas fa-calculator me-2"></i>Real-time Fare Estimation</h4>
                        <p><strong>Distance:</strong> <span id="estimatedDistance">0</span> km</p>
                        <p><strong>Estimated Time:</strong> <span id="estimatedTime">0</span> min</p>
                        <hr>
                        <p class="h5">Estimated Fare:</p>
                        <p class="display-4"><span id="estimatedFare">0.00</span> INR</p>
                    `;
                    availableCabsList.innerHTML = `<p class="text-muted text-center py-3">Enter pickup, drop-off, and cab type to see fare and availability.</p>`;
                    bookingSuccessMessage.classList.add('d-none'); // Hide success message again
                }, 3000); // Hide after 3 seconds
            }
        });

        // Initial call to populate fare and availability (if fields are pre-filled)
        // Ensure this is called AFTER the cabFilterSelect is initialized
        updateFareAndAvailability();
    }

    // --- General JS for all pages (if any) ---
    // Example: Smooth scrolling for anchor links (if you add them later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});