import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerbilder-4290c.firebaseio.com/'
});

export default instance;