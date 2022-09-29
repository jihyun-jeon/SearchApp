/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsInbox } from 'react-icons/bs';
import { ItemResult } from '../../store/keywordsSlice';

export const SearchBox = ({ keywordList }: { keywordList: ItemResult[] }) => {
  const [highLighNum, setHighLighNum] = useState(0);

  // [p] 'undefined' 형식은 'HTMLAnchorElement | null' 형식에 할당할 수 없습니다.
  // LinkEl의 타입이 undifined안데, 이 타입은 'HTMLAnchorElement | null' 이 되야함
  // 그래서 useRef뒤에 제네릭으로 <HTMLAnchorElement> 달아줌
  // 근데 useRef()에 아무값이 없으면 useRef.current는 undefined가 됨.
  // 따라서 기본값으로 useRef(null) <= null을 넣어준 것임
  /*
  <LinkEl.current가 지정되는 방식> - 파일 하단 참조
  */
  const LinkEl = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // [p] LinkEl타입이 null이면 실행 안되도록 가드해줌
    if (!LinkEl.current) {
      return;
    }

    if (+LinkEl.current.id === +highLighNum) {
      LinkEl.current.classList.add('bg-gray-200');
      setTimeout(() => {
        LinkEl.current?.focus(); // [p] .? - LinkEl타입이 null이면 실행 안되도록 가드해줌
      }, 100);
    }
  }, [highLighNum]);

  // [ㅔ]e 타입지정 - onKeyDown에서 나오는 타입과 맞춰줘야함
  const onSearchKeydown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.keyCode === 40) {
      setHighLighNum(prev => {
        if (prev === keywordList.length - 1) {
          return prev;
        }
        return (prev += 1);
      });
    }
    if (e.keyCode === 38) {
      setHighLighNum(prev => {
        if (prev === 0) {
          return prev;
        }
        return (prev -= 1);
      });
    }
  };

  return (
    <div className="searchBox overflow-scroll ">
      {/* [TODO] scrollbar-hide 스크롤바 아랫부분만 없애는 style처리 해야함*/}
      <ul className="w-full max-h-96" onKeyDown={e => onSearchKeydown(e)}>
        <li className="pl-2">{keywordList.length}개의 검색 결과</li>
        {keywordList.map((keywordText, idx) => {
          return (
            <li key={idx}>
              {idx === highLighNum && (
                // [p] id는 string만 받도록 typescript내부에서 그렇게 되있음
                <a href="#" ref={LinkEl} id={`${idx}`} className="searchList flex items-center">
                  <AiOutlineSearch className="mr-3" />
                  <span>{keywordText.sickNm}</span>
                </a>
              )}
              {idx !== highLighNum && (
                <a href="#" id={`${idx}`} className="searchList flex items-center">
                  <AiOutlineSearch className="mr-3" />
                  <span>{keywordText.sickNm}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const NoSearchBox = () => {
  return (
    <div className="searchBox flexCenter">
      <BsInbox className="mr-5" /> 검색 결과가 없습니다
    </div>
  );
};

// https://bobbyhadz.com/blog/react-useref-object-is-possibly-null
/*
<uesRef() 실행원리>
1. LinkEl.current 는 초기값이 null이다.
2. 근데 jsx부분에서 a태그 부분에 ref를 읽게되면 이제 current값은 a요소가 들어가게 된다.
3. 그럼 이제 LinkEl.currnet는 a요소고, 타입은 HTMLAnchorElement가 되는것임.
*/
