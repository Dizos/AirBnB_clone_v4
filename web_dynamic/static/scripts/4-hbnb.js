$(document).ready(function () {
  // Object to store selected amenities
  const selectedAmenities = {};

  // Listen for changes on amenity checkboxes
  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    
    if ($(this).is(':checked')) {
      // Add to selected amenities
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Remove from selected amenities
      delete selectedAmenities[amenityId];
    }
    
    // Update the h4 tag with the list of selected amenities
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    // Truncate if too long
    const displayText = amenitiesList.length > 30 
      ? amenitiesList.substring(0, 30) + '...' 
      : amenitiesList;
    $('.amenities h4').text(displayText || '&nbsp;');
  });

  // Check API status
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    },
    error: function () {
      $('#api_status').removeClass('available');
    }
  });

  // Function to load places
  function loadPlaces(amenityIds = []) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: amenityIds
      }),
      success: function (places) {
        // Clear existing places
        $('.places').empty();
        
        // Loop through each place and create HTML
        places.forEach(function (place) {
          // Create place article
          let placeArticle = $('<article></article>');
          
          // Create place header (title and price)
          let placeHeader = $('<div class="title_box"></div>');
          placeHeader.append('<h2>' + place.name + '</h2>');
          placeHeader.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
          
          // Create information section
          let information = $('<div class="information"></div>');
          information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
          information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
          information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
          
          // Create description
          let description = $('<div class="description"></div>');
          description.html(place.description);
          
          // Assemble the place article
          placeArticle.append(placeHeader);
          placeArticle.append(information);
          placeArticle.append(description);
          
          // Add to places section
          $('.places').append(placeArticle);
        });
      },
      error: function (error) {
        console.error('Error fetching places:', error);
      }
    });
  }

  // Initial load of places without filters
  loadPlaces();

  // Handle search button click
  $('button').click(function () {
    // Get all selected amenity IDs
    const amenityIds = Object.keys(selectedAmenities);
    
    // Reload places with filters
    loadPlaces(amenityIds);
  });
});
