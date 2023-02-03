'use strict';

import Notiflix from 'notiflix';

import { refs } from './js/DOM';
import { getQueryValue } from './js/get-query-value'
import { createGallery } from './js/create-gallery';
import { getAxiosImages } from './js/axios';

refs.loaderEl.classList.add('hidden')
refs.loadButtonEl.classList.add('hidden')
refs.containerBtnNumbersEl.classList.add('hidden')
refs.galleryEl.classList.add('hidden')

if (localStorage.getItem('query')) {
    const q = localStorage.getItem('query')
    const page = +localStorage.getItem('current-page')
    createGallery(q, page )
    refs.inputSearchEl.value = q
}
if (!localStorage.getItem('query')) {
    refs.headerEl.classList.add('start')
    refs.homeIconEl.classList.add('hidden')
}
    

refs.formEl.addEventListener('submit', async(e) => {
    localStorage.clear()
    const q = getQueryValue(e)
    if (!q) {
        return
    }

    localStorage.setItem('current-page', 1)
    createGallery(q) 
    refs.homeIconEl.classList.remove('hidden')
   
    
    refs.homeIconEl.addEventListener('click', () => { // Кнопка додому - скидає сховище і розмітку
        refs.headerEl.classList.add('start')
        refs.galleryEl.innerHTML = '';
        localStorage.clear()
    })
    
    q ? refs.headerEl.classList.remove('start') : null
})


















