// get elements from html
let spanlvl = document.querySelector(".massage .level");
let spansecond = document.querySelector(".massage .seconds");
let startbtn = document.querySelector(".startbtn");
let targetword = document.querySelector(".targetword");
let input = document.querySelector(".input");
let thewords = document.querySelector(".thewords");
let spanTleft = document.querySelector(".control .Tleft");
let spanscore = document.querySelector(".control .gotscore");
let spantargetscore = document.querySelector(".control .targetscore");
let divfinish = document.querySelector(".finish");
let scoresul = document.querySelector(".scores ul");
let myselect = document.querySelector("select");



// array of scores
let scores =[];

// check the values in local storage for(scores) (slove the roload problem)
if(window.localStorage.getItem("scores")) {
    scores = JSON.parse(window.localStorage.getItem("scores"));
    // save in local storage
    savescoreinlocals(scores);
    // show in div of pervious scores
    showscores(scores);
}

// array of all worlds
let words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "City",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Web",
    "Paradigm",
    "Styling",
    "Cascade",
    "Facebook",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
]

//object for each level and time required
let details = {
    "Easy":5,
    "Normal":3,
    "Hard":2,
}


// set default value for level and time (Normal level) 
// myselect.value="Normal" value for first option in select
let defaultLevel = myselect.value;
let devaulsecondsLevel = details[defaultLevel]; 
spansecond.innerHTML = devaulsecondsLevel;
spanTleft.innerHTML = devaulsecondsLevel;

spantargetscore.innerHTML = words.length;

// choose the level (لازم مكانها هنا عشان لما يحصل اختيار لل level يحصل overwrite علي ال default level (normal))
myselect.addEventListener("change" , function () {
    let selectLevel = myselect.value;
    let selectLevelSecods = details[selectLevel];
    spanTleft.innerHTML = selectLevelSecods;
    spansecond.innerHTML = selectLevelSecods;
});


// disapled paste on input
input.onpaste = function() {
    return false;
}

// when click in start button
startbtn.onclick = function () {
    //remove srtart button
    this.remove();
    //focus in input automatic
    input.focus();
    //go to function get the random function from array
    getword();
}

function getword() { 
    // get the random world from array worlds
    let woredrandom = words[Math.trunc(Math.random()*words.length)];
    // show the random world in targetworld di
    targetword.innerHTML = woredrandom;
    // remove random world from array worlds
    let randomwordindex = words.indexOf(woredrandom);
    words.splice(randomwordindex , 1);

    // show new array worlds in theworlds div
    thewords.innerHTML=""; // عشان كل ما يجي يضيف ميضفش علي الموجود

    words.forEach((word) => {
        // create div to each world in array
        let div = document.createElement("div");
        let divtext = document.createTextNode(word);
        div.appendChild(divtext);
        thewords.appendChild(div);
    });

    // go to function startgame
    startgame();
}

function startgame () {
    spanTleft.innerHTML = spansecond.innerHTML;
    let Counter = setInterval (() => {
        // decrease the time left untial 0
        spanTleft.innerHTML--;

        if(spanTleft.innerHTML === "0") {
            clearInterval(Counter);

            // when reach to 0 , check the value in input is equal to targetworld or not
            if(input.value.toLowerCase() === targetword.innerHTML.toLowerCase()) {
                // empty input value
                input.value ="";
                // increase the span score 
                spanscore.innerHTML++;
            
                // call getworld() to apper another target word : first check if there words in array or not
                if (words.length > 0) {
                    getword();
                }
                else {
                    // then is finish and successful
                    let goodspan = document.createElement("span");
                    goodspan.classList.add("good");
                    goodspan.appendChild(document.createTextNode("Good, Congrats"));
                    divfinish.appendChild(goodspan);

                    scores.push({"score":`${spanscore.innerHTML} "Win"` , "level":myselect.value});
                    savescoreinlocals(scores);
                    // showscores(scores);
                    showscores(scores);
                }
            } 
            else {
                // the value in input is not equal to targetworld game is stoped
                let badspan = document.createElement("span");
                badspan.classList.add("bad");
                badspan.appendChild(document.createTextNode("Sorry! Game Over"));
                divfinish.appendChild(badspan);

                scores.push({"score":spanscore.innerHTML , "level":myselect.value});
                savescoreinlocals(scores);
                // showscores(scores);
                showscores(scores);
            }
            
        }

    },1000)
}

// save score in local stoeage
function savescoreinlocals (scorearr) {
    window.localStorage.setItem("scores",JSON.stringify(scorearr));
}

// show scores in page
function showscores (scores) {
    scoresul.innerHTML="";
    scores.forEach((score) => {
        let li = document.createElement("li");

        let spanone = document.createElement("span");
        let spantwo = document.createElement("span");
        spanone.appendChild(document.createTextNode(score["score"]));
        spantwo.appendChild(document.createTextNode(score["level"]));
        li.appendChild(spanone);
        li.appendChild(spantwo);

        scoresul.appendChild(li);
    })
}
