import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import type { PayloadAction } from '@reduxjs/toolkit';

//< [p1-1] key는 확실치 않지만 type 은 확실할 때 >
// [p1-2][방법1] - "객체"의 "키값"이 정해지지 않은 여러 값이 오는데 그 값은 다 string임
//  그떈 [key:string] <- 이런식으로!
// interface KeywordSliceState {
//   [key: string]: string[];
// }

const keywordsSlice = createSlice({
  name: 'search',
  initialState: {} as Record<string, { sickCd: string; sickNm: string }[]>, // [p1-3][방법2] - Recrod는 <키,값>을 받는데. 그 키는 string type인 것임.
  reducers: {
    // [p2-1] PayloadAction -  All generated actions should be defined using the PayloadAction<T> type from Redux Toolkit
    // [p2-2] PayloadAction 제네릭을 통해 action안에 있는 payload에 대한 타입만 넣어줌
    // action.type은 별도로 타입지정하기 않아도 type은 string으로 기본적으로 지정되있어서 ,  T extends string = string
    addKeywords: (state, action: PayloadAction<{ searchWord: string; result: ItemResult[] }>) => {
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

// < action types >
export interface ItemResult {
  sickCd: string;
  sickNm: string;
}

export interface Payload {
  searchWord: string;
  result: ItemResult[];
}
