const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';

fetch(API_URL);
fetch(API_URL)
  .then(response => response.json())
  .then(file => {
    const fighters = JSON.parse(atob(file.content));
    const names = fighters.map(it => it.name).join('\n');
    console.log(fighters);
  });

