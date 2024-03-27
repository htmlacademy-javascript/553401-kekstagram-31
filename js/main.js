import createPhotoDescriptions from './data.js';
import renderMiniatures from './components/render-miniatures.js';
import openUploadImg from './components/render-form.js';

const uploadInput = document.querySelector('.img-upload__input');
const photoArray = createPhotoDescriptions();

renderMiniatures(photoArray);
uploadInput.addEventListener('change', openUploadImg);

////////////////////////////////////////////

////////////////////////////////////////////
