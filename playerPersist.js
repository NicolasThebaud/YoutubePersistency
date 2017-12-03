class Logger {
  constructor() {
    this.LOG_INFO = '[Yt-Persist][INFO]'
    this.LOG_ERROR = '[Yt-Persist][ERROR]'
  }

  log(level, msg) {
    console.log(level === 'err' ? this.LOG_ERROR : this.LOG_INFO, msg)
  } 

  warn(level, msg) {
    console.warn(level === 'err' ? this.LOG_ERROR : this.LOG_INFO, msg)
  }
}
const logger = new Logger()
/******************************************************************************/

let player
let trigger
let persistentPlayer

logger.warn('info', 'Extension successfully activated')

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const loadPlayer = setInterval(() => {
  player = player || document.querySelector('#player.ytd-watch')
  if (player && !trigger) {
    logger.log('info', player)
    mockOriginalPlayer()
    injectPersistencyTrigger()
  } else if (!player)
    logger.log('err', 'no player found')
  else
    clearInterval(loadPlayer)
}, 100)

const mockOriginalPlayer = () => {
  logger.log('info', 'persisting player...')
  persistentPlayer = document.createElement('iframe')
  persistentPlayer.src = formatLink(location.href)
  persistentPlayer.id = 'yt-persist-mock'
  persistentPlayer.setAttribute('height', player.offsetHeight)
  persistentPlayer.setAttribute('width', player.offsetWidth)
  player.parentElement.insertBefore(persistentPlayer, player)
  player.remove()
}

const injectPersistencyTrigger = () => {
  trigger = document.createElement('a')
  trigger.id = 'yt-persist-trigger'
  trigger.innerHTML = 'X'
  trigger.onclick = persistPlayer
  persistentPlayer.parentElement.insertBefore(trigger, persistentPlayer)
  logger.log('info', 'created trigger element')
}

const persistPlayer = () => {
  logger.log('info', 'persisting player...')
  persistentPlayer.className += 'yt-persist-player'
  trigger.remove()
}

const formatLink = (url) => {
  let newUrl = url.replace(/watch\?v\=/i, 'embed/')
  const timestamp = new RegExp(/&t\=(\d+m)?(\d+s)/i)
  if (timestamp.test(url)) {
    newUrl = newUrl.replace(/&t\=(\d+m)?(\d+s)/i, (w, m, s) => `?start=${ (+(m || '0').slice(0, -1))*60 + (+s.slice(0, -1))}&`)
  } else newUrl += '?'
  return newUrl + 'autoplay=1'
}