import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js'

// 장바구니

let basketStarterEl = document.querySelector('header .basket_starter')
let basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event) {
  event.stopPropagation() // event 정지 - 버튼을 클릭했을 때 드롭다운 메뉴가 나타나야 함.
  if (basketEl.classList.contains('show')) {
    hideBasket()
  } else {
    showBasket()
  }
})
basketEl.addEventListener('click', function(event) {
  event.stopPropagation() // event 정지 - 드롭다운 메뉴 영역을 클릭했을 때 메뉴가 사라지지 않아야 함.
})
// 화면 전체를 클릭했을 때 메뉴가 사라짐.
window.addEventListener('click', () => {
  hideBasket()
})


function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}





// 검색모듈
let headerEl = document.querySelector('header')
let headerMenuEl = [...headerEl.querySelectorAll('ul.menu > li')] //배열로 변환
let searchWrapEl = headerEl.querySelector('.search_wrap')
let searchStarterEl = headerEl.querySelector('.search_starter')
let searchCloseEl = searchWrapEl.querySelector('.search_close')
let searchShadowEl = searchWrapEl.querySelector('.shadow')
let seacrchInputEl = searchWrapEl.querySelector('input')
let searchDelayEls = [...searchWrapEl.querySelectorAll('li')]


searchStarterEl.addEventListener('click', showSearch) // 내부에서 동작
searchCloseEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch(){
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEl.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEl.length + 's'
  })
  searchDelayEls.forEach(function(el,index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function(){
    seacrchInputEl.focus()
  },600) //focus 되면 0.6초뒤 실행
}



function hideSearch(){
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEl.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEl.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  seacrchInputEl.value = ''
}


// 요소의 가시성 관찰
let io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
  })
})
let inforEls = document.querySelectorAll('.info')
inforEls.forEach(function(el){
  io.observe(el) //entries
})


// 비디오 재생 스크립트
let video = document.querySelector('.stage video')
let playBtn = document.querySelector('.stage .controller--play')
let pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})




//  아이패드 랜더링 compare
let itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
  let itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  // VS Code 확장 프로그램 - Comment tagged templates //배열 데이터 불러오기
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})




// footer 메뉴
let navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  let mapEl =document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map){
    mapList += /*html*/ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>
    `
  })

  mapEl.innerHTML = /*html*/`
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `
  navigationsEl.append(mapEl)
})



// copyright

let yearEl = document.querySelector('span.year')
yearEl.textContent = new Date().getFullYear()