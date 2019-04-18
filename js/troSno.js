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


var locationDependentText = (function() {
    let widthMatch = window.matchMedia("(min-width: 901px)");
    // mm in the function arg is the matchMedia object, passed back into the function
    
    if (widthMatch.matches) {
        // it matches the media query: that is, min-width is >= 500px
        var displayText, starterText, locationText, photo1, photo2, photo3, manchesterText; 

        displayText = function(current, text) {
            current.addEventListener('mouseenter', function() {
                starterText.textContent = '';
                starterText.insertAdjacentHTML('afterbegin', text);
            });
            current.addEventListener('mouseleave', function() {
                starterText.textContent = '';
                starterText.insertAdjacentHTML('afterbegin', '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">We&#39;ve got one near you!</h3><p class="paragraph">With 3 locations evenly spread across St. Louis, were guaranteed to be near you so you can have delicious shaved ice whenever you get a craving!</p>');
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
        ellisvilleText = '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">Ellisville Location</h3><p class="paragraph">This is our newest location opened in 2019! We are excited to offer shaved ice to all the Ellisville and Wildwood residents! Located behind Pro Tech collision center. Find us at 16360 Truman Rd, Ellisville, MO 63011</p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.7058102564747!2d-90.61407658457557!3d38.586621979619686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d92a12923405c9%3A0x16edf5e7fbe73ddd!2sPro-Tech+Collision+Center!5e0!3m2!1sen!2sdk!4v1552110919907" width="300" height="225" frameborder="0" style="border:0" allowfullscreen></iframe>';

        //Add event listener to check for hover on photo
        displayText(photo1, manchesterText);
        displayText(photo2, cityText);
        displayText(photo3, ellisvilleText);
    }
    else {
        // it no longer matches the media query
        // remove the event listener

        var displayText, starterText, locationText, photo1, photo2, photo3, manchesterText; 

        
    
        
        displayText = function(current, text) {
            current.addEventListener('click', function() {
                starterText.textContent = '';
                starterText.insertAdjacentHTML('afterbegin', text);
            });
            // current.addEventListener('mouseleave', function() {
            //     starterText.textContent = '';
            //     starterText.insertAdjacentHTML('afterbegin', '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">Weve got one near you!</h3><p class="paragraph">With 3 locations evenly spread across St. Louis, were guaranteed to be near you so you can have delicious shaved ice whenever you get a craving!</p>');
            // });
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
        ellisvilleText = '<h3 class="heading-tertiary u-center-text u-margin-bottom-small">Ellisville Location</h3><p class="paragraph">This is our newest location opened in 2019! We are excited to offer shaved ice to all the Ellisville and Wildwood residents! Located behind Pro Tech collision center. Find us at 16360 Truman Rd, Ellisville, MO 63011</p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.7058102564747!2d-90.61407658457557!3d38.586621979619686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d92a12923405c9%3A0x16edf5e7fbe73ddd!2sPro-Tech+Collision+Center!5e0!3m2!1sen!2sdk!4v1552110919907" width="300" height="225" frameborder="0" style="border:0" allowfullscreen></iframe>';

        //Add event listener to check for hover on photo
        displayText(photo1, manchesterText);
        displayText(photo2, cityText);
        displayText(photo3, ellisvilleText);
        }
    })();
    
    
    

    

// })();

var flavorAdder = (function() {

    var flavorArr1, flavorArr2, flavorArr3, flavorArr4, textLocator1, textLocator2, textLocator3, textLocator4, addToPage;

    flavorArr1 = [
        '<p class="red" id="apple" onclick="">Apple</p>',
        '<p class="yellow" id="banana" onclick="">Banana</p>',
        '<p class="white" id="birthdayCake" onclick="">Birthday Cake</p>',
        '<p class="darkRed" id="blackCherry" onclick="">Black Cherry</p>',
        '<p class="blue" id="blueHawaiian" onclick="">Blue Hawaiian</p>',
        '<p class="blue" id="blueRaspberry" onclick="">Blue Raspberry</p>',
        '<p class="purple" id="blueberry" onclick="">Blueberry</p>',
        '<p class="pink" id="bubblegum" onclick="">Bubblegum</p>',
        '<p class="red" id="cinnamon" onclick="">Cinnamon</p>',
        '<p class="white" id="coconut" onclick="">Coconut</p>'
    ];

    flavorArr2 = [
        '<p class="brown" id="coffee" onclick="">Coffee</p>',
        '<p class="brown" id="cola" onclick="">Cola</p>',
        '<p class="pink" id="cottonCandy" onclick="">Cotton Candy</p>',
        '<p class="red" id="cranberry" onclick="">Cranberry</p>',
        '<p class="green" id="lime" onclick="">Fresh Lime</p>',
        '<p class="purple" id="grape" onclick="">Grape</p>',
        '<p class="green" id="greenApple" onclick="">Green Apple</p>',
        '<p class="pink" id="guava" onclick="">Guava</p>',
        '<p class="green" id="honeydew" onclick="">Honeydew Melon</p>',
        '<p class="purple" id="huckleberry" onclick="">Huckleberry</p>'
    ];

    flavorArr3 = [
        '<p class="green" id="kiwi" onclick="">Kiwi</p>',
        '<p class="yellow" id="lemon" onclick="">Lemon</p>',
        '<p class="orange" id="mango" onclick="">Mango</p>',
        '<p class="green" id="margarita" onclick="">Margarita</p>',
        '<p class="orange" id="orange" onclick="">Orange</p>',
        '<p class="yellow" id="passionFruit" onclick="">Passion Fruit</p>',
        '<p class="orange" id="peach" onclick="">Peach</p>',
        '<p class="yellow" id="pinaColada" onclick="">Piña Colada</p>',
        '<p class="yellow" id="pineapple" onclick="">Pineapple</p>',
        '<p class="pink" id="pinkGrapefruit" onclick="">Pink Grapefruit</p>'
    ];

    flavorArr4 = [
        '<p class="pink" id="pinkLemonade" onclick="">Pink Lemonade</p>',
        '<p class="red" id="redRaspberry" onclick="">Red Raspberry</p>',
        '<p class="brown" id="rootbeer" onclick="">Rootbeer</p>',
        '<p class="red" id="strawberry" onclick="">Strawberry</p>',
        '<p class="orange" id="tangerine" onclick="">Tangerine</p>',
        '<p class="red" id="tigersBlood" onclick="">Tiger’s Blood</p>',
        '<p class="red" id="tuttiFrutti" onclick="">Tutti Frutti</p>',
        '<p class="white" id="vanilla" onclick="">Vanilla</p>',
        '<p class="red" id="verryCherry" onclick="">Verry Cherry</p>',
        '<p class="red" id="watermelon" onclick="">Watermelon</p>'
    ];

    textLocator1 = document.querySelector('#flavorList1');
    textLocator2 = document.querySelector('#flavorList2');
    textLocator3 = document.querySelector('#flavorList3');
    textLocator4 = document.querySelector('#flavorList4');

    
    addToPage = function(arr, text) {
        arr.forEach(function(current) {
            text.insertAdjacentHTML('beforeend', current);
        });
    }

    addToPage(flavorArr1, textLocator1);
    addToPage(flavorArr2, textLocator2);
    addToPage(flavorArr3, textLocator3);
    addToPage(flavorArr4, textLocator4);
    

})();

var flavorPopup = (function(){
    var apple, banana, birthdayCake, blackCherry, comboContainer, flavorArr, blueHawaiian,
    blueRaspberry, blueberry, bubblegum, cinnamon, coconut,
    coffee, cola, cottonCandy, cranberry, lime, grape,
    greenApple, guava, honeydew, huckleberry, kiwi, lemon,
    mango, margarita, orange, passionFruit, peach, piñaColada,
    pineapple, pinkGrapefruit, pinkLemonade, redRaspberry, rootbeer,
    strawberry, tangerine, tigersBlood, tuttiFrutti, vanilla,
    verryCherry, watermelon;
    

    comboContainer = document.querySelector('#flavorHeader');

    function flavor(selector, message) {
        this.selector = selector;
        this.message = message;
    }

    function stockMessage(comboName, ingredients) {
       var message = '<div id="jsSection"><div id="comboDisplay"><span id="coolCombo">Cool Combo to try with this flavor:</span><p id="comboName">' + comboName + '</p><p id="flavorCombo">' + ingredients + '</p></div></div>';
    return message;
    }

    apple = new flavor(document.querySelector('#apple'), stockMessage('Johnny Appleseed', '(Apple + Green Apple)'));
    banana = new flavor(document.querySelector('#banana'), stockMessage('Bananaberry', '(Banana + Strawberry)'));
    birthdayCake = new flavor(document.querySelector('#birthdayCake'), stockMessage('Strawberry Shortcake', '(Birthday Cake + Strawberry)'));
    blackCherry = new flavor(document.querySelector('#blackCherry'), stockMessage('Cherry Blaster', '(Cherry + Black Cherry)'));
    blueHawaiian = new flavor(document.querySelector('#blueHawaiian'), stockMessage('Ocean Water', '(Blue Hawaiian + Vanilla)'));
    blueRaspberry = new flavor(document.querySelector('#blueRaspberry'), stockMessage('Otis', '(Blue Raspberry + Orange)'));
    blueberry = new flavor(document.querySelector('#blueberry'), stockMessage('Rock N Roll', '(Blue Raspberry + Blueberry + Grape)'));
    bubblegum = new flavor(document.querySelector('#bubblegum'), stockMessage('New Kidz on the Block', '(Bubblegum + Watermelon)'));
    cinnamon = new flavor(document.querySelector('#cinnamon'), stockMessage('Flaming Heart', '(Cinnamon + Apple)'));
    coconut = new flavor(document.querySelector('#coconut'), stockMessage('Ghost', '(Coconut + Vanilla)'));

    coffee = new flavor(document.querySelector('#coffee'), stockMessage('Coffee N Cream', '(Coffee + Cream (50&#162;))' ));
    cola = new flavor(document.querySelector('#cola'), stockMessage('Cherry Cola', '(Cherry + Cola)'));
    cottonCandy = new flavor(document.querySelector('#cottonCandy'), stockMessage('Wedding Cake', '(Cotton Candy + Birthday Cake)')); 
    cranberry = new flavor(document.querySelector('#cranberry'), stockMessage('Cranapple', '(Cranberry + Apple)'));
    lime = new flavor(document.querySelector('#lime'), stockMessage('Turtle Power', '(Lime + Blue Raspberry)'));
    grape = new flavor(document.querySelector('#grape'), stockMessage('Summer Candy', '(Grape + Pink Lemonade)'));
    greenApple = new flavor(document.querySelector('#greenApple'), stockMessage('Hurricane', '(Green Apple + Watermelon)'));
    guava = new flavor(document.querySelector('#guava'), stockMessage('Lovers Delight', '(Guava + Passion Fruit)'));
    honeydew = new flavor(document.querySelector('#honeydew'), stockMessage('Melonball', '(Honeydew Melon + Cantaloupe + Watermelon)'));
    huckleberry = new flavor(document.querySelector('#huckleberry'), stockMessage('Mamba', '(Huckleberry + Passion Fruit + Guava)'));

    kiwi = new flavor(document.querySelector('#kiwi'), stockMessage('Hawaiian Spike', '(Kiwi + Strawberry + Watermelon)'));
    lemon = new flavor(document.querySelector('#lemon'), stockMessage('Grape Ape', '(Lemon + Grape)'));
    mango = new flavor(document.querySelector('#mango'), stockMessage('Mango Madness', '(Mango + Lime)'));
    margarita = new flavor(document.querySelector('#margarita'), stockMessage('Citrus Cooler', '(Margarita + Orange)'));
    orange = new flavor(document.querySelector('#orange'), stockMessage('Dock of the Bay', '(Orange + Peach + Watermelon)'));
    passionFruit = new flavor(document.querySelector('#passionFruit'), stockMessage('Gold Rush', '(Passion Fruit + Pineapple + Tangerine)'));
    peach = new flavor(document.querySelector('#peach'), stockMessage('Summer Breeze', '(Peach + Watermelon + Strawberry)'));
    piñaColada = new flavor(document.querySelector('#pinaColada'), stockMessage('Sunshine', '(Pina Colada + Banana)'));
    pineapple = new flavor(document.querySelector('#pineapple'), stockMessage('Polynesian Pineapple', '(Pineapple + Strawberry)'));
    pinkGrapefruit = new flavor(document.querySelector('#pinkGrapefruit'), stockMessage('Party in Your Mouth', '(Pink Grapefruit + Tangerine + Blue Raspberry)'));
    
    pinkLemonade = new flavor(document.querySelector('#pinkLemonade'), stockMessage('Pink Flamingo', '(Pink Lemonade + Cherry)'));
    redRaspberry = new flavor(document.querySelector('#redRaspberry'), stockMessage('Super Berry', '(Red Raspberry + Strawberry + Blueberry)'));
    rootbeer = new flavor(document.querySelector('#rootbeer'), stockMessage('Rootbeer Float', '(Rootbeer + Cream (50&#162;))'));
    strawberry = new flavor(document.querySelector('#strawberry'), stockMessage('Bahama Mama', '(Strawberry + Banana + Coconut)'));
    tangerine = new flavor(document.querySelector('#tangerine'), stockMessage('Tangerine Dream', '(Tangerine + Black Cherry)'));
    tigersBlood = new flavor(document.querySelector('#tigersBlood'), stockMessage('BGER', '(Tigers Blood + Pineapple)'));
    tuttiFrutti = new flavor(document.querySelector('#tuttiFrutti'), stockMessage('Fruit Punch', '(Tutti Frutti + Cantaloupe)'));
    vanilla = new flavor(document.querySelector('#vanilla'), stockMessage('Caribbean Cool', '(Vanilla + Lime + Kiwi + Watermelon)'));
    verryCherry = new flavor(document.querySelector('#verryCherry'), stockMessage('Cherry Trifecta', '(Verry Cherry + Black Cherry + Cherry)'));
    watermelon = new flavor(document.querySelector('#watermelon'), stockMessage('Flamethrower', '(Watermelon + Strawberry + Lemon)')); 

    flavorArr = [apple, banana, birthdayCake, blackCherry, blueHawaiian,
                 blueRaspberry, blueberry, bubblegum, cinnamon, coconut,
                 coffee, cola, cottonCandy, cranberry, lime, grape,
                 greenApple, guava, honeydew, huckleberry, kiwi, lemon,
                 mango, margarita, orange, passionFruit, peach, piñaColada,
                 pineapple, pinkGrapefruit, pinkLemonade, redRaspberry, rootbeer,
                 strawberry, tangerine, tigersBlood, tuttiFrutti, vanilla,
                 verryCherry, watermelon];

    

    flavorArr.forEach(function(current) {
        var insertedText =  function() {
            comboContainer.innerHTML = "";
            comboContainer.insertAdjacentHTML('afterbegin', current.message);
        }

    
            
        current.selector.addEventListener('mouseenter', function() {
            insertedText();
        })
    
        current.selector.addEventListener('mouseleave', function() {
                comboContainer.innerHTML = '<h3 class="text-center">Flavors</h3><h4 class="pulse">(hover over a flavor)</h4>';
        })
        
        
            
    });

    


    // apple.addEventListener('mouseenter', function() {
    //     insertedText();
    // })

    

    // apple.addEventListener('mouseleave', function() {
    //     comboContainer.innerHTML = '<h3 class="text-center">Flavors</h3><h4 class="pulse">(hover over a flavor)</h4>';
    // })
    
})();


    var flavorScroll = (function() {
    
    
        var flavorBox1 = document.body.querySelector('#flavor-box-1');
        var flavorBox2 = document.body.querySelector('#flavor-box-2');
        var flavorBox3 = document.body.querySelector('#flavor-box-3');
        var flavorBox4 = document.body.querySelector('#flavor-box-4');

        var buttonRight = document.body.querySelector('#flavorButtonRight');
        var buttonLeft = document.body.querySelector('#flavorButtonLeft');

        var step = 1;

        leftButton.style.visibility = 'hidden';

        function flavorDisplayer(currentStep){
            if(currentStep === 1) {
                flavorBox1.style.display = 'block';

                flavorBox2.style.display = 'none';

                leftButton.style.visibility = 'hidden';
            } else if(currentStep === 2) {
                flavorBox2.style.display = 'block';

                flavorBox1.style.display = 'none';
                flavorBox3.style.display = 'none';

                leftButton.style.visibility = 'visible'; 
            } else if(currentStep === 3) {
                flavorBox3.style.display = 'block';

                flavorBox2.style.display = 'none';
                flavorBox4.style.display = 'none';

                rightButton.style.visibility = 'visible';
            } else if(currentStep === 4) {
                flavorBox4.style.display = 'block';

                flavorBox3.style.display = 'none';

                rightButton.style.visibility = 'hidden';
            }
        }
            

        
        

        buttonRight.addEventListener('click', function() {
            step += 1;

            flavorDisplayer(step);
        });

        buttonLeft.addEventListener('click', function() {
            step -= 1;

            flavorDisplayer(step);
        });
        
    
    
})();


var navClose = (function() {
    
    //Create a HTML collection of links
    var navigationItem = document.body.getElementsByClassName('navigation__link');
 
    //Convert the HTML collection to an Array
    var navigationItemArr = Array.prototype.slice.call(navigationItem);
    
    //Loop through each list item to make checked styling disappear upon click
    navigationItemArr.forEach(function(current){
        current.addEventListener('click', function(){
            document.getElementById('navi-toggle').checked = false;
        })
    });
    
})();


var simpleInstruction = (function() {
    var wordSwitcher, widthMatch;

    wordSwitcher = document.body.querySelector('#flavorInstruction');


    widthMatch = window.matchMedia("(max-width: 901px)");
    // mm in the function arg is the matchMedia object, passed back into the function
    
    if (widthMatch.matches) {
        wordSwitcher.textContent = "Click";
    }
    else {
        wordSwitcher.textContent = "Hover over";
        }
    
})();

var copyrightYear = (function() {
    var today, year, copyright

    today = new Date;
    year = today.getFullYear();
    copyright = document.querySelector('.copyright');
    copyright.textContent = year;
})();







//<p class="paragraph">This is our Manchester Missouri location. Opened way back in 2007, this stand became an almost overnight success.</p>