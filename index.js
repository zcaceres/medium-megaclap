// https://medium.com/_/api/posts/1b77616f6945/claps
// clapIncrement: 50
// userId: 'a443ed534b11'
//
// cookies plus x-xsrf-token are required
//
// post id is https://blog.doist.com/mental-health-and-remote-work-1b77616f6945
// https://medium.com/@zachcaceres/everything-you-need-to-know-about-body-language-5f081f1e04d3

function getUserId() {
  try {
    const [globalsScript] = Array.from(document.querySelectorAll('script'))
    .filter(el => el.innerHTML.includes('GLOBALS'))
    const GLOBALS = JSON.parse(globalsScript.innerHTML.slice(26).slice(0, -6))
    return GLOBALS.currentUser.userId
  } catch (e) {
    console.error(e)
  }
}

function getXSRF() { // get .xsrf cookie via chrome ext privileges
}

function getArticleId() {
  return window.location.href.split('-').pop()
}

function createClapRequest(articleId) {
  const CLAP_ENDPOINT = `https://medium.com/_/api/posts/${articleId}/claps`
  const userId = getUserId()
  const payload = {
    clapIncrement: 50,
    userId
  }
  return fetch(CLAP_ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-xsrf-token': undefined, // Yes, this works...
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
      	clapIncrement: 50,
      	userId
      })
  })
  .then(response => {
    if (response.status === 200) {
      console.log('MEGA CLAP')
      return window.location.reload()
    }
    console.log('Failed')
  })
  .catch(console.error)
}

function clap() {
  return createClapRequest(getArticleId())
}

function setup() {
  const buttonList = document.querySelector('.js-postShareWidget').querySelector('ul')
  const megaClapButton = document.createElement('li')
  megaClapButton.class = "u-textAlignCenter u-marginVertical10"
  megaClapButton.innerHTML = `<button id="megaClap" class="button button--large button--circle is-active button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon clapButton js-actionMultirecommendButton clapButton--largePill u-relative u-foreground u-xs-paddingLeft13 u-width60 u-height60 u-accentColor--textNormal u-accentColor--buttonNormal">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 51.997 51.997" style="height: 33px; width: 33px; vertical-align: inherit; enable-background:new 0 0 51.997 51.997;" xml:space="preserve">
    <g>
      <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
        c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
        c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
        C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25
        c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826
        c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514
        c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z"/>
    </g>
    <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Like">Like</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
    </svg>
  </button>`
  buttonList.insertAdjacentElement('afterbegin', megaClapButton)
  megaClapButton.addEventListener('click', clap)
}
setup()
