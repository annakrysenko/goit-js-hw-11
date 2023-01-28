'use strict';

import { refs } from './js/DOM';

import { getQueryValue } from './js/get-query-value'
import { createGallery } from './js/create-gallery';

// import { renderAfterUpdateThePage } from './js/create-gallery'

refs.loaderEl.classList.add('hidden')
refs.loadButtonEl.classList.add('hidden')

if (localStorage.getItem('query')) {
    const q = localStorage.getItem('query')
    createGallery(q)
}

refs.formEl.addEventListener('submit', (e) => getQueryValue(e))
















