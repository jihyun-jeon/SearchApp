# 프로젝트 설명

- 원티드 프리온보딩 프론트엔드 6차 10팀 추천 검색어 과제
- 로컬 캐싱기능을 이용한 검색창 구현 (한국임상정보 사이트를 모티브로 함)

# 사용기술

- 언어 : Javascript
- 라이브러리 : React, React-router-dom
- 상대관리 : redux , redux-toolkit , redux logger
- styling : tailwind , react-icon

# redux toolkit을 활용한 상태관리

store에 모든 검색결과를 저장하고 있는 구조
하나의 객체에 "검색키워드"와 "검색결과"가 키와 값으로 들어있음

```
keywords : {검색키워드 : 검색결과[] , ...}
```

# 로컬 캐싱 구현

- store에 모든 검색어와 검색결과를 담아둔 뒤 있는 데이터면 api호출 없이 store값 쓰는 식으로 처리

1. 검색어 input창에 타이핑
2. 타입핑 완료 후 2초 뒤에 store에 저장해둔 데이터가 있는지 찾아봄
3. 검색어에 해당하는 결과를 store에 담아둔게 있으면 api호출 없이 store값 사용
4. store에 담아둔게 없다면 - api호출 > store에 값 저장 후 > api응답 데이터 사용

# 키보드만으로 추천 검색어 이동기능

1. 검색 완료 후 첫번째 검색결과 리스트에 포커스가 지정되도록 함. (useRef활용)
2. 이후 해당 리스트의 id값과 변수 highLighNum값이 같으면 하이라이트 처리
3. 아래 방향키 누를시 highLighNum값을 1씩 증가하여 다음번 리스트에 하이라이트 처리 (event.keyCode로 방향키 따짐)
4. 위 방향키 누를시 highLighNum값을 1씩 증가하여 다음번 리스트에 하이라이트 처리 (event.keyCode로 방향키 따짐)
