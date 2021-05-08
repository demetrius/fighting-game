const API_URL = 'https://api.github.com/';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');

//start function
async function startApp() {
  try {
    loadingElement.style.visibility = 'visible';
    
    const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
    const fighters = await callApi(endpoint, 'GET');
    const fightersElement = createFighters(fighters);
    
    rootElement.appendChild(fightersElement);
  } catch (error) {
    console.warn(error);
    rootElement.innerText = 'Failed to load data';
  } finally {
    loadingElement.style.visibility = 'hidden';
  }
}

//call API function
function callApi(endpoind, method) {
  const url = API_URL + endpoind
  const options = {
    method
  };

  return fetch(url, options)
    .then(response => 
      response.ok 
        ? response.json() 
        : Promise.reject(Error('Failed to load'))
    )
    .then(file => JSON.parse(atob(file.content)))
    .catch(error => { throw error });
}

//helper function for creating a DOM element
function createElement({ tagName, className = '', attributes = {} }) {
  const element = document.createElement(tagName);
  element.classList.add(className);
	
  Object
    .keys(attributes)
    .forEach(key => element.setAttribute(key, attributes[key]));

  return element;
}

//creating fighter's name function
function createName(name) {
  const nameElement = createElement({ tagName: 'span', className: 'name' });
  nameElement.innerText = name;

  return nameElement;
}

//creating fighter's image function
function createImage(source) {
  const attributes = { src: source };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-image',
    attributes
  });

  return imgElement;
}

//creating fighter function
function createFighter(fighter) {
  const { name, source } = fighter;
  const nameElement = createName(name);
  const imageElement = createImage(source);
  const element = createElement({ tagName: 'div', className: 'fighter' });
  element.addEventListener('click', (event) => handleFighterClick(event, 'wrapper'), false)
  imageElement.addEventListener('click', (event) => handleFighterClick(event, 'image'), false)

  element.append(imageElement, nameElement);

  return element;
}

//creating all fighters function
function createFighters(fighters) {
  const fighterElements = fighters.map(fighter => createFighter(fighter));
  const element = createElement({ tagName: 'div', className: 'fighters' });

  element.append(...fighterElements);

  return element;
}

//reacting on click function
function handleFighterClick(event, el) {
  console.log(el);
}

function getFightersNames(fighters) {
  const names = fighters.map(it => it.name).join('\n');
  return names;
}

startApp();