var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),

    hasCorrectInput,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,

    unkwnCommReaction = "I didn't get that.",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    // This makes it so there is no mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 0) {
    createBubble(input)
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}

var checkInput = function(input) {
  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput
  for(var textVal in possibleInput){
    //If user reacts with "yes" and the previous input was in textVal
    if(input == "yes" || input.indexOf("yes") >= 0){
      if(previousInput == textVal) {
        console.log("xxx");

        isReaction = true;
        hasCorrectInput = true;
        botResponse(textVal);
      }
    }
    if(input == "no" && previousInput == textVal){
      unkwnCommReaction = "For a list of commands type: Commands";
      unknownCommand("My bad :(  Let's try again")
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }
    //Is a word of the input also in possibleInput object?
    if(input == textVal || input.indexOf(textVal) >=0 && isReaction == false){
			console.log("success xxx");
      hasCorrectInput = true;
      botResponse(textVal);
		}
	}
  //When input is not in possibleInput
  if(hasCorrectInput == false){
    console.log("failed xxx");
    unknownCommand(unkwnCommReaction);
    hasCorrectInput = true;
  }
}

// debugger -- kinda 

function botResponse(textVal) {
  //sets previous input to what was called
  // previousInput = input;

  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');

  if(isReaction == true){
    if (typeof reactionInput[textVal] === "function") {
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
  }

  if(isReaction == false){
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
       console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput(); // pushes it through 

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;
  animationCounter = 1;
}

function responseText(e) {
  var response = document.createElement('li');
  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;
  chatList.appendChild(response);
  animateBotOutput();
  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)
}


//This loop changes it when you hit enter (e) 
function animateBotOutput() {
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}
function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
}

var hi = ['hi','howdy','hello','hey'];
const greetings = ['hi','howdy','hello','hey'];

var possibleInput = {
  "help" : function(){
    responseText("You can type a command in the chatbox")
    commandReset(0);
    return
    },
  "hi" : function(){
    responseText(hi[Math.floor(Math.random()*(hi.length))])
    commandReset(1);
    return
    },  
  "food" : function(){
    responseText("Let's find a place to eat!");
    responseText("This is one of my favs: <a href='https://www.salweenthai.com/'>Salween Thai</a>");
    responseText("Would you like to see more? (Yes/No)")
    commandReset(2);
    return
    },
  "about" : function(){
    responseText("This project was designed with html, css and javascript");
    responseText("Would you like to know more? (Yes/No)");
    commandReset(3);
    return
    },
  "commands" : function(){
    responseText("This is a list of commands I know:");
    responseText("help, about, one, two, ...");
    commandReset(4);
    return
  },
  "it going" : function(){
    responseText("good, are you well?");
    commandReset(5);
    },
}

var reactionInput = {
  "food" : function(){
    responseText("On this page you'll find a list of my favorite places to eat in Omaha");
    responseText("<a class='fakeButton' href='https://www.google.com/search?q=omaha+food+%3A%29&ei=-B_eYLj6KuKmqtsP25W80AQ&oq=omaha+food+%3A%29&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yCQgAEMkDEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjoHCAAQRxCwAzoHCAAQsAMQQzoQCC4QxwEQrwEQsAMQyAMQQzoQCC4QxwEQowIQsAMQyAMQQzoKCC4QsAMQyAMQQzoCCAA6BQgAEMkDOgQIABBDSgUIOBIBMUoECEEYAFD-C1jeE2DMFWgBcAJ4AIABZogBwwKSAQMzLjGYAQCgAQGqAQdnd3Mtd2l6yAENwAEB&sclient=gws-wiz&ved=0ahUKEwi41uLa1cLxAhVik2oFHdsKD0oQ4dUDCA4&uact=5'>Click here!</a>")
    animationCounter = 2; // the num links it to the first message before the y/n 
    return
  },
  "about" : function(){
    responseText("more about this project here");
    animationCounter = 3;
    return
    },
  "it going" : function(){
    responseText("What can I help you with today?");
    animationCounter = 5; // the num links it to the first message before the y/n 
    return
    }
}
