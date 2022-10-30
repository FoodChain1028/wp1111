let num = 0;
let lastNum;
const genNumber = () => {
    if (lastNum === num)
        num = Math.floor(Math.random() * 100);
    while (num === 0)
        num = Math.floor(Math.random() * 100);
    lastNum = num;
    return num;
}

const getNumber = () => {
    return num;
}

export { genNumber, getNumber };