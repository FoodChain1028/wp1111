const ATTENDER_NUM = 6;
const YOUR_NAME = "你";
let isPinned = true;

// when user press the cancel button on the aud., the aud. will be cancelled
let cancelBtns = document.querySelectorAll('#cancelBtn');
let mainChar = document.getElementById('left');
let audiences = document.getElementById('right');
let accountNum = ATTENDER_NUM
Array.from(cancelBtns).forEach(function(cancelBtn){
    cancelBtn.addEventListener('click', function(e) {
        const audBox = e.target.parentElement.parentElement.parentElement;    
        audBox.parentNode.removeChild(audBox);
        accountNum -= 1;
        if (accountNum === 1) {
            mainChar.style.width = '100%';
            audiences.style.width = '0%';
        }
    });
});


// pin sb on the main screen
let pinBtns = document.querySelectorAll('#pinBtn');
Array.from(pinBtns).forEach(function(pinBtn){
    pinBtn.addEventListener('click', function(e) {
        const audBox = e.target.parentElement.parentElement.parentElement.parentElement;
        const audience = document.getElementById('audience'); 
        if (isPinned) {

            let tmpName = audBox.querySelector('#name').innerText;
            audBox.querySelector('#name').innerText = mainChar.querySelector('#main-name').innerText
            mainChar.querySelector('#main-name').innerText = tmpName;
    
            if (audBox.querySelector('#name').innerText === YOUR_NAME) 
                audBox.querySelector('.cancel-btn').style.visibility = 'hidden';
            else 
                audBox.querySelector('.cancel-btn').style.visibility = 'visible';
            let head = audBox.querySelector('.head');
            let tmpImg = window.getComputedStyle(head).backgroundImage;
            let mainHead = mainChar.querySelector('#main-head');
            const mainImg = window.getComputedStyle(mainHead).backgroundImage;
            
            head.style.backgroundImage = mainImg;
            head.style.backgroundPosition = '0 0.2em';
            head.style.backgroundSize = '150%';
            mainHead.style.backgroundImage = tmpImg;
        }else {
            mainChar.querySelector('#main-name').innerText = audBox.querySelector('#name').innerText;
            mainChar.style.width = '70%';
            mainChar.querySelector('.main').style.display = 'block';
            audience.parentElement.style.width = '30%';
            let head = audBox.querySelector('.head');
            let tmpImg = window.getComputedStyle(head).backgroundImage;
            let mainHead = mainChar.querySelector('#main-head');
            mainHead.style.backgroundImage = tmpImg;
            audBox.parentNode.removeChild(audBox);
        }
    });    
});

// Cancel to pin someone on the left side
// make the pinned one to the right side and change css

let unpin = document.querySelector('.unpin-btn');
console.log(unpin);
unpin.addEventListener('click', function(e) {
    isPinned = false;  
    let unpinBtn = e.target.parentElement;
    let pinnedMan = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log(pinnedMan);
    let audBox = document.querySelector('.aud-box');

    let tmp = audBox.cloneNode('deep');
    tmp.querySelector('.name').innerText = pinnedMan.querySelector('.main-name').innerText;
    let head = tmp.querySelector('.head')
    head.id = 'a-0';
    headImg = window.getComputedStyle(pinnedMan.querySelector('.main-head')).backgroundImage;
    head.style.backgroundImage = headImg;
    let audience = document.getElementById('audience');
    audience.appendChild(tmp);
    pinnedMan.style.display = 'none';
    pinnedMan.parentElement.style.width = '0%';
    audience.parentElement.style.width = '100%';
    audience.style.marginTop = '50px';
    audience.style.justifyContent = 'space-around';
    let audBoxes = audience.querySelectorAll('.aud-box');
    Array.from(audBoxes).forEach((audBox) => {
        audBox.style.width = '30%';
    })
    if (pinnedMan.querySelector('.main-name').innerText === YOUR_NAME)
        tmp.querySelector('.cancel-btn').style.visibility = 'hidden'; 
});