const ATTENDER_NUM = 6;
let attender = [];

let nameList = [
    "你",
    "海綿寶",
    "章魚哥",
    "蟹阿金",
    "皮老闆",
    "派大星"
];

let headList = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
]

function createRandomNumber(n) {
    n = parseInt(n * Math.random() + 1);
    return n;
}

class Audience {
    constructor() {
        this.name = "",
        this.head = "",
        this.cancelBtn = true,
        this.id = 0
    }
}

function createYourself() {
    let you = new Audience();

    you.name = nameList[0],
    you.head = headList[0],
    you.cancelBtn = false,
    you.id = 0
    
    console.log(you);    
}

function putAttendersIn() {
    for (let i = 0; i < ATTENDER_NUM; i++) {
        let newAttender = createAttender();
        if (!isUsed(newAttender.id))
            attender.push(newAttender);
    }
}

function createAttender() {
    let randomNum = createRandomNumber(ATTENDER_NUM);
    let aud = new Audience();
    aud.name = nameList[randomNum];
    aud.head = headList[randomNum];
    aud.cancelBtn = true; 
    aud.id = randomNum-1;
    return aud;
} 

function isUsed(newAttenderId) {
    for (let i = 0; i < attender.length; i++) {
        if (newAttenderId === attender[i].id) return true;
        return false;
    }
}

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
        console.log(audBox.id);
    });
});

