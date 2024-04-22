// ------------------ mainvisual swiper 관련 JS ---------------------
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 4,
  spaceBetween: 80,
  centeredSlides: true,
  loop: true,
  loopAdditionalSlides: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },

  // autoHeight: true, // true로 설정하면 슬라이더 래퍼가 현재 활성 슬라이드의 높이에 맞게 높이를 조정합니다.
  resistance: false, // 슬라이드 터치에 대한 저항 여부 설정
  slideToClickedSlide: true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
});

// // const hamBtn = document.querySelector('.ham');
// // const nav = document.querySelector('header > nav');
// // const newBord = document.querySelector('.listCon');
// // let newsList = [];

// // hamBtn.addEventListener('click', () => {
// //   nav.classList.toggle('on');
// // });

// // // ----------- APIS 1.js 참고 ------------
// const url =
//   'http://api.kcisa.kr/openapi/service/rest/meta2020/getKOCAperf'; /*URL*/
// let queryParams = new URLSearchParams({
//   serviceKey: '36199ff6-9b7b-46c3-a5da-11dc20f05a0a' /*서비스키*/,
//   numOfRows: '8' /*세션당 요청레코드수*/,
//   pageNo: '1' /*페이지수*/,
// });

// fetch(url + '?' + queryParams.toString())
//   .then((response) => response.text())
//   .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
//   .then((data) => {
//     console.log(
//       'resultCode: ' + data.getElementsByTagName('resultCode')[0].textContent
//     );
//     console.log(
//       'resultMsg: ' + data.getElementsByTagName('resultMsg')[0].textContent
//     );

//     const items = data.getElementsByTagName('item');
//     Array.from(items).forEach((item) => {
//       const fields = [
//         'title',
//         'period',
//         'charge',
//         'url',
//         'description',
//         // 필요없어 보이는 출력값 생략
//         // 'referenceIdentifier',
//         // 'publisher',
//         // 'collectionDb',
//         // 'creator',
//         // 'description',
//         // 'rights',
//         // 'regDate',
//         // 'sourceTitle',
//       ];
//       const listCon = document.querySelector('.listCon');
//       const li = document.createElement('li');

//       fields.forEach((field) => {
//         const textContent = item.getElementsByTagName(field)[0]?.textContent;
//         if (textContent) {
//           const p = document.createElement('p');
//           p.textContent = `${field}: ${textContent}`;
//           li.appendChild(p);
//         }
//       });
//       // listCon = ul 속에 자식 요소 li 생성
//       listCon.appendChild(li);
//       console.log('list:', fields);
//       console.log('list:', listCon);
//     });
//   })
//   .catch((error) => console.error('Error:', error));

// // // api 관련 ----------------------------
// const API_KEY = '36199ff6-9b7b-46c3-a5da-11dc20f05a0a';

// // pagination
// let totalResults = 0;
// // page마다 들어갈 컨텐츠 갯수 = pageSize
// let pageSize = 8;
// let page = 1;
// // 페이지 버튼 갯수
// let groupSize = 6;

// const pagination = () => {
//   let pageGroup = Math.ceil(page / groupSize);
//   let lastPage = Math.min(
//     Math.ceil(totalResults / pageSize),
//     pageGroup * groupSize
//   );
//   let firstPage = (pageGroup - 1) * groupSize + 1;

//   let paginationHtml = `<button class="prev"><i class="fa-solid fa-angle-left"></i></button>`;
//   for (let i = firstPage; i <= lastPage; i++) {
//     paginationHtml += `<button>${i}</button>`;
//   }
//   paginationHtml += `<button class="next"><i class="fa-solid fa-angle-right"></i></button>`;

//   document.querySelector('.pgcon').innerHTML = paginationHtml;
// };

// const errorRender = (message) => {
//   const errorHtml = `<li class="nolist">컨텐츠를 가져올 수 없습니다 ${message}</li>`;
//   newBord.innerHTML = errorHtml;
// };

// const fetchNews = async (url) => {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     // console.log(data);
//     totalResults = data.totalResults;
//     // console.log(totalResults);

