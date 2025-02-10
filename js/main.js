//github.com/prof3ssorSt3v3/improved-goggles
//prof3ssorSt3v3.github.io/improved-goggles/index.html
//127.0.0.1:5500/index.html
// https://improved-goggles-beryl.vercel.app/
document.addEventListener('DOMContentLoaded', init);

const MODE = Object.freeze({
  DEV: 'DEVELOPER BROKEN CRAP',
  PROD: 'PRODUCTION',
  STAGING: 'STAGING',
});

//IFFE that runs before init to determine our app mode
// http://127.0.0.1:5500 - origin
// 127.0.0.1:5500 - host
// 127.0.0.1 - hostname

let mode = (() => {
  if (location.hostname == 'localhost' || location.hostname == '127.0.0.1') {
    return MODE.DEV; //DEV
  }
  if (location.hostname.endsWith('github.io')) {
    return MODE.STAGING; //STAGING
  }
  if (location.hostname.includes('vercel.app')) {
    return MODE.PROD; //PRODUCTION
  }
})();
// level = 'info' || 'warn' || 'error'
const log = (msg, level = 'info') => {
  switch (level) {
    case 'info':
      if (mode === MODE.DEV) {
        console.log(msg);
      }
      break;
    case 'warn':
      console.warn(msg);
      break;
    case 'error':
      console.error(msg);
  }
};

function init() {
  //page is ready to use
  log('hello');
  log('yikes', 'warn');
  log('ah crap!!!', 'error');

  // feedback('Something happened', 'info');

  try {
    throw new Error('things happened.');
  } catch (err) {
    if (err.name === 'Error') {
      log(err.message, 'error');
    } else if (err.name === 'FetchError') {
      log(err.message, 'warn');
      feedback('Sorry. No Data Today.', 'error');
    }
  }
}

function feedback(msg, level = 'info', ttl) {
  let dialog = document.getElementById('feedback');
  let title = dialog.querySelector('.title');
  let message = dialog.querySelector('.message');
  let button = dialog.querySelector('.actions button');
  title.textContent = ttl ?? 'Information';
  message.textContent = msg;
  dialog.className = level;
  document.body.className = level;
  dialog.showModal();
  button.addEventListener('click', (ev) => dialog.close(), { once: true });

  switch (level) {
    case 'info':
      break;
    case 'warn':
      break;
    case 'error':
      break;
    case 'success':
      break;
  }
}

// let obj = {};
// let obj2 = {};
// let obj3 = obj;

// if (obj == obj2) {
//   log('same value'); // no
// }
// if (obj === obj2) {
//   log('same object'); // no
// }
// if (obj3 === obj) {
//   log('obj and obj3 are the same object'); //yes
// }
