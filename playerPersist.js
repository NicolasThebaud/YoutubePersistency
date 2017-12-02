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

logger.warn('info', 'Extension successfully activated')


const loadPlayer = setInterval(() => {
  player = player || document.querySelector('#player.ytd-watch')
  if (player && !trigger) {
    logger.log('info', player)
    injectPersistencyTrigger()
  } else if (!player)
    logger.log('err', 'no player found')
  else
    clearInterval(loadPlayer)
}, 1000)

const injectPersistencyTrigger = () => {
  trigger = document.createElement('a')
  trigger.id = 'yt-persist'
  trigger.innerHTML = 'X'
  trigger.onclick = persistPlayer

  logger.log('info', 'created trigger element')

  player.appendChild(trigger)
}

const persistPlayer = () => {
  logger.log('info', 'persisting player...')
  const persistentPlayer = document.createElement('iframe')
  persistentPlayer.src = location.href //TODO
  persistentPlayer.className = 'yt-persist-player'
  document.querySelector('body').appendChild(persistentPlayer)
}