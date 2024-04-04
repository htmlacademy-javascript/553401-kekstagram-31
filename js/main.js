import {
  renderMiniatures,
  errorDataTemplate,
} from './components/render-miniatures.js';
import { showAlert, debounce } from './util.js';
import { getData } from './data/api.js';
import { setActiveFilterClick } from './components/filtered-miniatures.js';
import closeUploadImg from './components/render-form.js';
import setUserFormSubmit from './components/validate-form.js';

getData()
  .then((photos) => {
    renderMiniatures(photos);
    setActiveFilterClick(debounce(() => renderMiniatures(photos)));
  })
  .catch(() => {
    showAlert(errorDataTemplate);
  });

setUserFormSubmit(closeUploadImg);
