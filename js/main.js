import createPhotoDescriptions from './data.js';
import renderMiniatures from './render-miniatures.js';
import './render-full-picture.js';

const photoArray = createPhotoDescriptions();

renderMiniatures(photoArray);

////////////////////////////////////

////////////////////////////////////
