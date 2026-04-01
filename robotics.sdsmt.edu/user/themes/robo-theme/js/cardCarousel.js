//Author: Samuel Ryckman
//Date: 12/27/2019

$(document).ready(function() {
    $(".cardCarousel").each(function() {
        console.log(this);
        cardCarousel(this);
    });
});

//=====cardCarousel========================
//class for the card carousel
function cardCarousel(elmnt) {
    var curPage;  //current view page
    var numItems;  //number of view items
    var numPages;  //number of view pages
    var itemsPerPage;  //number items visible
    var items;  //array of view items
    var leftArrow;
    var rightArrow;
    
    init();
    
    //-----init--------------------
    function init() {
        //initialize some things...
        items = $(".cardContainer", elmnt).children();
        numItems = items.length;
        
        //get the arrows
        leftArrow = $(".arrow.left", elmnt)[0];
        rightArrow = $(".arrow.right", elmnt)[0];
        
        //initialize the sizing
        resize();
        window.addEventListener("resize", resize);
        
        //add click handlers to arrows
        $(leftArrow).click(function() {
            scrollView(curPage - 1, true);
        });
        $(rightArrow).click(function() {
            scrollView(curPage + 1, true);
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
                    scrollView(curPage - 1, true);
                    break;
                case 39:  //right arrow key
                    scrollView(curPage + 1, true);
                    break;
                default:
            }
        });
    }
    
    //-----resize--------------------
    //adjust sizing of components
    function resize() {
        var oldItemsPerPage = itemsPerPage;
        
        //get the card width
        var cardWidth = items[0].offsetWidth;
        cardWidth += parseInt(getComputedStyle(items[0]).marginLeft);
        cardWidth += parseInt(getComputedStyle(items[0]).marginRight);
        
        //get the view size
        var viewWidth = $(".cardViewer", elmnt).innerWidth();
        
        //calculate the number of items per page
        itemsPerPage = Math.round(viewWidth / cardWidth);
        numPages = Math.ceil(numItems / itemsPerPage);
        
        //hide/show arrows 
        if (itemsPerPage >= numItems) {
            leftArrow.classList.add("hidden");
            rightArrow.classList.add("hidden");
        } else {
            leftArrow.classList.remove("hidden");
            rightArrow.classList.remove("hidden");
        }
        
        //update the page of items that is showing
        if (oldItemsPerPage) {
            scrollView(Math.floor(oldItemsPerPage / itemsPerPage * curPage));
        } else {
            scrollView(0);
        }
    }
    
    
    
    //-----scrollView--------------------
    //scroll the the specified page of cards
    function scrollView(newPage, animate) {
        if (newPage != curPage && newPage >= 0 && newPage < numPages) {
            curPage = newPage;
            
            //set the scroll position
            if (animate) {
                jQuery(".cardContainer", elmnt).animate({left: (curPage * -100).toString() + "%"}, 250);
            } else {
                $(".cardContainer", elmnt)[0].style.left = (curPage * -100).toString() + "%";
            }
            
            //disable/enable arrows
            if (curPage == 0) { //first page
                leftArrow.classList.add("disabled");
                rightArrow.classList.remove("disabled");
            } else if (curPage == (numPages - 1)) { //last page
                rightArrow.classList.add("disabled");
                leftArrow.classList.remove("disabled");
            } else {
                rightArrow.classList.remove("disabled");
                leftArrow.classList.remove("disabled");
            }
        }
    }
}
