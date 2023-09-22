document.addEventListener("DOMContentLoaded", function() {
    var specificSection = document.getElementById('specific-section');
    if (specificSection) {
      const carousel = $('.banner-slider');
      const carouselItems = $('.slider-item');
      const logoImage = $('#logo');
  
      // Initialize the carousel
      carousel.owlCarousel();
  
      // Listen for the carousel slide event
      carousel.on('changed.owl.carousel', function(event) {
        // Get the active carousel item
        const activeItem = event.item.index;
  
        // Get the logo path from the data attribute of the active item
        const logoPath = carouselItems.eq(activeItem).data('logo');
  
        // Update the logo image source
        logoImage.attr('src', logoPath);
      });
  
      // Refresh the carousel after each slide change
      carousel.on('refreshed.owl.carousel', function(event) {
        carousel.trigger('to.owl.carousel', [0]); // Reset the carousel to the first item
        carousel.trigger('stop.owl.autoplay'); // Stop the autoplay
        carousel.trigger('play.owl.autoplay', [5000]); // Start the autoplay after 5 seconds
      });
  
      // Start the autoplay on page load
      carousel.trigger('play.owl.autoplay', [5000]);
    }
  });
  