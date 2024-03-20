import { AMOUNT_PHOTOCARDS, createPhotoDescriptions } from './data.js';
import renderMiniatures from './miniatures.js';

renderMiniatures(createPhotoDescriptions(AMOUNT_PHOTOCARDS));
