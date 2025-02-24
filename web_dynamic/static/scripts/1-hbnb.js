$(document).ready(function () {
  const amenityDict = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      amenityDict[amenityId] = amenityName;
    } else {
      delete amenityDict[amenityId];
    }

    // Update the h4 tag with checked amenities
    const amenitiesList = Object.values(amenityDict);
    if (amenitiesList.length > 0) {
      $('.amenities h4').text(amenitiesList.join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
