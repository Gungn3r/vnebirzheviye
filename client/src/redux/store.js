// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Предположим, что ваш корневой редюсер находится в reducers/index.js
import middleware from './middleware'; // Используйте middleware, если это необходимо

const store = createStore(rootReducer, middleware);

export default store;
