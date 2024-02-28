/*
This script renders the main menu ui.
*/

let servicesElem = document.querySelector('.services');

console.log(`Welcome to the Quark Player DevTools Console!`);

function isLoading() {
  return document.body.classList.contains('loading');
}

function createElement(tag, initialClass = null, style = null) {
  let elem = document.createElement(tag);
  if (initialClass && initialClass.trim().length > 0)
    elem.classList.add(initialClass);
  if (style) {
    Object.keys(style).forEach(key => {
      elem.style[key] = style[key];
    });
  }
  return elem;
}

// TODO: This is what is causing this issue lol
function animateLoader(service, img) {
  // create loader element
  let loader = createElement('div', 'loader', {
    top: `${img.getBoundingClientRect().top}px`,
    left: `${img.getBoundingClientRect().left}px`
  });

  // create ripple element
  let ripple = createElement('div', 'ripple', {
    backgroundColor: service.color
  });

  // append ripple and (a clone of) img to loader
  loader.appendChild(ripple);
  loader.appendChild(img.cloneNode());

  document.body.appendChild(loader);

  // set global state to loading
  document.body.classList.add('loading');

  setTimeout(() => {
    // let the element transition to the center of the screen
    loader.style.top = '50%';
    loader.style.left = '50%';
    loader.style.transform = 'translate(-50%, -50%)';
  }, 1);
}

// Initialize services
// eslint-disable-next-line no-undef
services.forEach(service => {
  // skip if service is hidden
  if (service.hidden) {
    return;
  }

  // create service element
  let elem = createElement('a', 'service');
  elem.setAttribute('href', '#');
  elem.setAttribute('title', service.title);

  // create img element
  let img = createElement('img', null, service.style);
  img.setAttribute('id', service.name);
  img.setAttribute('src', service.logo);
  img.setAttribute('alt', service.name);

  // append img to service element
  elem.appendChild(img);

  // create h3 element
  let h3 = document.createElement('h3');
  h3.classList.add('h3select');
  h3.appendChild(document.createTextNode(service.name));

  // append h3 element to service element
  elem.appendChild(h3);

  // append service element to services
  servicesElem.appendChild(elem);

  elem.addEventListener('click', () => {
    if (isLoading()) return;

    animateLoader(service, img);
    console.log(`Animation load`);
    console.log(`Switching to service ${service.name}} at URL: ${service.url}`);
    // eslint-disable-next-line no-undef
    ipc.send('open-url', service);
  });
});

// If requested by menu
// eslint-disable-next-line no-undef
ipc.on('run-loader', (e, service) => {
  if (isLoading()) return;

  // find image of the selected service in DOM
  let img = document.getElementById(service.name);

  animateLoader(service, img);
  console.log(`Animation load`);
  console.log(`Switching to service ${service.name}} at URL: ${service.url}`);
});
