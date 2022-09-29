import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const keywordsSlice = createSlice({
  name: 'search',
  // initialState: {} as sickDataType,
  initialState: {},
  reducers: {
    addKeywords: (state, action) => {
      console.log(action.payload);
      state[action.payload.searchWord] = action.payload.result;
    },
  },
});

export const { addKeywords } = keywordsSlice.actions;
export default keywordsSlice.reducer;

//  [hook3 - useSelector는 useSelector는(()=> ) 이런 형식인데 "()=> " 이 형식을 slice에서 따로 만들어준 것임
// useSelector의 type은 hook파일에서 지정한 것이고
// 컴포넌트에서 useSelector hook인 "useAppSelector"와 "selectsickNmData"를 섞어서 써주게 됨.
export const selectsickNmData = (state: RootState) => state.keywords;

// < types >
export interface Item {
  sickCd: string;
  sickNm: string;
}

export interface Payload {
  keywords: Item[];
}

export interface actionType {
  type: string;
  payload: Payload;
}
