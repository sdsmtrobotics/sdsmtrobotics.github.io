$(document).ready(function() {
    mediaCarousel($(".mediaCarousel")[0]);
});

//=====mediaCarousel========================
//class for the media carousel
function mediaCarousel(elmnt) {
    var index = 0;  //current view index
    var numItems;  //number of view items
    var items;  //array of view items
    var thumbs;  //array of thumb elements
    var thumbsPerPage = 0;  //number of thumbs showing
    var thumbsPage = -1;  //current set of thumbs showing
    var numThumbPages; //number of pages of thumbnails
    
    init();
    
    //-----init--------------------
    function init() {
        //initialize some things...
        items = $(".viewer", elmnt).children();
        numItems = items.length;
        thumbs = $(".thumbsContainer", elmnt).children();
        
        //set the current view
        setView(0);
        
        //initialize the sizing
        resize();
        window.addEventListener("resize", resize);
        
        //add the click handlers to the thumbs
        thumbs.each(function(i) {
            if (i < numItems) {
                $(this).click(function() {
                    setView(i);
                });
            }
        });
        
        //add click handlers to arrows
        $(".viewerWrapper .arrow.left", elmnt).click(function() {
            setView(index - 1);
        });
        $(".viewerWrapper .arrow.right", elmnt).click(function() {
            setView(index + 1);
        });
        
        $(".thumbsWrapper .arrow.left", elmnt).click(function() {
            scrollThumbs(thumbsPage - 1, true);
        });
        $(".thumbsWrapper .arrow.right", elmnt).click(function() {
            scrollThumbs(thumbsPage + 1, true);
        });
        
        //fix "sticky tap" effects
        $(".arrow", elmnt).each(function() {
            this.addEventListener("touchend", function() {
                this.classList.add('disableHover');
            });
        });
        
        //add handler for arrow keys
        $(elmnt).on('keydown', function(event) {
            switch(event.keyCode){
                case 37:  //left arrow key
                    setView(index - 1);
                    break;
                case 39:  //right arrow key
                    setView(index + 1);
                    break;
                default:
            }
        });
         
        //hide view images until loaded
        $(".viewer > div", elmnt).each(function(i) {
            var imgElement = this;
            
            //hide the images
            imgElement.classList.add("loading");
            
            //set the callback for when the image is laoded
            var a = new Image;
            a.onload = function() {
                imgElement.classList.remove("loading");
            };
            a.onerror = function() {
                imgElement.classList.remove("loading");
            };
            a.src = $(imgElement).css( 'background-image' ).slice(4, -1).replace(/['"]/g, "");
        });
    }
    
    //-----setView--------------------
    function setView(itemIndex) {
        if (itemIndex >= 0 && itemIndex < numItems) {
            index = itemIndex;
            
            //update arrows
            $(".viewerWrapper .arrow", elmnt).each(function(i) {this.classList.remove("disabled");});
            if (index <= 0) {
                $(".viewerWrapper .arrow.left", elmnt)[0].classList.add("disabled");
            }
            if (index >= (numItems - 1)) {
                $(".viewerWrapper .arrow.right", elmnt)[0].classList.add("disabled");
            }
            
            //remove the old selected
            items.each(function() {this.classList.add("hidden");});
            thumbs.each(function() {this.classList.remove("selected");});
            
            //set the new selected
            items[index].classList.remove("hidden");
            if (thumbs[index]) {
                thumbs[index].classList.add("selected");
            }
            
            //scroll to page of the item
            scrollThumbs(Math.floor(index / thumbsPerPage), true);
        }
    }
    
    //-----resize--------------------
    //adjust sizing of components
    function resize() {
        var thumbsContainerWidth = $(".thumbsContainer", elmnt).innerWidth();
        var oldThumbsPerPage = thumbsPerPage;
        
        //get the number of thumbs to show. Min 50px per thumb
        thumbsPerPage = Math.floor($(".thumbsContainer", elmnt).innerWidth() / 50);
        
        //At least 5 items showing
        thumbsPerPage = Math.max(thumbsPerPage, 5);
        numThumbPages = Math.ceil(thumbs.length / thumbsPerPage)
        
        //set the widths
        thumbs.each(function() {this.style.width = (100 / thumbsPerPage).toString() + "%";});
        
        //hide/show thumb arrows 
        if (thumbsPerPage >= numItems) {
            $(".thumbsWrapper .arrow", elmnt).each(function() {this.classList.add("hidden");});
        } else {
            $(".thumbsWrapper .arrow", elmnt).each(function() {this.classList.remove("hidden");});
        }
        
        //update the page of thumbs that is showing
        scrollThumbs(Math.floor(oldThumbsPerPage / thumbsPerPage * thumbsPage));
    }
    
    //-----scrollThumbs--------------------
    //scroll the the specified page of thumbs
    function scrollThumbs(newPage, animate) {
        if (newPage != thumbsPage && newPage >= 0 && newPage < numThumbPages) {
            thumbsPage = newPage;
            
            //set the scroll position
            if (animate) {
                $(".thumbsContainer", elmnt).animate({left: (thumbsPage * -100).toString() + "%"}, 250);
            } else {
                $(".thumbsContainer", elmnt)[0].style.left = (thumbsPage * -100).toString() + "%";
            }
            
            //disable/enable arrows
            if (thumbsPage == 0) { //first page
                $(".thumbsWrapper .arrow.left", elmnt)[0].classList.add("disabled");
                $(".thumbsWrapper .arrow.right", elmnt)[0].classList.remove("disabled");
            } else if (thumbsPage == (numThumbPages - 1)) { //last page
                $(".thumbsWrapper .arrow.right", elmnt)[0].classList.add("disabled");
                $(".thumbsWrapper .arrow.left", elmnt)[0].classList.remove("disabled");
            } else {
                $(".thumbsWrapper .arrow.right", elmnt)[0].classList.remove("disabled");
                $(".thumbsWrapper .arrow.left", elmnt)[0].classList.remove("disabled");
            }
        }
    }
}
