import Notiflix from 'notiflix';

import { messages } from './massages'
import { createGallery } from './create-gallery';
 

export function getQueryValue(e) {
    e.preventDefault()
    const q = e.target.elements.searchQuery.value;

    if (q === '') {
        Notiflix.Notify.warning(messages.warn);
        return;
    }
    
    createGallery(q)
    localStorage.setItem('query', q)
}

// export function renderAfterUpdateThePage(q) {
//    createGallery(q) 
// }

