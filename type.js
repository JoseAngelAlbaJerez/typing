

let count = 60;
let timer;
let mistakes = 0;
let quote = "";

const userInput = document.getElementById("textarea");

function startCounter() {
    mistakes = 0;
    timer = "";
   
    let currentCount = count;
    $("#textarea").attr('disabled', false);
    timer = setInterval(function() {
        document.getElementById('counter').textContent = "Time: "+currentCount + "s";
        

        if (currentCount === 0) {
            clearInterval(timer);
        } else {
            currentCount--;
        }
    }, 1000);
}

//Logic for comparing input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    //Create an arrat from received span tags
    quoteChars = Array.from(quoteChars);
    //array of user input characters
    let userInputChars = userInput.value.split("");
    //loop through each character in quote
    quoteChars.forEach((char, index) => {
      //Check if char(quote character) = userInputChars[index](input character)
      if (char.innerText == userInputChars[index]) {
        char.classList.add("success");
      }
      //If user hasn't entered anything or backspaced
      else if (userInputChars[index] == null) {
        //Remove class if any
        if (char.classList.contains("success")) {
          char.classList.remove("success");
        } else {
          char.classList.remove("fail");
        }
      }
      //If user enter wrong character
      else {
        //Checks if we alreasy have added fail class
        if (!char.classList.contains("fail")) {
            mistakes += 1;
            char.classList.add("fail");
        }
        document.getElementById("mistakes").innerText = "Mistakes: "+ mistakes;

      }
      //Returns true if all the characters are entered correctly
      let check = quoteChars.every((element) => {
        return element.classList.contains("success");
      });
      //End test if all characters are correct
      if (check) {
        displayResult();
      }
    });
  });

  const displayResult = () => {
   
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (count != 0) {
        timeTaken = (100 - count) / 60;

    }
    document.getElementById("wpm").innerText =
    ((userInput.value.split(' ').length) / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText =
      Math.round(
        ((userInput.value.length - mistakes) / userInput.value.length) * 100
      ) + " %";

      const resultContent = document.querySelector(".result").innerHTML;

   
    swal.fire({
        title: 'Result',
        html: resultContent,
        showCancelButton: false,
        showConfirmButton: false,
    });
  };


document.getElementById("start").addEventListener("click", function() {
    clearInterval(timer);
    startCounter();
});

document.getElementById("stop").addEventListener("click", function() {
    clearInterval(timer);
    $("#textarea").attr('disabled', true);
});






const colorPicker = document.querySelector("#color-picker");

colorPicker.addEventListener("input", updateFirst, false);
colorPicker.addEventListener("change", watchColorPicker, false);

function updateFirst(event) {

  console.log("Color updated:", event.target.value);
}

function watchColorPicker(event) {
  document.querySelectorAll("button").forEach((button) => {
    button.style.backgroundColor = event.target.value;
    button.style.filter = "brightness(80%)";
    userInput.style.backgroundColor = event.target.value;
    userInput.style.filter = "brightness(80%)"; 
    document.body.style.backgroundColor = event.target.value;
    
    if (document.body.classList.contains("success")) {
   
      document.querySelector(".success").style.color = event.target.value;
      document.querySelector(".success").style.filter = "brightness(80%)";
    }
  });
}




window.onload = function() {
    newquote();
  };
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";


const newquote = async () => {
    const response = await fetch(quoteApiUrl);

    let data = await response.json();
    
    quote = data.content;

    let array = quote.split('').map(value => {
        return "<span class='quote-chars'>" + value + "</span>";
    });

    quotespace = document.getElementById("typewriter");
    quotespace.innerHTML += array.join(""); 
   
}


let typeWriter = function(){
    let i = 0;
    let speed = 50; 
    let fn = function(){
        if(i < quotespace.innerText.length){
            quotespace.innerHTML = quotespace.innerText.substring(0, i) + '<span aria-hidden="true"></span>'+
            quotespace.innerText.substring(i, i+1);
            i++;
            }else{
                setTimeout(function(){
                    quotespace.className = 'fade';
                    quotespace.innerHTML = quotespace.innerText;
                    quotespace.className = '';
                    newquote();
                    }, 750);
                    }
                    };
                    timer = setInterval(fn, speed);
                    };

