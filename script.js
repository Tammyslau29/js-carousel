/**
 * Created by tammyslau on 4/25/17.
 */
$(document).ready(function(){
    var images = [
        {url: "image/coolPug.jpg",
        title: "Lone Pug",
        description: "He walks the lonely road."
        },{url: "image/sadPug.jpg",
            title: "Thoughtful Pug",
            description: "Pug contemplating life."
        },{url: "image/glamourPug.jpg",
            title: "Glamour Pug",
            description: "Living the fancy life"
        },{url: "image/earthyPug.jpg",
            title: "Earthy Pug",
            description: "Earthy Pug is one with nature."
        },{url: "image/cityPug.jpg",
            title: "City Pug",
            description: "Just a small town Pug."
        }
    ];
    initCarouselBody("body");
    addImagesToCarousel(images);
    cycleImage();
    renderIndicator(images)
});

function initCarouselBody(identifierTarget){
    var target = $(identifierTarget);
    var carouselBody = $("<div>").addClass("carouselBody")
    var imageControls = $("<div>").addClass("imageControls");
    var displayBody = $("<div>").addClass("displayBody");

    var rightArrow = $("<button>").addClass("rightArrow fa fa-chevron-right").on("click", function(){
        handleArrowClick("right")
    });
    var leftArrow = $("<button>").addClass("leftArrow fa fa-chevron-left").on("click", function(){
        handleArrowClick("left")
    });
    imageControls.append(leftArrow, rightArrow);
    displayBody.append(imageControls);
    carouselBody.append(displayBody, imageControls);
    target.append(carouselBody);
}
function addImagesToCarousel(imageArray){
    for(var image = 0; image < imageArray.length; image++){
        var imageDetails = imageArray[image];
        var photo = $("<img>").attr("src", imageDetails.url).addClass("imageContainer");
        var title = $("<h1>").text(imageDetails.title).addClass("titleContainer");
        var description = $("<p>").text(imageDetails.description).addClass("descriptionContainer");
        var displayContainer = $("<div>").addClass("displayContainer");
        displayContainer.append(title, photo, description);
        $(".displayBody").append(displayContainer);
        if(image == 0){
            displayContainer.addClass("active");
        }
    }
}
function renderIndicator(imageArray){
    var indicatorContainer = $("<div>").addClass("indicatorContainer");
    for( var i = 0; i < imageArray.length; i++){
        var indicatorPhoto = $("<img>")
            .attr("src", imageArray[i].url)
            .addClass("indicatorPhoto").data("index", i)
            .on("click", function(){
                var photoContainerArray = $(".displayContainer");
                var indicatorArray = $(".indicatorPhoto");
                var index = $(this).data("index");
                    $(".displayContainer.active").removeClass("active");
                    $(".indicatorPhoto.activeIndicator").removeClass("activeIndicator");
                    $(photoContainerArray[index]).addClass("active");
                    $(indicatorArray[index]).addClass("activeIndicator");

            });
        indicatorContainer.append(indicatorPhoto);
        if(i == 0) {
            indicatorPhoto.addClass("activeIndicator")
        }
    }
    $(".carouselBody").append(indicatorContainer)
}
function cycleImage(){
    setInterval(function(){
       handleArrowClick("right")
    }, 5000)
}

function handleArrowClick(direction){
    var activeIndex = 0;
    var photoContainerArray = $(".displayContainer");
    var indicatorArray = $(".indicatorPhoto");
    for(var i = 0; i < photoContainerArray.length; i++){
        if($(photoContainerArray[i]).hasClass("active")){
            activeIndex = i;
            $(photoContainerArray[i]).removeClass("active");
            $(indicatorArray[activeIndex]).removeClass("activeIndicator")
        }
    }
    if(direction === "right") {
        if (activeIndex == photoContainerArray.length - 1) {
            activeIndex = 0;
        } else {
            activeIndex++
        }
    }else if(direction === "left"){
        if(activeIndex == 0){
            activeIndex = photoContainerArray.length-1
        }else{
            activeIndex--
        }
    }
    $(photoContainerArray[activeIndex]).addClass("active");
    $(indicatorArray[activeIndex]).addClass("activeIndicator")

    return;

}
