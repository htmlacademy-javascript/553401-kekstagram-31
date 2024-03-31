import createPhotoDescriptions from './data.js';
import renderMiniatures from './components/render-miniatures.js';
import renderUploadForm from './components/render-form.js';

const photoArray = createPhotoDescriptions();

renderMiniatures(photoArray);
renderUploadForm();
////////////////////////////////////////////

////////////////////////////////////////////
