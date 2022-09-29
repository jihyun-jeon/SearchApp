import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import keywordsReducer from './keywordsSlice';

const store = configureStore({
  reducer: {
    keywords: keywordsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;

// [hook1 - useSelector와 useDispatch를 훅으로 만들기 위해 store에서 형태를 추론하여 type을 만드는것임]
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // state의 형태를 type으로
// Inferred type: { comments: commentsReducer }
export type AppDispatch = typeof store.dispatch;
