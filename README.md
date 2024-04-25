##### CoinGecko API를 가상화폐 정보 제공 앱

## 설치 방법

1. 클론
   $ git clone https://github.com/hasangwon/coingecko-api-usage.git
   $ cd PROJECT

2. 설치
   $ npm install
   or
   $ yarn install

3. 실행
   $ npm run start

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
