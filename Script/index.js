// @ts-check
// import Customdialog from './customdialog.js'

// function loadHandler () {
//     let element = document.getElementById("Alert");
//     // document.write("hello");
//     // alert("helllllo")
//     element.addEventListener('click', clickHandler);
// }

// function clickHandler () {
//     alert("clicked");
// }

// loadHandler();
// window.addEventListener('DOMContentLoaded'.loadHandler);

let alertEle = document.getElementById('Alert');
let confirmEle = document.getElementById('Confirm');
let promptEle = document.getElementById('Prompt');
let saferEle = document.getElementById('Safer');
let confirmAnswerEle = document.getElementById('aConfirm');
let promptAnswerEle = document.getElementById('aPrompt');
let safeAnswerEle = document.getElementById('sAPrompt');


const namePattern = /^[A-Za-z\x]+$/;
// alert(alertEle?.nodeName);
// alert(confirmEle?.nodeName);
// alert(saferEle?.nodeName);
//alert(promptAnswerEle?.nodeName);
// alert(confirmAnswerEle?.nodeName)
// alert(safeAnswerEle?.nodeName);

function loadHandler () {

    alertEle?.addEventListener('click', () => {
        alert('Alert button clicked!')
    })

    confirmEle?.addEventListener('click', () => {
        let answer = confirm('Would you like to continue?');
        if (answer) {
            confirmAnswerEle.innerHTML = `The value returned by the confirm method is : ${answer}`;

            // alert("User confirmed!")
        } else {
            confirmAnswerEle.innerHTML = `User canceled`;
            // alert("User canceled!")
        }
    })

    promptEle?.addEventListener('click', () => {
        let answer = prompt('Enter your name:');
        // if (namePattern.test(answer)) {
        if (answer !== null && answer !== "") {
            promptAnswerEle.innerText = `User's first name is ${answer}`;
            // alert(`User's name is ${answer}.`)
        } else {
            promptAnswerEle.innerHTML = `User didn't enter anything!`
        }
        // }
    })

    saferEle?.addEventListener('click', () => {
        let answer = prompt("Enter your last name:");
        let cAnswer = DOMPurify.sanitize(answer);
        if (cAnswer !== null && cAnswer !== "") {
            safeAnswerEle.innerText = `User's last name is ${cAnswer}`;
            // alert(`User's name is ${answer}.`)
        } else {
            safeAnswerEle.innerHTML = `User didn't enter anything!`
        }
    })
}

// Customdialog()
//     .then(() => {
//         console.log('Dialog closed.');
//     })
//     .catch((err) => {
//         console.log(err);
//     })





// oadHandler();
window.addEventListener('DOMContentLoaded', loadHandler)


