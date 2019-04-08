var schedule = (function() {
    var openHours, today, openHoursArr, month, dialogue, hoursDialogue, hoursWeekendDialogue, containingDiv, containingDivArr, pTagHour, pTagHourArr;

    //Select containing Div
    containingDiv = document.getElementById('hoursList');

    //Select div to hide
    pTagHour = document.querySelectorAll('.hoursPtag');

    //Select span element
    openHours = document.querySelectorAll('.dateDependent');
    openHoursWeekend = document.querySelectorAll('.dateDependentWeekend');

    //Convert nodelist to an array
    openHoursArr = Array.prototype.slice.call(openHours);
    openHoursWeekendArr = Array.prototype.slice.call(openHoursWeekend);
    pTagHourArr = Array.prototype.slice.call(pTagHour);

    //Create new date object
    today = new Date;
    
    //Use month method on Date object
    month = today.getMonth();

    //Create dialog strings
    dialogList = {
        weekend: ' 2pm to 9pm',
        duringSchool: ' 5pm to 9pm',
        afterSchool: ' 2pm to 10pm'
    };

    //create a function to change hours dialogue
    hoursDialogue = function(dialog) {
        openHoursArr.forEach(function(current){
            current.textContent = dialog;
        })
    };

    hoursWeekendDialogue = function(dialog) {
        openHoursWeekendArr.forEach(function(current){
            current.textContent = dialog;
        })
    };

    if(month > 1 && month < 4) {
        hoursDialogue(dialogList.duringSchool);
        hoursWeekendDialogue(dialogList.weekend);
    } else if(month > 5 && month < 9 ){
        hoursDialogue(dialogList.afterSchool);
        hoursWeekendDialogue(dialogList.afterSchool);
    } else {
        pTagHourArr.forEach(function(current){
            current.style.display = 'none';
        });
        containingDiv.insertAdjacentHTML('afterbegin', '<h4>We are closed for the season until March 1st! Thank you for your patronage and see you next season!</h4>');
    }
    return {
        getDialog: function(){
            return dialogList;
        }
    }
})();

var copyrightYear = (function() {
    var today, year, copyright

    today = new Date;
    year = today.getFullYear();
    copyright = document.querySelector('.copyright');
    copyright.textContent = year;
})();


var currentDate = (function() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateYouCanBeginWorking")[0].setAttribute('min', today);
})();