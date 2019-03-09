var schedule = (function() {
    var openHours, today, openHoursArr, month, dialogue, hoursDialogue, containingDiv, containingDivArr, pTagHour, pTagHourArr;

    //Select containing Div
    containingDiv = document.getElementById('hoursList');

    //Select div to hide
    pTagHour = document.querySelectorAll('.hoursPtag');

    //Select span element
    openHours = document.querySelectorAll('.dateDependent');

    //Convert nodelist to an array
    openHoursArr = Array.prototype.slice.call(openHours);
    pTagHourArr = Array.prototype.slice.call(pTagHour);

    //Create new date object
    today = new Date;
    
    //Use month method on Date object
    month = today.getMonth();

    //Create dialog strings
    dialogList = {
        duringSchool: ' 5pm to 9pm',
        afterSchool: ' 2pm to 10pm'
    };

    //create a function to change hours dialogue
    hoursDialogue = function(dialog) {
        openHoursArr.forEach(function(current){
            current.textContent = dialog;
        })
    };

    if(month > 1 && month < 4) {
        hoursDialogue(dialogList.duringSchool);
    } else if(month > 5 && month < 9 ){
        hoursDialogue(dialogList.afterSchool);
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


var locationDependentText = (function() {
    var displayText, starterText, locationText, photo1, photo2, photo3, manchesterText; 

    displayText = function(current, text) {
        current.addEventListener('mouseenter', function() {
            starterText.textContent = '';
            starterText.insertAdjacentHTML('afterbegin', text);
        });
        current.addEventListener('mouseleave', function() {
            starterText.textContent = '';
            starterText.insertAdjacentHTML('afterbegin', '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">Weve got one near you!</h3><p class="paragraph">With 3 locations evenly spread across St. Louis, were guaranteed to be near you so you can have delicious shaved ice whenever you get a craving!</p>');
        });
    }
    
    //Select starter text div and div that will contain js injection
    starterText = document.querySelector('#starterText');

    locationText = document.querySelector('#locationText');

    //select photos to dispay text from
    photo1 = document.querySelector('.composition__photo--p1');
    photo2 = document.querySelector('.composition__photo--p2');
    photo3 = document.querySelector('.composition__photo--p3');

    //Define text
    manchesterText = '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">Manchester Location</h3><p class="paragraph">This is our Manchester Missouri location. Opened way back in 2007, this stand became an almost overnight success. We have served thousands of shaved ice at this location. Come see it at 126 Old Meramec Station Rd. Manchester, MO 63021</p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.4965465596865!2d-90.51352768457544!3d38.59143997961899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8d39480cf1df9%3A0x13b0982382daccd9!2s126+Old+Meramec+Station+Rd%2C+Ballwin%2C+MO+63021%2C+USA!5e0!3m2!1sen!2sdk!4v1552108901833" align="center" width="300" height="225" frameborder="0" style="border:0" allowfullscreen></iframe>';
    cityText = '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">South City Location</h3><p class="paragraph">Our second location located in St. Louis at the intersection of Holly Hills and Morganford rd. A great spot to chill out and have some delicious shaved ice. Find us at 4175 Holly Hills Blvd St. Louis, MO 63116</p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d779.857869225666!2d-90.27366107076527!3d38.56991059872641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b5d86872a3bd%3A0x33e65c3aebf2cec4!2s4175+Holly+Hills+Blvd%2C+St.+Louis%2C+MO+63116%2C+USA!5e0!3m2!1sen!2sdk!4v1552110494451" width="300" height="225" frameborder="0" style="border:0" allowfullscreen></iframe>';
    ellisvilleText = '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">Ellisville Location</h3><p class="paragraph">This is our newest location opened in 2019! We are excited to offer shaved ice to all the Ellisville and Wildwood residents! Located behind Pro Tech collision center. Find us at 16360 Truman Rd, Ellisville, MO 63011, USA</p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.7058102564747!2d-90.61407658457557!3d38.586621979619686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d92a12923405c9%3A0x16edf5e7fbe73ddd!2sPro-Tech+Collision+Center!5e0!3m2!1sen!2sdk!4v1552110919907" width="300" height="225" frameborder="0" style="border:0" allowfullscreen></iframe>';

    //Add event listener to check for hover on photo
    displayText(photo1, manchesterText);
    displayText(photo2, cityText);
    displayText(photo3, ellisvilleText);
    

    

})();








var copyrightYear = function() {
    var today, year, copyright

    today = new Date;
    year = today.getFullYear();
    copyright = document.querySelector('#copyright');
    copyright.textContent = year;
}; copyrightYear();







//<p class="paragraph">This is our Manchester Missouri location. Opened way back in 2007, this stand became an almost overnight success.</p>