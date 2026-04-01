$(document).ready(function() {
    var lb = $('.lightbox');
    lb.appendTo($('body'));
    
    $(".lightbox").each( function() {
        lightbox(this);
    });
});

//=====lightbox========================
//class for the lightbox
function lightbox(elmnt) {
    var index = 0;  //current view index
    var numItems;  //number of view items
    var viewItems;  //array of view items
    var textItems;  //array of text items
    var group;  //image grouping for the lightbox
    
    init();
    
    //-----init--------------------
    function init() {
        //initialize some things...
        viewItems = $(".viewer .item", elmnt);
        textItems = $(".viewer .itemText", elmnt);
        numItems = viewItems.length;
        group = $(elmnt).attr("lightbox-group");
        
        //set the current view
        setView(0);
        
        //add click handlers to arrows
        $(".arrow.left", elmnt).click(function(event) {
            event.stopPropagation();
            setView(index - 1);
        });
        $(".arrow.right", elmnt).click(function(event) {
            event.stopPropagation();
            setView(index + 1);
        });
        
        //add click handlers to background and and X button
        $(elmnt).click(function() {
            close();
        });
        $(".close", elmnt).click(function() {
            close();
        });
        
        //fix "sticky tap" effects
        $(".close, .arrow", elmnt).each(function() {
            this.addEventListener("touchend", function() {
                this.classList.add('disableHover');
            });
        });
        
        //make clicks on image not propogate
        $(".viewer", elmnt).click(function() {
            event.stopPropagation();
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
                case 27: //escape
                    close();
                default:
            }
        });
         
        //hide view images until loaded
        $(".viewer > img", elmnt).each(function() {
            var imgElement = $(this)[0];
            var url = imgElement.src;
            
            if (url) {
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
                a.src = url;
            }
        });
        
        //create the lightbox links in the page 
        $(".lightboxLink").each(function() {
            var el = $(this);
            var linkIndex;
            
            //get the link index
            linkIndex = el.attr("lightbox-img");
            if (!linkIndex) {
                linkIndex = 0;
            } else {
                linkIndex = parseInt(linkIndex, 10);
                if (isNaN(linkIndex)) {
                    linkIndex = 0;
                }
            }
            
            //only add the link if it is for this lightbox's grouping of images
            if (!group || !el.attr("lightbox-group") || el.attr("lightbox-group") ==  group) {
                el.click(function() {
                    open(linkIndex);
                    return false;
                });
            }
        });
    }
    
    //-----setView--------------------
    function setView(itemIndex) {
        if (itemIndex >= 0 && itemIndex < numItems) {
            index = itemIndex;
            
            //update arrows
            $(".arrow", elmnt).each(function(i) {this.classList.remove("disabled");});
            if (index <= 0) {
                $(".arrow.left", elmnt)[0].classList.add("disabled");
            }
            if (index >= (numItems - 1)) {
                $(".arrow.right", elmnt)[0].classList.add("disabled");
            }
            
            //remove the old selected
            viewItems.each(function() {this.classList.add("hidden");});
            textItems.each(function() {this.classList.add("hidden");});
            
            //set the new selected
            viewItems[index].classList.remove("hidden");
            textItems[index].classList.remove("hidden");
            
            //update the item index text 
            $(".itemIndex", elmnt)[0].innerHTML = (itemIndex + 1) + " of " + numItems;
        }
    }
    
    //-----close--------------------
    //close the lightbox
    function close() {
        elmnt.classList.add('hidden');
        
        $('body')[0].style.overflow = "auto";
    }
    
    //-----open--------------------
    //open the lightbox. Optionally specify starting index.
    function open(index) {
        if (isNaN(index)) {
            index = 0;
        } 
        
        //lock the page
        $('body')[0].style.overflow = "hidden";
        
        //go to the view
        setView(index);
        
        //unhide
        elmnt.classList.remove('hidden');
        
        //set focus to the lightbox
        $(elmnt).focus();
    }
}