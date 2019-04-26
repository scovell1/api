var correct = 0;
var questionArray = [];
var buttonArray = ["button1","button2","button3","button4"]
var currentQuestion;
var tempQuestionArray=[];

class QandA {
    constructor(question, correctAnswer, answerArray) {
        this.question = question;
        this.answers = answerArray;
        this.correctAnswer = correctAnswer;
    }
    getQuestion() {
        return `${this.question}`;
    }
    getAnswers() {
        return `${this.answers}`;
    }
    getCorrectAnswer() {
        return `${this.correctAnswer}`;
    }
    isAnswerCorrect(answer) {
        return `${this.getCorrectAnswer()}` == answer;
        //return currentQuestion.getCorrectAnswer() == answer;
    }
}
function loadQuestions(){
    const q1 = new QandA("Who is this","Barack Obama", ["Barack Obama","Madonna","Michael Jordan","Albert Einstein"]);
    const q2 = new QandA("Who is this","Michele Obama", ["Barack Obama","Michele Obama","Mia Hamm","Albert Einstein"]);
    const q3 = new QandA("Who is this","Lebron James", ["Barack Obama","Lebron James","Michael Jordan","Marie Curie"]);
    const q4 = new QandA("Who is this","Albert Einstein", ["Barack Obama","Lebron James","Albert Einstein","Marie Curie"]);
  
    return  [q1,q2,q3,q4];
}

function setupQuestions(){
    questionArray = loadQuestions();
    tempQuestionArray = loadQuestions();
}
function reset(){
    correct =0;
    setupQuestions();
    document.getElementById("numCorrect").innerHTML = correct;
    document.getElementById("progressBar").value = correct;
    document.querySelector("#imageHere").style.visibility='visible';
}

function nextQuestion(){
    if (tempQuestionArray.length != 0){
        currentQuestion = tempQuestionArray.splice(Math.floor(Math.random()*tempQuestionArray.length),1)[0];
        document.getElementById("questionText").innerHTML = currentQuestion.getQuestion();
        var tempButtonArray = buttonArray.slice(0);
        for (var i = buttonArray.length;i>0;i--){ //load buttons 
            currentButton = tempButtonArray.splice(Math.floor(Math.random()*i), 1);
            document.getElementById(currentButton).innerHTML = currentQuestion.getAnswers().split(",")[i-1];
        }
        sendApiRequest(currentQuestion.getCorrectAnswer().split(" "))
    }else{
        document.querySelector("#imageHere").style.visibility='hidden';
        if (correct == questionArray.length){document.getElementById("questionText").innerHTML= "You win!";
            }else{
        document.getElementById("questionText").innerHTML= "GAME OVER!";}
        setTimeout(function(){ 
        var answer = prompt("Play again (y/n)").toLowerCase();
        if (answer == "y"){
            reset();
            nextQuestion();
        }else{
            document.getElementById("questionText").innerHTML = "Good bye!";
    }
}, 3000);}
}

function buttonClick() {
    if ((currentQuestion.isAnswerCorrect(this.innerHTML))){
        correct++;
        document.getElementById("numCorrect").style.color = "green";
        document.getElementById("numCorrect").innerHTML = correct;
        document.getElementById("progressBar").value = correct;
    }else{
        document.getElementById("numCorrect").style.color = "red";}
        
    nextQuestion();
}

setupQuestions()
    document.getElementById("progressBar").max = tempQuestionArray.length;
    nextQuestion();
    var buttons = document.getElementsByClassName("answerButton");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', buttonClick, false);
}

async function sendApiRequest(person) {
    var name = person[0] + "+" + person[1];
    let getJSON = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=TR7JvKaI2dAZqkqXZXdjrfQBWDC244uE&q=${name}&limit=25&offset=0&rating=G&lang=en`);
    let gifs = await getJSON.json();
    let myURL = getURLs(gifs,Math.floor(Math.random()*15));
    addImageToScreen(myURL);
}

function addImageToScreen(myURL){
    console.log(myURL)
    //document.querySelector("#imageHere").innerHTML = ;
    document.querySelector("#imageHere").innerHTML = `<img src="${myURL}" alt ="fred">`;
    
}
function getURLs(JSONgifs,posNum){
    console.log(JSONgifs.data[posNum].images.original.url);
    return JSONgifs.data[posNum].images.original.url;
}
    