//     if (response.status !== 200) {
//       throw new Error(data.message);
//     }

//     newsList = data.articles;
//     renderNews(newsList);
//     pagination();
//   } catch (error) {
//     errorRender(error.message);
//   }
// };

// // XML to JSON

// const API_KEY = '36199ff6-9b7b-46c3-a5da-11dc20f05a0a';

// async function loadData() {
//   const response = await fetch(
//     'http://api.kcisa.kr/openapi/API_TOU_050/request?serviceKey=36199ff6-9b7b-46c3-a5da-11dc20f05a0a&numOfRows=10&pageNo=1'
//   );
//   const data = await response.json();
//   return data.items;
// }
// function createHtml(item) {
//   return `
//     <li>
//         <p>
//           <img src="${item.imageObject}" alt="${item.title}"/>
//         </p>
//         <p> ${item.title}</p>
//       </li>
//       `;
// }
// // li 요소를 만들어서 ul 요소에 붙이기
// function displayData(data) {
//   const listCon = document.querySelector('.listCon');
//   data.forEach((item) => {
//     const li = document.createElement('li');
//     li.innerHTML = createHtml(item);
//     listCon.appendChild(li);
//   });
// }

// loadData().then((data) => {
//   console.log(data);
//   displayData(data);
// });

// // // ---------------------------검색(inputArea) 영역--------------------------

// const searchBtn = document.querySelector('.searchBtn');
// const searchInput = document.querySelector('.inputArea input');

// const searchFn = () => {
//   const searchWord = searchInput.value;
//   searchInput.value = '';
//   const url = new URL(
//     `http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${API_KEY}&numOfRows=${numOfRows}0&pageNo=${pageNo}`
//   );
//   fetchNews(url);
// };
// // 돋보기 아이콘 클릭했을때
// searchBtn.addEventListener('click', async () => {
//   searchFn();
// });
// // 엔터 키 눌렀을때
// searchInput.addEventListener('keypress', (e) => {
//   if (e.key !== 'Enter') return;
//   searchFn();
// });

// // // 카테고리 버튼 ------------------------------------
// const getNewsByCate = async (category) => {
//   const url = new URL(
//     `http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${API_KEY}&numOfRows=${numOfRows}0&pageNo=${pageNo}`
//   );
//   fetchNews(url);
// };

// nav.addEventListener('click', (e) => {
//   if (e.target.tagName !== 'BUTTON') return;
//   let category = e.target.dataset.cate;
//   category = category.toLowerCase();
//   getNewsByCate(category);
// });

// // // ----->>>> xml 파일을 json 으로 가져오는 방법!!!!!!!

// const API_KEY = '36199ff6-9b7b-46c3-a5da-11dc20f05a0a';

// const getLatestDataAsJson = async () => {
//   const url = new URL(
//     `http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${API_KEY}&numOfRows=${numOfRows}0&pageNo=${pageNo}``
//   );

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         accept: 'application/xml', // XML 형식으로 요청합니다.
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     const xmlText = await response.text(); // XML 텍스트를 가져옵니다.

//     // XML 텍스트를 JSON으로 변환합니다.
//     const xmlDoc = new DOMParser().parseFromString(xmlText, 'text/xml');
//     const jsonData = xmlToJson(xmlDoc);

//     return jsonData;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// };

// // XML을 JSON으로 변환하는 함수
// const xmlToJson = (xml) => {
//   // 모든 자식 노드를 확인하며 JSON 객체로 변환합니다.
//   const obj = {};

//   if (xml.nodeType === Node.ELEMENT_NODE) {
//     // Element 노드인 경우
//     if (xml.attributes.length > 0) {
//       obj['@attributes'] = {};
//       for (let j = 0; j < xml.attributes.length; j++) {
//         const attribute = xml.attributes.item(j);
//         obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
//       }
//     }
//   } else if (
//     xml.nodeType === Node.TEXT_NODE ||
//     xml.nodeType === Node.CDATA_SECTION_NODE
//   ) {
//     // Text 노드 또는 CDATA Section 노드인 경우
//     return xml.nodeValue;
//   }

