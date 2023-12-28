// middleware.js
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Предполагается, что вы используете Redux Thunk

const middleware = applyMiddleware(thunk);

export default middleware;
