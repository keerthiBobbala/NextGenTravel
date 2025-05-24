document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-image');
    const totalSlides = slides.length;
    const slideWidth = slides[0].clientWidth;
    const carouselSlide = document.querySelector('.carousel-slide');

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        carouselSlide.style.transform = `translateX(${-currentSlide * slideWidth}px)`;

        // When reaching the last slide, quickly reset to first slide without animation
        if (currentSlide === totalSlides - 1) {
            setTimeout(() => {
                carouselSlide.style.transition = 'none';
                currentSlide = 0;
                carouselSlide.style.transform = `translateX(0)`;
                // Re-enable transition after reset
                setTimeout(() => {
                    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500); // Wait for transition to complete
        }
    }

    // Automatically change slides every 5 seconds
    setInterval(nextSlide, 2000);

    // Both buttons now trigger nextSlide
    document.querySelector('.prev').addEventListener('click', nextSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);


    // Get the modal
    var modal = document.getElementById("bookingModal");

    // Get the button that opens the modal
    var btn = document.querySelector(".btn-container .btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});
