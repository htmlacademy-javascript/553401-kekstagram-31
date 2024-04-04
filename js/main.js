import {
  renderMiniatures,
  errorDataTemplate,
} from './components/render-miniatures.js';
import { showAlert } from './util.js';
import { getData } from './data/api.js';
import closeUploadImg from './components/render-form.js';
import setUserFormSubmit from './components/validate-form.js';

getData()
  .then((photos) => {
    renderMiniatures(photos);
  })
  .catch(() => {
    showAlert(errorDataTemplate);
  });

setUserFormSubmit(closeUploadImg);
