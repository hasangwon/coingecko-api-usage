##### CoinGecko API를 암호화폐 정보 제공 앱

Start with cloning this repo on your local machine:

$ git clone https://github.com/hasangwon/coingecko-api-usage.git
$ cd PROJECT
To install and set up the library, run:

$ npm install

Usage
Serving the app
$ npm run start

남은 작업 : 코드 정리, 스크랩 시 토스트 띄우기, 테스트 등


src/
│
├── api/
│ └── coinApi.ts                 # CoinGecko API와의 통신을 관리하는 함수들
│
├── app/
│ ├── globalSlice.ts             # 전역 Redux 상태 관리의 슬라이스 정의
│ ├── store.ts                   # Redux 스토어 설정과 미들웨어 구성
│ └── hooks.ts                   # Redux 상태를 위한 커스텀 훅
│
├── components/                  # 재사용 가능한 UI 컴포넌트 모음
│ ├── common/
│ │ ├── Error.tsx                # 에러 표시 컴포넌트
│ │ ├── Loading.tsx              # 로딩 컴포넌트
│ ├── CoinList.tsx               # 암호화폐 목록을 보여주는 컴포넌트
│ ├── GNB.tsx                    # 글로벌 내비게이션 바 컴포넌트
│ └── PriceCalculator.tsx        # 가격 계산 및 변환을 위한 컴포넌트
│
├── pages/                       # 각 페이지 별 컴포넌트
│ ├── Detail.tsx                 # 암호화폐 상세 정보 페이지 컴포넌트
│ ├── Home.tsx                   # 홈 페이지 컴포넌트
│ └── Scrap.tsx                  # 스크랩한 암호화폐 목록 페이지 컴포넌트
│
├── style/ 
│ ├── global.css                 # 전역 CSS 스타일
│ 
├── types/ 
│ ├─ react-app-env.d.ts          # React 스크립트 타입 정의
│ └── type.d.ts                  # 애플리케이션에서 사용되는 타입 정의
│
├── utils
│ ├─ localStorage.ts             # 로컬 스토리지 관리 유틸리티 함수
│ └─ printCurrencySymbol.ts      # 통화 기호 출력 유틸리티 함수
│
├── App.tsx                      # 애플리케이션의 루트 컴포넌트
└── index.tsx                    # 애플리케이션의 진입점
