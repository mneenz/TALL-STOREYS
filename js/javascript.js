/* Tall Storeys file */

$( document ).ready(function() {

  //Keep the button the same height as the header image
  $('button#cheat').height($('#header #social-media .link img').height());
  $( window ).resize(function() {
    $('button#cheat').height($('#header #social-media .link img').height());
  });

  if ($('body').hasClass('game')) {

    //Preload images
    if (document.images) {
      img1 = new Image();
      img2 = new Image();
      img3 = new Image();
      img4 = new Image();
      img5 = new Image();
      img6 = new Image();
      img7 = new Image();
      img8 = new Image();
      img9 = new Image();
      img10 = new Image();
      img11 = new Image();
      img12 = new Image();
      img13 = new Image();
      img14 = new Image();
      img15 = new Image();
      img16 = new Image();
      img17 = new Image();
      img18 = new Image();

      img1.src = "./images/Apartments_Art+Soul_Architecture_GS_Cheat.png";
      img2.src = "./images/Apartments_Bouliste_Architecture_GS_Cheat.png";
      img3.src = "./images/Apartments_Jacques_Architecture_GS_Cheat.png";
      img4.src = "./images/Apartments_Luxton_Architecture_GS_Cheat.png";
      img5.src = "./images/Apartments_B_Architecture_GS_Cheat.png";
      img6.src = "./images/Apartments_C3_Architecture_GS_Cheat.png";
      img7.src = "./images/Apartments_Essence_Architecture_GS_Cheat.png";
      img8.src = "./images/Apartments_Haus_Architecture_GS_Cheat.png";
      img9.src = "./images/Apartments_Queens_Architecture_GS_Cheat.png";
      img10.src = "./images/Apartments_Art+Soul_Logo_Cheat.png";
      img11.src = "./images/Apartments_Bouliste_Logo_Cheat.png";
      img12.src = "./images/Apartments_Jacques_Logo_Cheat.png";
      img13.src = "./images/Apartments_Luxton_Logo_Cheat.png";
      img14.src = "./images/Apartments_B_Logo_Cheat.png";
      img15.src = "./images/Apartments_C3_Logo_Cheat.png";
      img16.src = "./images/Apartments_Essence_Logo_Cheat.png";
      img17.src = "./images/Apartments_Haus_Logo_Cheat.png";
      img18.src = "./images/Apartments_Queens_Logo_Cheat.png";
    }

	   //Randomize the developments
	    //Sort the divs with the class development in the html
      var randomizeBrandings = $('#brandings div');
	    var randomizeDevelopments = $('#developments div').get().sort(function(){

		       // Returns a random number from 0 up to 9
  	        return Math.floor(Math.random() * 9);
      });

	    // Inserts HTML elements of the variable randomizeDevelopment at the end of the variable randomizeDevelopments parent to randomize the order
	    // Then fade in developments after they have been randomised so that they don't jump around on pageload
	    $(randomizeDevelopments).appendTo(randomizeDevelopments[0].parentNode).fadeIn(2500);
      $(randomizeBrandings).appendTo(randomizeBrandings[0].parentNode).fadeIn(2500);

      //Prevent default for submit button & save the nickname from form to the database
      $('button#name').click(function(event) {
        event.preventDefault();
        //If the iinput (nickname) value is longer than 0, fadeout the intro so that the game can start
        if ($('input.name').val().length > 0){
          $("#intro-wrapper").fadeOut();
          $('#developments').css({'opacity' : 1}); //Hide the developments
          $('#brandings').css({'opacity' : 1}); //Hide the developments
        }
        else {
          $('input.name').addClass('error');
          $('p.error').text('Please enter your name');
        }
      });


      //Shake div on wrong answer
      jQuery.fn.shake = function () {
        this.each(function (i) {
          $(this).css({
            "position": "relative"
          });
          for (var x = 1; x <= 9; x++) {
            $(this).animate({
              left: -15
            }, 50).animate({
              left: 0
            }, 50);
          }
        });
      }

      $('#developments div').click(function() {
        $('#developments div').removeClass("active");//If there already is an active development, remove the active class
        $(this).addClass("active"); //Add the active class to the clicked element
        //If the brandings active div has the same classes as the clicked developments div, remove the active class and add the correct class
        if ($('#brandings div').hasClass("active")) {
          if ($('#brandings .active').attr('class') === $(this).attr('class')) {
            $(this).addClass("correct").removeClass("active");
            $('#brandings .active').addClass("correct").removeClass("active");
          }
          else {//Otherwise remove the active class from both developments and brandings
            $(this).removeClass("active");
            $('#brandings .active').removeClass("active");
            $(this).shake(); //Shake the development
          }
        }
      });

      $('#brandings div').click(function() {
        $('#brandings div').removeClass("active");//If there already is an active branding, remove the active class
        $(this).addClass("active"); //Add the active class to the clicked element
        //If the development active div has the same classes as the clicked branding div, remove the active class and add the correct class
        if ($('#developments div').hasClass("active")) {
          if ($('#developments .active').attr('class') === $(this).attr('class')) {
            $(this).addClass("correct").removeClass("active");
            $('#developments .active').addClass("correct").removeClass("active");
          }
          else {//Otherwise remove the active class from both developments and brandings
            $(this).removeClass("active");
            $('#developments .active').removeClass("active");
            $(this).shake(); //Shake the branding
          }
        }
      });
    }

    //Show congratulations message when all development and branding divs have the css class 'correct'
    function congratz() {
      if($('.correct').length > 14) {
        Timer.Timer.stop();//Stop the timer
        $('#successMessage').fadeIn(2500);
        $('#developments').css({'background-image' : 'url(./images/successmessage.png)','background-repeat': 'no-repeat'});
        $('#developments div').css({'opacity' : 0}); //Hide the developments

        //Get the timer time and the nickname, push it to the Firebase database
        var score = $('#stopwatch').text();
        var nickname = $('input.name').val();
          myFirebaseRef.child("leaderboard").push({
          nickname: nickname,
          time: score
        });

      }
    }

    // Onclick the cheat button, show the first developments that haven't been matched already
    // Find the branding with the same class as the first non correct development
    // Add the correct class to both branding and development
    $('button#cheat').click(function() {
      congratz();
      var cheatingBranding = $('#developments div').not(".correct").first().attr('class');
      $('#brandings div.'+ cheatingBranding).addClass( "correct" );
      $('#developments div.'+ cheatingBranding).addClass( "correct" );
    });

    //Get firebase
    var myFirebaseRef = new Firebase("https://tall-storeys.firebaseio.com/");

    //If the user is on the leaderboard page
    if ($('body').hasClass('leaderboard')) {
      //get the 'leaderboard' child of the firebase database and pass it on to the variable objectValue
      var fireBaseValue = myFirebaseRef.child("leaderboard").on('value', function(objectValue) {
      //get the value of leaderboard
      var leaderboard = objectValue.val();
      //create array of the leaderboard values with the lodash library
      var arr_leaderboard = _.values(leaderboard);
      //created a sorted array of values sorted by the time value
      var sorted_arr = _.sortByAll(arr_leaderboard, ['time'], _.values);

      //i starts with 0
      var i=0;

      //loop through the sorted leaderboard objects and get the nickname withing the object, add 1 to the variable i after every loop
      for (var key in sorted_arr) {
        i++; //add 1 to i
        //put the time in the relevant table cell with the help of the i variable
        $('.name' + i).html(sorted_arr[key].nickname);
        //put the time in the table
        $('.score' + i).html(sorted_arr[key].time);
      }
    })
  }
});
