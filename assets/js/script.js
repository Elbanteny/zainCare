$(document).ready(function () {
    $('.feedback-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 1,
        autoplay: true,
        navText: ["<i class = 'fas fa-arrow-left'></i>", "<i class = 'fas fa-arrow-right'></i>"]
    });

    // stop animation on resize
    let resizeTimer;
    $(window).resize(function () {
        $(document.body).addClass('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            $(document.body).removeClass('resize-animation-stopper');
        }, 400);
    });

    $('.navbar-show-btn').click(function () {
        $('.navbar-box').addClass('navbar-box-show');
    });

    $('.navbar-hide-btn').click(function () {
        $('.navbar-box').removeClass("navbar-box-show");
    })

    $.getJSON('assets/json/images.json', function (data) {  // Ganti 'data.json' dengan path file JSON Anda
        const imageContainer = $('.image-container');
        imageContainer.empty(); // Kosongkan container terlebih dahulu

        $.each(data, function (index, image) {
            const imageElement = $('<img>').attr({
                src: image.src,
                alt: image.alt,
            });

            const divElement = $('<div>').addClass('image').append(imageElement);
            imageContainer.append(divElement);

            imageElement.click(function () {
                const popupOverlay = $('<div>').addClass('popup-overlay');
                const popupContainer = $('<div>').addClass('popup-container');
                const popupClose = $('<span>').addClass('popup-close').html('&times;'); // Tanda "x"
                const popupImage = $('<img>').attr('src', image.src).attr('alt', image.alt);;

                popupContainer.append(popupImage).append(popupClose); //tambahkan close button
                popupOverlay.append(popupContainer);
                $('body').append(popupOverlay);



                // Event click untuk menutup popup
                popupClose.click(function () {
                    popupOverlay.remove();
                });

                popupOverlay.click(function (event) {
                    if (event.target === this) {
                        popupOverlay.remove();
                    }
                });
                const popupShare = $('<div>').addClass('popup-share');
                const facebookShare = $('<a>').attr({
                    'href': `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(image.src)}`, // Ganti dengan URL gambar yang benar
                    'target': '_blank', // Buka di tab baru
                    'class': 'popup-share-icon facebook'
                }).html('<i class="fab fa-facebook-f"></i>');
                const twitterShare = $('<a>').attr({
                    'href': `https://twitter.com/intent/tweet?url=${encodeURIComponent(image.src)}`, // Ganti dengan URL gambar yang benar
                    'target': '_blank',
                    'class': 'popup-share-icon twitter'
                }).html('<i class="fab fa-twitter"></i>');
                const whatsappShare = $('<a>').attr({
                    'href': `https://wa.me/?text=${encodeURIComponent(image.src)}`, // Ganti dengan URL gambar yang benar
                    'target': '_blank',
                    'class': 'popup-share-icon whatsapp'
                }).html('<i class="fab fa-whatsapp"></i>');
                const instagramShare = $('<a>').attr({
                    'href': `https://www.instagram.com/sharer.php?u=${encodeURIComponent(image.src)}`, // Ganti dengan URL gambar yang benar
                    'target': '_blank',
                    'class': 'popup-share-icon instagram'
                }).html('<i class="fab fa-instagram"></i>');


                popupShare.append(twitterShare, whatsappShare, facebookShare, instagramShare);
                popupContainer.append(popupShare);

            });
        });
    });
});

