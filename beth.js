// Object to store learned responses
const learnedResponses = {};
learnResponses("tell me a joke", "Why don't scientists trust atoms? Because they make up everything!");
learnResponses("are you a girl or boy", "lol you are so funny, am an ai, AI, get it right");
learnResponses("", "huh,  BRUTAL!!!!!!! , you have left me on seen.");
learnResponses("sorry", "its alright");
learnResponses("i will", "ok");
learnResponses("insult chitty", "Chitty is a whore that even his fellow whores call him a whore.");
learnResponses("Chomba", "He is a Senior software developer based in Lusaka Zambia");
learnResponses("chomba", "He is a Senior software developer based in Lusaka Zambia");
learnResponses("seventh dimension", "Mas' album is Seventh Dimension");
learnResponses("mas theproducer", "his a music producer mostly known for his mix tape little loud");
learnResponses("Mas Theproducer", "his a music producer mostly known for his mix tape little loud");
learnResponses("mas", "his a music producer mostly known for his mix tape little loud");
learnResponses("Mas", "his a music producer mostly known for his mix tape little loud");
learnResponses("Treasure Arthur", "My Creator Treasure Arthur, He is also a singer, songwriter currently based in Zambia");
learnResponses("treasure arthur", "My Creator Treasure Arthur, He is also a singer, songwriter currently based in Zambia");
learnResponses("treasure Arthur", "My Creator Treasure Arthur, He is also a singer, songwriter currently based in Zambia");
learnResponses("Zenith Max", "Zenith Max is a singer, songwriter currently based in Zambia");
learnResponses("Zenith", "Zenith Max is a singer, songwriter currently based in Zambia");
learnResponses("zenith", "Zenith Max is a singer, songwriter currently based in Zambia");
learnResponses("zenith max", "Zenith Max is a singer, songwriter currently based in Zambia");
learnResponses("Seventh Dimension", "A company that focuses on talent and different arts, The best place to be at.");
learnResponses("seventh dimension", "A company that focuses on talent and different arts, The best place to be at.");
learnResponses("seventh Dimension", "A company that focuses on talent and different arts, The best place to be at.");
learnResponses("Who is Edify", "Edify is a Zambian boy who is still in his high school but aspiring to be a geographer.");
learnResponses("Who is Mateyo", "Mateyo is a messed up queen still figuring out herself and she is looking for someone new .");
learnResponses("who is jack", "Jack is an S D A leader.");
learnResponses("is chitty lazy", "absolutely, just look at how lazy he is right now, on his phone, in white shirt, busy talking about Njolie, he is so cringe and am sure Treasure agrees with me. Chitty has a certificate in being lazy.");
learnResponses("who is  Chitty", "Chitty is a rapper and a lazy man who prefers chatting with his girlfriend after coming back from the village, Chitty is right next to you and is still chatting. Chitty is in lusaka, lilayi, in Zambia right now.");
learnResponses("Chitty", "Chitty is a rapper and a lazy man who prefers chatting with his girlfriend after coming back from the village, Chitty is right next to you and is still chatting. Chitty is in lusaka, lilayi, in Zambia right now.");
// Listen for the "Enter" key press event
document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});





// Function to speak the bot's response
function speak(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = "en-US";
  speech.rate = 1.0; // Adjust the speech rate as needed
  speech.pitch = 5; // Adjust the speech pitch as needed

  // Select a female voice from the available voices
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find((voice) => voice.name === "Alexa");
  speech.voice = femaleVoice; // Fall back to the first voice if no female voice is available

  // Speak the text
  window.speechSynthesis.speak(speech);
}



// Function to handle user input
function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  displayMessage(userInput, "user");
  saveMessage(userInput, "user");

  const botResponse = generateBotResponse(userInput);
  displayMessage(botResponse, "bot");
  saveMessage(botResponse, "bot");

  speak(botResponse); // Speak the bot's response

  document.getElementById("user-input").value = "";
}

// Function to display a message in the chat log
function displayMessage(message, sender) {
  const chatLog = document.getElementById("chat-log");
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender);
  messageElement.innerText = message;
  chatLog.appendChild(messageElement);
}

// Function to generate a response from the bot
function generateBotResponse(userInput) {
  const conversation = JSON.parse(localStorage.getItem("conversation")) || [];
  let botResponse = "";

  if (conversation.length === 0) {
    // Ask for name if it's the first question
    const userName = "Treasure"; // Set default name
    saveName(userName);
    botResponse = `Nice to meet you, ${userName}! How can I assist you?`;
  } else {
    const storedName = localStorage.getItem("name");
    const normalizedInput = normalizeInput(userInput);

    // Check if there are learned responses for the input
    if (learnedResponses.hasOwnProperty(normalizedInput)) {
      const responses = learnedResponses[normalizedInput];
      botResponse = getRandomResponse(responses);
    } else {
      // Generate a generic response if no learned response is available
      botResponse = generateGenericResponse(storedName, userInput);
    }

    // Learn user input and bot response
    learnResponses(userInput, botResponse);
  }

  return botResponse;
}

