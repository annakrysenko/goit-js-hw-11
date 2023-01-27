import Notiflix from 'notiflix';

import { messages } from './massages'
import { createGallery } from './create-gallery';
import { refs } from './DOM';
 

export function getQueryValue(e) {
    e.preventDefault()
    const q = e.target.elements.searchQuery.value;

    if (q === '') {
        Notiflix.Notify.warning(messages.warn);
        // refs.galleryEl.innerHTML = '';
        return;
    }
    
    createGallery(q)
}

