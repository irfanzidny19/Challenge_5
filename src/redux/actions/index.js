import axios from 'axios';
import {
  FETCH_BOOKS_SUCCESS,
  FETCH_LATEST_BOOKS_SUCCESS,
  FETCH_DETAIL_BOOKS_SUCCESS,
  GET_NAME,
  GET_TOKEN,
} from '../types';

export const getName = name => ({
  type: GET_NAME,
  payload: name,
});

export const getToken = token => ({
  type: GET_TOKEN,
  payload: token,
});

export const saveBooks = data => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: data,
});

export const saveLatestBooks = data => ({
  type: FETCH_LATEST_BOOKS_SUCCESS,
  payload: data,
});

export const saveDetailBooks = data => ({
  type: FETCH_DETAIL_BOOKS_SUCCESS,
  payload: data,
});

export const getBooks = token => {
  return async dispatch => {
    try {
      const resBooks = await axios.get(
        'http://code.aldipee.com/api/v1/books?limit=6',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // ${token}
        },
      );
      if (resBooks.data.results.length) {
        dispatch(saveBooks(resBooks.data.results));
        // const req = resBooks.sort((min, max) => {
        //   return max.average_rating - min.average_rating;
        // });
        // dispatch(saveBooks(req.data.results));
      }
      // console.log(resBooks.data.results);
    } catch (error) {
      throw error;
    }
  };
};

// export const getDetailBooks = (token, id) => {
//   return async dispatch => {
//     const resBooks = await axios
//       .get(`http://code.aldipee.com/api/v1/books/6231453513c01e6f8b566ece`, {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjQ1YmI3OTJjNGViZTBmMWQzMTk5MTQiLCJpYXQiOjE2NDkzNDMzMjAsImV4cCI6MTY0OTM0NTEyMCwidHlwZSI6ImFjY2VzcyJ9.Ue2D6Y7Ejx_9xzTXBRcV3RRAiAq3DB05D482SmD9p40`,
//         },
//         // ${token}
//       })
//       .catch(err => {
//         console.log(`${err}`);
//       });
//     if (resBooks.data.results.length) {
//       dispatch(saveDetailBooks(resBooks.data));
//       // const req = resBooks.sort((min, max) => {
//       //   return max.average_rating - min.average_rating;
//       // });
//       // dispatch(saveBooks(req.data.results));
//     }
//     console.log(resBooks.data);
//   };
// };

export const getLatestBooks = token => {
  return async dispatch => {
    const resBooks = await axios.get('http://code.aldipee.com/api/v1/books', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // ${token}
    });
    if (resBooks.data.results.length) {
      dispatch(saveLatestBooks(resBooks.data.results));
      // const req = resBooks.sort((min, max) => {
      //   return max.average_rating - min.average_rating;
      // });
      // dispatch(saveBooks(req.data.results));
    }
    // console.log(resBooks.data.results);
  };
};
