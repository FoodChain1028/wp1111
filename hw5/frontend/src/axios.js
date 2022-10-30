import axios from "axios";

const instance = axios.create(
    { baseURL: 'http://localhost:4000/api/guess' }
)

const startGame = async () => {
    try {
        const {data: { msg }} = await instance.post('/start');
        return msg;
    }
    catch(error) {
        return false;
    }
}

const guess = async (number) => {
    
    try {
        const res = await instance.get('/guess', { params: { number } });
        if (res.status !== 200) {
            throw new Error(res.status);
        }
        else return res.data.msg;
    } catch (error) {
        console.log(error);
        return error.response.data.msg;
    }
}
const restart = async () => {
    const {data: { msg }} = await instance.post('/restart');
    return msg;
};
export { startGame, guess, restart };