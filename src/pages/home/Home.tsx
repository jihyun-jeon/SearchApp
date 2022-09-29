/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import { addKeywords } from '../../store/keywordsSlice';
import { getSickDataRequest } from '../../api/api';
import { SearchBox, NoSearchBox } from './SearchBoxes';
import { highlightedText } from '../../utils/hightLighting';
import { useAppDispatch, useAppSelector } from '../../hooks/typeHooks';
import { selectsickNmData, ItemResult } from '../../store/keywordsSlice';

const Home = () => {
  const [inputValue, setinputValue] = useState('');
  const [keywordList, setKeywordList] = useState<(JSX.Element | undefined)[]>([]);

  // [hook4 - 컴포넌트에서 만들어둔 hook을 가져다 이런식으로 사용한다.
  // 컴포넌트에서 type지정을 반복적으로 하지 않고 바로 hook을 가져다 쓰면 되서 편해짐!]
  const dispatch = useAppDispatch();
  const keywords = useAppSelector(selectsickNmData);

  const decounceFlag = useRef(0);

  const keywordChange = (e: React.FormEvent<HTMLInputElement>) => {
    clearTimeout(decounceFlag.current);
    setKeywordList([]);

    const inputValue = (e.target as HTMLInputElement).value;
    setinputValue(inputValue);

    if (inputValue === '') {
      return;
    }

    decounceFlag.current = window.setTimeout(() => {
      const sickNameList = keywords[inputValue];

      if (sickNameList) {
        const bordList = sickNameList.map((el: ItemResult) => {
          return highlightedText(el.sickNm, inputValue);
        });

        setKeywordList(bordList);
      } else {
        getSickDataRequest(inputValue).then(res => {
          console.log('api 호출 횟수 : ', apiCount);
          apiCount += 1;

          const responseList = res.data;
          dispatch(addKeywords({ searchWord: inputValue, result: responseList }));

          const bordList = responseList.map((el: ItemResult) =>
            highlightedText(el.sickNm, inputValue)
          );
          setKeywordList(bordList);
        });
      }
    }, 2000);
  };

  return (
    <header className="w-full h-[460px] flexCenter flex-col relative bg-mainbgColor mt-14">
      <div className="w-2/5   flex flex-col items-center">
        <h1 className="text-2xl mb-10 font-bold text-mainColor  text-center leading-loose">
          국내 모든 임상기험 검색하고 <br /> 온라인으로 참여하기
        </h1>

        <div className="mb-14 px-5 py-2 bg-white w-5/6 h-16 rounded-3xl flexCenter justify-between ">
          <input
            type="text"
            value={inputValue}
            className=" border-none w-4/5 text-xl"
            placeholder="질환명을 입력해주세요"
            onInput={e => keywordChange(e)}
          />
          <button type="button" className="btn-clear" onClick={() => setinputValue('')}>
            x
          </button>
          <button type="button" className="btn-primary">
            검색
          </button>
        </div>
      </div>
      {inputValue && keywordList.length > 0 && <SearchBox keywordList={keywordList} />}
      {inputValue && keywordList.length === 0 && <NoSearchBox />}
      {/* [TODO] 버그해결 - 검색어 입력 후 api기다리는 동안 바로 noSearchBox가 나와서, 실제 검색결과 있어도 noSearchBox를 한번씩 거치고 가는 버그 있음 */}
    </header>
  );
};

export default Home;

let apiCount = 1;
