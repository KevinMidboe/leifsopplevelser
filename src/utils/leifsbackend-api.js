import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/'

function adventureList() {
  const url = BASE_URL + 'adventure';
  
  return fetch(url)
    .then(resp => resp.json())
    .catch(err => console.log('unable to fetch adventure.'))
}

function adventureById(id) {
  const url = BASE_URL + 'adventure/' + id;
  
  return fetch(url)
    .then(resp => resp.json())
    .catch(err => console.log('unable to fetch adventure.'))
}

function createAdventure(data) {
  const url = BASE_URL + 'adventure';
  const jsonBody = JSON.stringify(data);
  const headers = { 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return fetch(url, { method: 'POST', headers: headers, body: jsonBody })
    .then((resp) => console.log('response from posting to server:', resp))
    .catch((error) => console.error('error from post request:', error))
}


function locationByName(locationName) {
  let url = new URL(BASE_URL + 'location')
  url.search = new URLSearchParams({ name: locationName })

  return fetch(url)
    .then(resp => resp.json())
    .catch(err => console.log('unable to fetch location.'))
}

function imagesByAdventureId(adventureId) {
  const url = BASE_URL + 'images/' + adventureId;

  return fetch(url)
    .then(resp => resp.json())
    .catch(err => console.log('unable to fetch images.'))
}

function createImages(FileFormData, adventureId, progressEvent=undefined) {
  const url = BASE_URL + 'upload/' + adventureId;

  axios.post(url, FileFormData, { onUploadProgress: progressEvent } )
    .then((resp) => console.log('response from posting to server:', resp))
    .catch((error) => console.error('error from post request:', error))
}


export { 
  adventureList,
  adventureById,
  createAdventure,
  locationByName,
  imagesByAdventureId,
  createImages
}