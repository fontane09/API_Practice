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

// API_KEY ---------------------------
const API_KEY = '45007259-bbfe-4600-a20e-63d6befc1ed2';

// apis1.js 참고 --------------------------
const url = 'http://api.kcisa.kr/openapi/API_CCA_142/request'; /*URL*/
let queryParams = new URLSearchParams({
  serviceKey: '45007259-bbfe-4600-a20e-63d6befc1ed2' /*서비스키*/,
  numOfRows: '8' /*세션당 요청레코드수*/,
  pageNo: '1' /*페이지수*/,
  infoTp: '026' /*페이지수*/,
});

fetch(url + '?' + queryParams.toString())
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
  .then((data) => {
    console.log(
      'resultCode: ' + data.getElementsByTagName('resultCode')[0].textContent
    );
    console.log(
      'resultMsg: ' + data.getElementsByTagName('resultMsg')[0].textContent
    );

    const items = data.getElementsByTagName('item');
    Array.from(items).forEach((item) => {
      const fields = [
        // 공연명
        'title',
        // 장르
        'collectionDb',
        // 장르
        'subjectCategory',
        // 관련 링크
        'url',
        // 등록일자 (공연일자 아님)
        // 'regDate',
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

// -------------------li 생성 html------------------------------

// const createHtml = (news) => {
//   let referenceIdentifier = news.referenceIdentifier ? news.referenceIdentifier : '../img/noimg.png';

//   let title = news.title || '공연명 없음';
//   let period = news.period || '공연 기간 미정';
//   let urlLink = news.url ? news.url || '사이트 없음' : '사이트 없음';
//   let contactPoint = news.contactPoint || '출처 없음';
//   let description = news.description
//     ? news.description.length > 30
//       ? news.description.substring(0, 30) + '...'
//       : news.description
//     : '공연 내용 없음';

//   return `
//         <li>
//             <div class="newsImg">
//               <img
//                 src="${imageObject}"
//                 alt="${title}"
//                 onerror="this.onerror=null; this.src='./img/noimg.png';"
//               />
//             </div>
//             <p class="newsTitle">${title}</p>
//             <span class="period">${period}</span>
//             <span class="urlLink">${url}</span>
//             <span class="contactPoint">${contactPoint}</span>
//             <p class="desc">${description}</p>
//             <a
//               class="more"
//               href="${news.url}"
//               >자세히보기</a
//             >
//         </li>
//       `;
// };


// // 카데고리 클릭시 -------------------------
// const getNewsByCate = async (subjectCategory) => {
//   const url = new URL(
//     `http://api.kcisa.kr/openapi/API_CCA_142/request?serviceKey=${API_KEY}&infoTp=026&numOfRows=20`
//   );
//   fetchNews(url);
// };

// nav.addEventListener('click', (e) => {
//   if (e.target.tagName !== 'BUTTON') return;
//   let subjectCategory = e.target.dataset.cate;
//   subjectCategory = subjectCategory.toLowerCase();
//   getNewsByCate(subjectCategory);
// });