//   // 자식 노드를 처리합니다.
//   if (xml.hasChildNodes()) {
//     for (let i = 0; i < xml.childNodes.length; i++) {
//       const item = xml.childNodes.item(i);
//       const nodeName = item.nodeName;

//       if (typeof obj[nodeName] === 'undefined') {
//         obj[nodeName] = xmlToJson(item);
//       } else {
//         if (typeof obj[nodeName].push === 'undefined') {
//           const old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//         obj[nodeName].push(xmlToJson(item));
//       }
//     }
//   }
//   return obj;
// };

// // 사용 예시
// getLatestDataAsJson().then((jsonData) => {
//   console.log(jsonData); // JSON 데이터 출력
// });

// // apis2.js --------------------------

// async function loadData() {
//   const response = await fetch(
//     '`http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${API_KEY}&numOfRows=${numOfRows}0&pageNo=${pageNo}`'
//   );
//   const data = await response.json();
//   return data.items;
// }
// function createHtml(item) {
//   return `
//     <li>
//         <p>
//           <span>referenceIdentifier</span
//           ><img
//             src="${item.referenceIdentifier}"
//             alt="${item.title}"
//           />
//         </p>
//         <p><span>title</span> ${item.title}</p>
//       </li>
//       `;
// }
// function displayData(data) {
//   // li 요소를 만들어서 ul 요소에 붙이기
//   const listCon = document.querySelector('.listCon');
//   data.forEach((item) => {
//     const li = document.createElement('li');
//     li.innerHTML = createHtml(item);
//     listCon.appendChild(li);
//   });
// }

// loadData().then((data) => {
//   console.log(data);
//   displayData(data);
// });

// async function loadData() {
//   const response = await fetch(
//     '`http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=${API_KEY}&numOfRows=${numOfRows}0&pageNo=${pageNo}`'
//   );
//   const data = await response.json();
//   return data.items;
// }
// function createHtml(item) {
//   return `
//     <li>
//         <p>
//           <img
//             src="${item.course_image}"
//             alt="${item.name}"
//           />
//         </p>
//         <p> ${item.name}</p>
//       </li>
//       `;
// }
// function displayData(data) {
//   // li 요소를 만들어서 ul 요소에 붙이기
//   const listCon = document.querySelector('.listCon');
//   data.forEach((item) => {
//     const li = document.createElement('li');
//     li.innerHTML = createHtml(item);
//     listCon.appendChild(li);
//   });
// }

// loadData().then((data) => {
//   console.log(data);
//   displayData(data);
// });






const url = 'http://api.kcisa.kr/openapi/API_CNV_061/request'; /*URL*/
let queryParams = new URLSearchParams({
  serviceKey: '1d680009-0b7a-432a-bfc7-2ac27400a79c' /*서비스키*/,
  numOfRows: '10' /*세션당 요청레코드수*/,
  pageNo: '1' /*페이지수*/,
  keyword: '' /*검색어*/,
});

fetch(url + '?' + queryParams.toString())
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
  .then((data) => {
    console.log('status: ' + data.documentElement.getAttribute('status'));
    console.log(
      'resultCode: ' + data.getElementsByTagName('resultCode')[0].textContent
    );
    console.log(
      'resultMsg: ' + data.getElementsByTagName('resultMsg')[0].textContent
    );

    const items = data.getElementsByTagName('item');
    Array.from(items).forEach((item) => {
      const fields = [
        'publisher',
        'creator',
        'collectionDb',
        'insertDate',
        'title',
        'description',
        'referenceIdentifier',
        'url',
        'viewCnt',
        'reference',
        'spatialCoverage',
      ];
      const listCon = document.querySelector('.listCon');
      const li = document.createElement('li');

      fields.forEach((field) => {
        const textContent = item.getElementsByTagName(field)[0]?.textContent;
        if (textContent) {
          const p = document.createElement('p');
          p.textContent = `${field}: ${textContent}`;
          li.appendChild(p);
        }
      });

      listCon.appendChild(li);
      console.log('list:', fields);
      console.log('list:', listCon);
    });
  })
  .catch((error) => console.error('Error:', error));
