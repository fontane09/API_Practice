const hamBtn = document.querySelector('.ham');
const nav = document.querySelector('header > nav');
const listCon = document.querySelector('.listCon');
hamBtn.addEventListener('click', () => {
  nav.classList.toggle('on');
});

const API_KEY = '45007259-bbfe-4600-a20e-63d6befc1ed2';

// 카테고리별 코드
// 001 : 오페라
// 005 : 연극
// 007 : 무용
// 008 : 뮤지컬
// 017 : 콘서트
// 018 : 클래식
// 019 : 재즈
// 020 : 크로스오버
// 021 : 복합장르
// 022 : 세계음악분수
// 023 : 전시정보
// 024 : 아카데미강좌
// 026 : 공연전체

let infoTpNo = '026';
const category = document.querySelector('header nav');
category.addEventListener('click', (e) => {
  console.log(e.target.dataset.infotp); // 대문자 안됨
  if (e.target.tagName !== 'BUTTON') return;
  infoTpNo = e.target.dataset.infotp;
  getLatestDatas(infoTpNo);
});

// apis1.js 참고 --------------------------

const createElmLi = (item) => {
  // li에 추가할 내용 작성
  // <p>regDate : ${item.regDate}</p>
  // <p>데이터 구조를 파악하여 활용할 데이터를 바인딩하세요</p>
  return `
  <li><a href="${item.url}" target="_blank" rel="noopener noreferrer">
    <p class="artTitle">${item.title}</p>
    ${
      item.subjectCategory !== null
        ? `<p class="artGenre">장르 : ${item.subjectCategory}</p>`
        : ''
    }
    <p>공연 일자 : 2024-04-28</p>
    <p>공연 장소 : 예술의 전당</p>
    <p hidden>클릭하면 공연정보 페이지로 넘어갑니다.</p>
    </li>
  `;
};

const addItems = async (items) => {
  listCon.innerHTML = '';
  items.map((item) => {
    const li = document.createElement('li');
    li.innerHTML = createElmLi(item);
    listCon.appendChild(li);
  });
};

// const link = li.querySelector('a');
// link.addEventListener('click', function(event) {
//   event.preventDefault(); // 기본 동작(링크 이동) 방지
//   window.location.href = ${item.url}; // 새로운 URL로 이동
// });

// 1. API를 호출하여 데이터를 가져오는 함수를 만들어보세요.
let url = 'http://api.kcisa.kr/openapi/API_CCA_142/request'; /*URL*/
const getLatestDatas = async (infoTpNo) => {
  //url에 queryparams를 붙여서 fetch로 데이터를 가져옴
  let queryParams = new URLSearchParams({
    serviceKey: API_KEY /*서비스키*/,
    pageNo: '1' /*페이지수*/,
    infoTp: `${infoTpNo}` /*정보유형*/,
    numOfRows: '8' /*세션당 요청레코드수*/,
  });

  //url에 queryparams를 붙여서 fetch로 데이터를 가져옴
  const response = await fetch(url + '?' + queryParams.toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });
  // console.log(response);
  const data = await response.json();
  console.log(data); // {response: {…}} 결과값이 나옴
  const items = data.response.body.items.item;
  // console.log(items); // (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] 내용 확인

  if (data.response.body.items !== null) {
    let items = data.response.body.items.item;
    // console.log(items);

    addItems(items);
  } else {
    console.log('데이터가 없음');
  }

  // 2. 가져온 데이터를 화면에 표시하는 함수를 만들어보세요.
  // 하나의 item이 어떤 데이터를 가지고 있는지 확인해보세요.
};

getLatestDatas(infoTpNo);

// ------------------ mainvisual swiper 관련 JS ---------------------
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 4,
  spaceBetween: 80,
  centeredSlides: true,
  loop: true,
  // loopAdditionalSlides: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 80,
    },
    400: {
      slidesPerView: 2,
      spaceBetween: 80,
    },
    700: {
      slidesPerView: 3,
      spaceBetween: 80,
    },
    1000: {
      slidesPerView: 4,
      spaceBetween: 80,
    },
  },
  // autoHeight: true, // true로 설정하면 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
  //resistance: false, // 슬라이드 터치에 대한 저항 여부 설정
  slideToClickedSlide: true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
});

// // pagination -------------------------------------------------------
let totalCounts = data.response.body.totalCount;
// page마다 들어갈 컨텐츠 갯수 = pageSize
// numofRows
let pageSize = 8;
// pageNo
let page = 1;
// 페이지 버튼 갯수
let groupSize = 5;

const pagination = () => {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalCounts / pageSize),
    pageGroup * groupSize
  );

  let firstPage = (pageGroup - 1) * groupSize + 1;

  let paginationHtml = `<button class="prev"><i class="fa-solid fa-angle-left"></i></button>`;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHtml += `<button>${i}</button>`;
  }
  paginationHtml += `<button class="next"><i class="fa-solid fa-angle-right"></i></button>`;

  document.querySelector('.pgcon').innerHTML = paginationHtml;
};
