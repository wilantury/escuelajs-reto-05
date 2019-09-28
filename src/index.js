const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
//const API = 'https://rickandmortyapi.com/api/character/';
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

const miStorage = window.localStorage;  
miStorage.clear()

const builSection = (response) =>{
  const characters = response.results;
      if(response.info.next === ''){
        miStorage.setItem('next_fetch', API);
        console.log(`Ya no hay mas personajes`)
        intersectionObserver.disconnect()
      }else{
        miStorage.setItem('next_fetch', response.info.next);
      }      
      console.log(characters.info)
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
}


async function getData (api){

  try{
    const responseFetch = await fetch(api)
    const response = await responseFetch.json()    
    builSection(response)
  }catch(error){
    console.log(error)
  }
}

/* const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      miStorage.setItem('next_fetch', response.info.next);

      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
} */

const loadData = () => {
  const API_NEXT = miStorage.getItem('next_fetch');
  
  if(API_NEXT){
    getData(API_NEXT);
  }else{
    getData(API);
  }  
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);