//Author: Sam Ryckman
//Date: 12/24/2019

//Pad string with leading zero if single digit.
function padWidthZero(str) {
    return ((str.length < 2 ? '0' : '') + str);
}

//get the current date as a RFC3339 timestamp (2011-06-03T10:00:00-07:00)
function getCurrentDate() {
    var today = new Date();
    
    var y = String(today.getFullYear());
    var m = padWidthZero(String(today.getMonth()+1));
    var d = padWidthZero(String(today.getDate()));
    
    return y+'-'+m+'-'+d+'T00:00:00-07:00';
}

//format a date into "Mon, Aug 8, 2019" format.
//date - date string
function formatDate(date) {
    var dayNames = [
        "Sun", "Mon", "Tue",
        "Wed", "Thu", "Fri", "Sat"
    ];

    //get the data
    parsedDate = new Date(date);
    var monthIndex = parsedDate.getMonth();
    var dayIndex = parsedDate.getDay();
    var day = parsedDate.getDate();
    var year = parsedDate.getFullYear();

    //format and return
    //Mon, Aug 8, 2019
    return dayNames[dayIndex] + ', ' + (monthIndex + 1) + '/' + day + '/' + year;
}

//Display an event
//date - date string
//name - name of the event
function displayEvent(date, name) {
    //get the element where we are adding all of this
    var parentElement = document.getElementById("events");
    
    //build the event element
    var eventElement = document.createElement("div");
    eventElement.className += "event";
    if (!date) {
        eventElement.className += "empty";
        eventElement.innerHTML = name;
    } else {
        eventElement.innerHTML = '<b>' + formatDate(date) + '</b>' + ' \u2013 ' + name;
    }

    parentElement.appendChild(eventElement);
}


//get list of events from the G Calendar API
document.addEventListener('DOMContentLoaded', function() {
    //build the url and params
    var requestUrl = 'https://www.googleapis.com/calendar/v3/calendars/robotics@mines.sdsmt.edu/events';
    requestUrl += '?key=AIzaSyCoAZJp84r-5Tk-nbqvnGZY2ZYip4vBRno';
    requestUrl += '&timeMin='+getCurrentDate();
    requestUrl += '&singleEvents=true';
    requestUrl += '&orderBy=startTime';
    requestUrl += '&maxResults=7';

    //create the request
    var request = new XMLHttpRequest()
    request.open('GET.html', requestUrl, true);
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);

      if (request.status < 200 || request.status >= 400) {
        console.log('Error: could not load events from calendar.')
      } else {
        //get the calendar events
        calEvents = data.items;
        
        if (calEvents.length != 0) {
            //iterate through events
            calEvents.forEach(function(calEvent) {
                //Display the event
                if (calEvent.summary && calEvent.start.dateTime) {
                    displayEvent(calEvent.start.dateTime, calEvent.summary);
                }
            })
        } else {
            displayEvent(null, 'There are currently no scheduled events.');
        }
      }
    }

    //send the request
    request.send()
}, false);