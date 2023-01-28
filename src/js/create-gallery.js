import Notiflix from 'notiflix';
import throttle  from 'lodash.throttle';

import { getAxiosImages } from './axios';
import { createMarkup } from './create-markup';
import { refs } from './DOM';
import { messages } from './massages'

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const lightbox = new SimpleLightbox('.gallery  a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 300,
  animationSpeed: 150,
  fadeSpeed: 150,
  nav: true
});

export async function createGallery(q, page = 1, per_page=40) {
    const data = await getAxiosImages(q, page, per_page)
    
    if (data.totalHits === 0) {
        Notiflix.Notify.failure(messages.fail);
        return
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
    refs.galleryEl.innerHTML = createMarkup(data)
    lightbox.refresh()
    refs.beforeStartEL.classList.add('hidden')

    //__________ <ЗАВАНТАЖЕННЯ ЧЕРЕЗ КНОПКУ> __________ //

    // refs.loadButtonEl.classList.remove('hidden')

    // refs.loadButtonEl.addEventListener('click', async() =>  {
    //     page++

    //     const nextPage = await getAxiosImages(q, page, per_page)
    //     const markupNextPage = createMarkup(nextPage)
    //     refs.galleryEl.insertAdjacentHTML('beforeend', markupNextPage)
    // })
    
    //_________ </ЗАВАНТАЖЕННЯ ЧЕРЕЗ КНОПКУ> ____________//

    window.addEventListener('scroll', throttle(async () => {
        const windowBox = document.documentElement.getBoundingClientRect();
        const clientHeightBox = document.documentElement.clientHeight;
        
        if (windowBox.bottom < clientHeightBox + 200) {
            try {
                refs.loaderEl.classList.remove('hidden')
                page++;
                const nextPage = await getAxiosImages(q, page, per_page);
                const markupNextPage = createMarkup(nextPage);
                refs.galleryEl.insertAdjacentHTML('beforeend', markupNextPage)
                lightbox.refresh()

                refs.loaderEl.classList.add('hidden')
            }
            catch (err) {
                console.log(err)
            }
        }
    },1000))
}
