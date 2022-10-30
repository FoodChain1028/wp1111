import express from "express";
import { genNumber, getNumber } from "../core/getNumber";

const router = express.Router();
router.post('/start', (_, res) => {
    genNumber();
    res.json({ msg: 'The game has started.' })
})

const parseNumber = (num) => {
    if (num.length > 4) return -1;
    for (let i = 0; i < num.length; i++){
        if ((/[a-zA-Z]/).test(num.charAt(i))) return -1
    } 
    return parseInt(num);
}
router.get('/guess', (req, res) => {
    const guess = parseNumber(req.query.number);
    let num = getNumber();
    let result;
    if ((guess === -1 || guess === 0 || guess > 100)) {
        res.status(406).send({ msg: `Error: ${req.query.number} is not a valid number (1 - 100)` })
    }
    else {
        if (guess > num) result = 'Smaller';
        else if (guess < num) result = 'Bigger';
        else result = 'Equal';
        res.json({ msg: result });
    }
})

router.post('/restart', (_, res) => {
    genNumber();
    res.json({ msg: 'The game has restarted.'})
})

export default router;