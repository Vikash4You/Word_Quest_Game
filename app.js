const words = [
    "Elephant",
    "Paris",
    "Mango",
    "India",
    "Sachin Tendulkar",
    "Albert Einstein",
    "Giraffe",
    "New York",
    "Banana",
    "Brazil",
    "Virat Kohli",
    "Marie Curie"
];

const hints = [
    "Largest land Animal",
    "Capital of France",
    "King of Fruits",
    "Country known for its diverse culture",
    "Legendary Indian Cricketer",
    "Famous physicist who developed the theory of Relativity",
    "Tallest land Animal",
    "The Big Apple, USA",
    "A long, curved fruit",
    "Country famous for its Amazon rainforest and football",
    "Indian cricketer known for his aggressive batting",
    "Renowned scientist who discovered Radioactivity"
];


let displayWord = "";
let correctAnswers = 0;
let incorrectAnswers = 0;
let audio = document.getElementById('music');
audio.play();

function displayInfo(){
    document.getElementById('InfoCard').style.display = 'flex';
}

function closeInfo() {
    document.getElementById('InfoCard').style.display = 'none';
}

function shuffle(str) {
    let strArray = Array.from(str);
    for (let i = 0; i < strArray.length - 1; ++i) {
        let j = Math.floor(Math.random() * strArray.length);
        let temp = strArray[i];
        strArray[i] = strArray[j];
        strArray[j] = temp;
    }
    return strArray.join(" ");
}

function check() {
    let input = document.getElementById("input").value.toLowerCase();
    let output = document.getElementById("output");
    if (input === "") {
        Swal.fire({
            icon: 'warning',
            title: 'No Input!',
            text: 'Please enter something before submitting.',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById("input").focus();
        });
        return;
    }
    if (input === displayWord.toLowerCase()) {
        correctAnswers++;
        output.innerHTML = "Result: Correct";
        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'You guessed the word correctly!',
            confirmButtonText: 'OK'
        }).then(() => {
            Next();
            document.getElementById("input").focus();
        });
    } else {
        incorrectAnswers++;
        output.innerHTML = "Result: Incorrect";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your answer is incorrect!',
            confirmButtonText: 'Try Again'
        }).then(() => {
            document.getElementById("input").focus();
        });
    }
    document.getElementById("input").value = '';
}

function showAnswer() {
    let input = document.getElementById("input").value.toLowerCase();
    if (input == "") {
        // If the input is empty, show a SweetAlert
        Swal.fire({
            icon: 'warning',
            title: 'No Input!',
            text: 'Please enter something before requesting the answer.',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById("input").focus();  // Automatically focus on the text box
        });
       
    }else  {
        // Show the correct answer
        Swal.fire({
            icon: 'info',
            title: `Answer is "${displayWord}"`,
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById("input").focus();  // Automatically focus on the text box
        });
}}

function Next() {
    let index = Math.floor(Math.random() * words.length);
    displayWord = words[index];
    let displayHint = hints[index];
    let scrambleWord = document.getElementById("scrambleWord");
    scrambleWord.innerText = shuffle(displayWord).toUpperCase();
    let hint = document.getElementById("hint");
    hint.innerHTML = "<b>Hint:</b> " + displayHint;
    document.getElementById("output").innerText = "Result:";
    document.getElementById("input").value = '';
}

function endGame() {
    Swal.fire({
        icon: 'info',
        title: 'Game Over!',
        html: `<p>Your Score:</p>
               <p>Correct Answers: ${correctAnswers}</p>
               <p>Incorrect Answers: ${incorrectAnswers}</p>`,
        confirmButtonText: 'Play Again'
    }).then(() => {
        correctAnswers = 0;
        incorrectAnswers = 0;
        Next();
    });
}

// Initialize the game
Next();