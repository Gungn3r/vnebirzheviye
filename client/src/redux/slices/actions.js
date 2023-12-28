// actions.js
import axios from 'axios';

// Типы действий
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Создание действия для запроса
export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

// Создание действия при успешном получении данных
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

// Создание действия при ошибке запроса
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Асинхронный action creator для выполнения запроса
export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    axios.get('/api/data') // Замените '/api/data' на свой эндпоинт
      .then(response => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};
