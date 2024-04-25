# CoinGecko API를 가상화폐 정보 제공 앱

종류 : 개인 프로젝트 (과제) <br/>
개발 기간 : 4.23 ~ 4.25 (3일) <br/>
기술 스택 : React, Redux Toolkit, TailwindCSS <br/>

## 설치 방법


1. 클론
```
git clone https://github.com/hasangwon/coingecko-api-usage.git
```
```
cd PROJECT
```
2. 설치 (npm or yarn)
```
npm install
```
```
yarn install
```
3. 실행
```
npm run start
```

## 프로젝트 구조

```
├── src
│   ├── types/
│   │   ├── react-app-env.d.ts
│   │   └── type.d.ts
│   ├── api/
│   │   └── coinApi.ts
│   ├── app/
│   │   ├── globalSlice.ts             # 전역 Redux 상태 관리의 슬라이스 정의
│   │   └── store.ts                   # Redux 스토어 설정
│   ├── components/                    # UI 컴포넌트 모음
│   │   ├── common                     # 재사용 가능한 컴포넌트
│   │   │   ├── CoinList.tsx           # 가상화폐 목록을 보여주는 컴포넌트
│   │   │   ├── Error.tsx              # 에러 시 화면 컴포넌트
│   │   │   ├── GNB.tsx                # 상단 메뉴 바 컴포넌트
│   │   │   └── Loading.tsx            # 로딩 시 화면 컴포넌트
│   │   └── PriceCalculator.tsx
│   ├── hooks
│   │   ├── useFetchCoins.ts           # 코인 정보 로직 관련 hooks
│   │   └── useScrapCoins.ts           # 북마크 로직 관련 hooks
│   ├── pages
│   │   ├── Detail.tsx                 # 가상화폐 상세 정보 페이지 컴포넌트
│   │   ├── Home.tsx                   # 홈 페이지 컴포넌트
│   │   └── Scrap.tsx                  # 스크랩한 가상화폐 목록 페이지 컴포넌트
│   ├── style
│   │   └── global.css                 # 전역 CSS 스타일
│   ├── utils
│   │   ├── localStorage.ts            # 로컬 스토리지 관리 유틸리티 함수
│   │   └── printCurrencySymbol.ts     # 통화 기호 출력 유틸리티 함수
│   ├── App.tsx                        # 애플리케이션의 루트 컴포넌트
│   └── index.tsx                      # 애플리케이션의 진입점
```

## 화면

1. 홈 화면(가상화폐 리스트)<br/>
   <img src="https://github.com/hasangwon/coingecko-api-usage/assets/75872687/146fb976-1ab7-42d2-a418-f986c3d57bbe" width="800"/>
   <br/>
2. 북마크 화면<br/>
   <img src="https://github.com/hasangwon/coingecko-api-usage/assets/75872687/e043a91e-f4bb-4dc6-9688-1fa8536edd16" width="800"/>
   <br/>
3. 상세 화면<br/>
   <img src="https://github.com/hasangwon/coingecko-api-usage/assets/75872687/8f96d3a4-28fa-4495-b1d6-425fb93a0b31" width="800"/>
   <br/>
   추가) 반응형 화면<br/>
   <img src="https://github.com/hasangwon/coingecko-api-usage/assets/75872687/9e48768c-9e2c-46d5-86ef-922bcb195d99" width="250"/>
   <img src="https://github.com/hasangwon/coingecko-api-usage/assets/75872687/44ea0b21-570b-4210-9c74-b19dc51b6734" width="250"/>