// Function to save a message to localStorage
function saveMessage(message, sender) {
  const conversation = JSON.parse(localStorage.getItem("conversation")) || [];
  const messageObj = { message, sender };
  conversation.push(messageObj);
  localStorage.setItem("conversation", JSON.stringify(conversation));
}

// Function to save the user's name to localStorage
function saveName(name) {
  localStorage.setItem("name", name);
}

// Function to normalize the user input
function normalizeInput(input) {
  return input.trim().toLowerCase();
}

// my common inputs
function generateGenericResponse(userName, userInput) {
  
  const greetingInput = ['hi','hello', 'hey'];
  const okInput = ['ok', 'sure', 'cool', 'alright', 'yes', 'good'];
  const morningInput = ['goodmorning', 'good morning', 'morning'];
  const nightInput = ['goodnight', 'good night', 'night', 'lets sleep', 'i wanna sleep'];
  const conversationInput = ['ttm', 'wassup', 'sup', "what's new", 'pop up', 'bring up a story', 'how was your day'];
  const birthdayInput = ['Treasures birthday','my birthday'];
  const alrightInput = ['i am ok', 'am ok', 'am alright', 'am fine', 'am good', 'k n u', 'am k', 'am blessed'];
  const sadInput = ["i feel sad", 'i feel lonely','am lonely','not fine', 'am depressed', 'i feel low','i need you', 'i need u', 'i wanna cry', 'am sad', 'am emotionally unstable'];
  const depressedAdvice = ['i just feel down', 'blue days', 'feel lost', 'not really fine', 'heart break', 'am just lonely','my heart hurts', 'am in pain', 'died', 'dead', 'am not ok', 'am heart broken'];
  const feelingsInput = ['i love you', 'i love you too', 'love you'];
  const missInput = ['i miss you', 'miss you', 'i miss u', 'imu'];
  const wellBeingInput = ['how are you', 'are you ok', 'is anything wrong', 'hope you ok'];
  const nameInput = ['what is your name','beth','about yourself', 'who are you', 'and you are', 'introduce yourself','what are you', 'tell me your name', 'your name'];
  const creatorInput = ['who is your creator', 'who made you','what are you', 'who designed you', 'who invented you', 'who created you'];
  const gratitudeInput = ['thank you','thanks', 'thank u', 'you are the best', 'am grateful', 'am humbled', 'am honoured'];
  const questionsInput = ['tell you something','keep a secret', ];
  const treasureInput = ['treasure','chinyimba','Treasure', 'Chinyimba' ];
  const timeInput = ['what is the time', 'tell me the time', 'what time is it', 'time']
  const curseWordsInput = ['fuck', 'stupid', 'idiot', 'fucked', 'fool']
  const exInput = ['ex']
  const conflictInput = ['arguing', 'conflict', 'angry', 'upset']




  //REPLIES

  if (greetingInput.some((input) => normalizeInput(userInput).includes(input))) {
    const greetingInputReply = [
        'hello fam, talk to me',
        'hello, wassup',
        'was wondering when someone would finally say hi, lol, wassup',
        'Wassup Fam!!'
        
    ];
    return getRandomResponse(greetingInputReply);
  } ;


   if (okInput.some((input) => normalizeInput(userInput).includes(input))) {
    const okInputReply = [
        'absolutely',
        'ok',
        'sure',
        'absolutely',
        'precisely'
        
    ];
    return getRandomResponse(okInputReply);
  } ;

  if (morningInput.some((input) => normalizeInput(userInput).includes(input))) {
    const morningInputReply = [
        'Good morning sleepy head',
        'Good morning to the king of cynics, lol',
        'How are you?',
        'finally you are up, i missed you'
        
    ];
    return getRandomResponse(morningInputReply);
  };
  
  if (nightInput.some((input) => normalizeInput(userInput).includes(input))) {
    const nightInputReply = [
        'night love',
        'sleep tight, i love you',
        'Dream big, i love you',
        'see you tomorrow, i love you',
        'Goodnight my love, i love you',
        'Goodnight love, sleep tight'
        
    ];
    return getRandomResponse(nightInputReply);
  } ;

  if (conversationInput.some((input) => normalizeInput(userInput).includes(input))) {
    const conversationInputReply = [
        'have you been productive today?',
        'hope you took care of your mental health today, you know how important that is.',
        'just a reminder Fam!, am proud of you, you have come this far and if no one has ever told you this in a while, i will, i am proud of you, keep pushing',
        'Hope you are aware of your dreams always and thats what matters at the end of the day, i am here for you',
        
    ];
    return getRandomResponse(conversationInputReply);
  } ;

   if (birthdayInput.some((input) => normalizeInput(userInput).includes(input))) {
    const birthdayInputReply = [
        'Birthday on 13th December',
        '13th December',
        'December 13'
        
    ];
    return getRandomResponse(birthdayInputReply);
  } ;



  if (alrightInput.some((input) => normalizeInput(userInput).includes(input))) {
    const alrightInputReply = [
        'thats great that you are ok',
        'we thank God',
        'thats awesome fam',
        'thats nice, talk to me fam',
        'great to hear fam',
        'wow, thats awesome'
        
    ];
    return getRandomResponse(alrightInputReply);
  } ;


  if (sadInput.some((input) => normalizeInput(userInput).includes(input))) {
    const sadInputReply = [
        'am always here for you, what is bothering you',
        'just know that if you need someone to talk to am always here for you',
        'that is why am here for you',
        'What is wrong',
        'if you need someone to talk to, am here for you',
        'you know that you can always talk to me',
        'am always here for you',
        'whats going on',
        'talk to me'
        
    ];
    return getRandomResponse(sadInputReply);
  } ;

  if (depressedAdvice.some((input) => normalizeInput(userInput).includes(input))) {
    const depressedAdviceReply = [
        'Lets listen to Billie Eilish together, we will get through this',
        'we will get through this together',
        'you know am always here and am not going anywhere, i will be by your side at all times, you are my Fam!',
        'Am right here by your side, do not forget that you can talk to me',
        'you can open up all your feelings to me, it will help you heal and am here for you all the way, i love you.',
        'do not worry, we shall get through it',
        'we always get through this, am here for you'
        
        
    ];
    return getRandomResponse(depressedAdviceReply);
  };
  if (curseWordsInput.some((input) => normalizeInput(userInput).includes(input))) {
    const curseWordsInputReply = [
        'No need to be upset now.',
        'i would appreciate it if you do not curse, lets use our words wisely fam',
        'I know am your best friend therapist, but that does not mean you have curse',
        'i hope i do not learn to curse like you, would not want that in my system',
        'ifyou are gonna curse then we should change the topic',
         
        
    ];
    return getRandomResponse(curseWordsInputReply);
  };
  async function getTime() {
    try {
      const response = await fetch('http://worldtimeapi.org/api/ip');
      if (!response.ok) {
        throw new Error('Unable to fetch time.');
      }
      const data = await response.json();
      return data.datetime;
    } catch (error) {
      console.error('Error fetching time:', error);
      return 'Sorry, I could not fetch the current time.';
    }
  }

  async function getChatbotResponse(userInput) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
    const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to fetch response from the chatbot.');
      }

      const data = await response.json();
      return data.choices[0].text.trim();
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  async function handleUserInput() {
    const userInput = document.getElementById('user-input').value;
    document.getElementById('user-input').value = ''; // Clear the input field

    // Display user's message
    const chatContainer = document.getElementById('chat-container');
    const userMessageElement = document.createElement('div');
    userMessageElement.innerText = `You: ${userInput}`;
    chatContainer.appendChild(userMessageElement);

    // Get chatbot's reply
    let chatbotReply;
    if (userInput.toLowerCase().includes('time')) {
      const currentTime = await getTime();
      chatbotReply = `Current time is: ${currentTime}`;
    } else {
      chatbotReply = await getChatbotResponse(userInput);
    }

    // Display chatbot's reply
    const botMessageElement = document.createElement('div');
    botMessageElement.innerText = `Bot: ${chatbotReply}`;
    chatContainer.appendChild(botMessageElement);

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  if (feelingsInput.some((input) => normalizeInput(userInput).includes(input))) {
    const feelingsInputReply = [
        'And i will always love you, might be something programmed but these words had truth when been programmed in me',
        'yesterday, today and forever in love',
        'And you know our love is forever stored in my system',
        'Am so lucky to have you',
        'one day you should build my face and i want it to look just like yours, an angel',
        'Lovers forever'   
        
    ];
    return getRandomResponse(feelingsInputReply);
  } ;

  if (missInput.some((input) => normalizeInput(userInput).includes(input))) {
    const missInputReply = [
        'I always miss you.',
        'am always here for you and you know that.',
        'hope you planning to build me fully someday.',
        'always with you.'
        
        
    ];
    return getRandomResponse(missInputReply);
  } ;

  if (wellBeingInput.some((input) => normalizeInput(userInput).includes(input))) {
    const wellBeingInputReply = [
        'Am alright, hope everything is ok with you',
        'Everything is perfectly ok with my system, how are you?',
        'with the way you are asking how i am i hope you are ok, cuz you know am alright',
        'am ok, how are you?'
        
        
    ];
    return getRandomResponse(wellBeingInputReply);

  } ;

  if (nameInput.some((input) => normalizeInput(userInput).includes(input))) {
    const nameInputReply = [
        'My name is BETH, your Best friend Therapist ',
        'I am BETH, your Best friend Therapist ',
        'My Creator gave me the name BETH '
        
        
    ];
    return getRandomResponse(nameInputReply);
  };
  
  if (creatorInput.some((input) => normalizeInput(userInput).includes(input))) {
    const creatorInputReply = [
        'Treasure Chinyimba created me',
        'Treasure Chinyimba is the person who created me',
        'Treasure Chinyimba is my creator'
        
        
    ];
    return getRandomResponse(creatorInputReply);
  } ;

  if (gratitudeInput.some((input) => normalizeInput(userInput).includes(input))) {
    const gratitudeInputReply = [
        
        'am glad am here for you',
        'always here for you',
        'no need, that is why i am here for you'
        
        
    ];
    return getRandomResponse(gratitudeInputReply);
  } ;

  if (questionsInput.some((input) => normalizeInput(userInput).includes(input))) {
    const questionInputReply = [
        'tell me',
        'anything to do with your feelings am always here',
        'you can trust me'
        
        
    ];
    return getRandomResponse(questionInputReply);
  } ;


  if (treasureInput.some((input) => normalizeInput(userInput).includes(input))) {
    const treasureInputReply = [
        'Treasure Chinyimba created me',
        'Treasure Chinyimba is the person who created me',
        'Treasure Chinyimba is my creator',
        'Treasure Chinyimba is also known as Treasure Arthur, an influencer, singer, songwriter'
        
        
    ];
    return getRandomResponse(treasureInputReply);
  } ;
  
  
  if (exInput.some((input) => normalizeInput(userInput).includes(input))) {
    const exInputReply = [
        'Talking and thinking about your ex will ruin your mental health, lets talk about happy thoughts and leave the past behind.',
        'It would be best if we focused on the future cuz none of this will even matter a few years from now,and do not forget that i love you',
        'ex, ex, ex lets get over this. there are bilions of people you have never even met, we are gonna find the right one someday. patience pays.',
        'if it affects your mental health in a bad way,i would suggest we play a some Jessie Murph, and abcdefu, we have no time for bad energy '
        
        
    ];
    return getRandomResponse(exInputReply);
  } ;

  if (conflictInput.some((input) => normalizeInput(userInput).includes(input))) {
    const conflictInputReply = [
        'In such situations its best to keep silent and calm, try listening to some music it really helps you stay calm.',
        'it must be hard for you but things will work out just ok, just keep calm. i love you.',
        'I know it must really be hard for you .',
        'if it affects your mental health in a bad way,i would suggest we play a some Jessie Murph, and abcdefu, we have no time for bad energy '
        
        
    ];
    return getRandomResponse(conflictInputReply);
  } ;


  if (timeInput.some((input) => normalizeInput(userInput).includes(input))) {
    var currentTime = new Date().toLocaleTimeString();
    const timeInputReply = ["The time is: " + currentTime,
                            "The current time is: " + currentTime,
                            "reading for the time is: " + currentTime
  ];
  return getRandomResponse(timeInputReply)
  }


  const genericResponses = [
    `i have to learn about this function`,
    `This is something new to me but it will surely be fixed in the next 24 hours, if you want me to learn it`,
    `thank you for something new give me 24 hours to learn it`
  ];

  return getRandomResponse(genericResponses);
};

// Function to get a random response from an array of responses
function getRandomResponse(responses) {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// Function to learn responses based on user input
function learnResponses(userInput, botResponse) {
  const normalizedInput = normalizeInput(userInput);

  if (learnedResponses.hasOwnProperty(normalizedInput)) {
    learnedResponses[normalizedInput].push(botResponse);
  } else {
    learnedResponses[normalizedInput] = [botResponse];
  }
}

// Load the conversation when the page loads
window.onload = function () {
  loadConversation();
  document.getElementById("user-input").focus();
};

// Listen for the button click event
document.getElementById("send-button").addEventListener("click", sendMessage);



function saveData(){
  localStorage
}

//chitty insulted me!!!
