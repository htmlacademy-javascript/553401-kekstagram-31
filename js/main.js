import createPhotoDescriptions from './data.js';
import renderMiniatures from './components/render-miniatures.js';
import './components/render-full-picture.js';

const photoArray = createPhotoDescriptions();

renderMiniatures(photoArray);
