const form = document.querySelector('form');
const input = document.querySelector('input');
const API_URL = 'https://api.unsplash.com/search/photos?client_id=11f2ff5a50fcce4df43aa4c897d132d3f5ad4a84ed0aec7be67718deb5120192';
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.images');

loadingImage.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event){
  
  event.preventDefault();

  const searchTerm = input.value;
  
  searchSetup();
  
  search(searchTerm)
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = 'none';
    });
}

function searchSetup() {
  imageSection.innerHTML = '';
  loadingImage.style.display = '';
}
 
function search(searchTerm) {
  const url = `${API_URL}&query=${searchTerm}`;  

  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.results;
    });
}


function displayImages(images) {
  images.forEach(image => {
    console.log(image.urls.regular);
    const imageElement = document.createElement('img');
    imageElement.src = image.urls.regular;
    imageSection.appendChild(imageElement);
  });
}