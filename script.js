https://codepen.io/Abd2dev/pen/vZovGZ?editors=1000
$(document).ready(function() {
    
  var playIt = true;       // Play is avaliable
  var congrate = false;    // The player win
  var counter = 0;        // How many wrong times player can do
  var randomWord;          // The random word
  var word;                // The random word with lowercase 
  var wordArr;             // Convert the word to array of letters
  var wordArrDashes;       // Array of dashes with same size of the missing word

  $('.start-btn').on('click', function(){
    $('.start').css('display','none');
    $('.play').css('display','block');
  });   
  $('.play-btn').on('click', function(){
    location.reload();
  });  
    
  // Real data from http://api.wordnik.com
  $.getJSON("http://api.wordnik.com/v4/word.json/forest/relatedWords?useCanonical=false&limitPerRelationshipType=1000&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function( data ) {
    var num1 = getRandomInt(0, data.length);
    var num2 = getRandomInt(0, data[num1].words.length);
    var randomWord = data[num1].words[num2];
    console.log(randomWord);
    word = randomWord.toLowerCase();
    wordArr = word.split("");
    wordArrDashes = fillArray("_", wordArr.length);
    wordArrDashes = fillSpaces(wordArrDashes, wordArr);
    for(var i=0; i<wordArrDashes.length; i++){
      $('.missed-word').append('<span>' + wordArrDashes[i] + '</span>');
    } 

    // By clicking Enter from the keyboard, the "Check" button will be clicked
    $('.input-letter').keypress(function (e) {
     var key = e.which;
     if(key == 13)  // the enter key code
      {
        $('#check-btn').click();
        return false;  
      }
    }); 
      
    $('#check-btn').on('click', function(){
      var letter = $('.input-letter').val();
        if(letter == ''){
          return;
        }
        var letterIn = letterInArray(wordArr, wordArrDashes, letter.toLowerCase());
        if(letterIn <= 0){
          ++counter;
          $('.body-part:eq('+counter+ ')').css('display','block');
          if(counter == 12){
            $('.game-over-img').css('display', 'block');
            $('.box').css('display', 'none');
            $(this).prop('disabled', true);
          }
        }

        $('.missed-word').empty();
        for(var i=0; i<wordArrDashes.length; i++){
          $('.missed-word').append('<span>' + wordArrDashes[i] + '</span>');
        }
        congrate = arraysEqual(wordArrDashes, wordArr);
        if(congrate == true){
          $('.congrate-img').css('display', 'block');
          $('.box').css('display', 'none');
          $('.game-over-img').css('display', 'none');
          $(this).prop('disabled', true);
        }
      });
    });
});

// Make array of dashes with same length of the word
function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

//Fill down all spaces if the word consists of two words
function fillSpaces(wordArrDashes, wordArr){
  for(var i = 0; i < wordArr.length; i++){
    if(wordArr[i] == ' '){
      wordArrDashes[i] = ' ';
    }
  }
  return wordArrDashes;
}

// Check if the letter in the array
function letterInArray(oldArr, newArr, letter){
  var inIt = 0;
  for(var i = 0; i < oldArr.length; i++){
    if(oldArr[i] == letter){
      newArr[i] = letter;
      ++inIt;
    }
  }
  return inIt;
}

// Check Two Arrays if they are same
function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
    return false;
  for(var i = arr1.length; i--;) {
    if(arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

// Get random number between selected range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max-1) - min + 1)) + min;
}

