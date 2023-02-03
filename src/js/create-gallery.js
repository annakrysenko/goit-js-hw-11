import Notiflix from 'notiflix';
// import throttle from 'lodash.throttle';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getAxiosImages } from './axios';
import { createMarkup } from './create-markup';
import { refs } from './DOM';
import { messages } from './massages'
import { createMarkupButtonsPagesNumbers } from './create-markup-btn-numbers'
import { renderChoicePage } from './render-choice-page';
import { btnUp } from './button-up'



let totalPages;
const  currentPageInLocalStorage = () => localStorage.getItem('current-page');


export async function createGallery(q, page, per_page = 40) {
    const data = await getAxiosImages(q, page);
    console.log(data)
    totalPages = Math.ceil(data.totalHits / per_page)
    
    if (data.totalHits === 0) {
        Notiflix.Notify.failure(messages.fail);
        if (!localStorage) {
           refs.headerEl.classList.add('start')

        }
        return 
    }

    if (data.totalHits !== 0) {
        
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    refs.galleryEl.innerHTML = createMarkup(data);

    

    lightbox.refresh();

    refs.containerBtnNumbersEl.classList.remove('hidden');
    refs.galleryEl.classList.remove('hidden');
    

    
    //------  BUTTONS WITH NUMBER -----------//
    refs.containerBtnNumbersEl.innerHTML = createMarkupButtonsPagesNumbers(totalPages)

    // !currentPageInLocalStorage() ? refs.containerBtnNumbersEl.children[0].classList = 'current' : refs.containerBtnNumbersEl.children[`${+currentPageInLocalStorage}` - 1].classList = 'current';
    if (!currentPageInLocalStorage()) {
        refs.containerBtnNumbersEl.children[0].classList = 'current'
    }
    else if (currentPageInLocalStorage()){
        const forCss = Number(currentPageInLocalStorage()) - 1 ;
        console.log('forCss =>>',forCss)
        refs.containerBtnNumbersEl.children[`${forCss}`].classList = 'current'
    }

    refs.containerBtnNumbersEl.addEventListener('click', e => {
        if (e.target.nodeName === "DIV") {
            return
        }

        page = +e.target.textContent
        q = localStorage.getItem('query')
        renderChoicePage(q, page, per_page)
 
        for (let button of e.currentTarget.children) {
            if (button.classList.value === 'current') {
                button.classList.value = ''
            }
        }
        e.target.classList.add('current')
    })
    // ============ BUTTON UP ============================ //
    btnUp.addEventListener();
    
    // ====== FIND CURRENT PAGE ========= //
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(
            entry => {
                if (entry.isIntersecting) {
                    const toLocalStoragePage = entry.target.dataset.page;
                    localStorage.setItem('current-page', toLocalStoragePage)
                }
            }
        )
    }, { threshold: 0.2 });
    
    refs.pageContainerEl
        .forEach(div => {
            observer.observe(div);
        }
        )
}
// =================================================== //

        // const observerLoadNextPage = new IntersectionObserver((entries) => {
        //     entries.forEach(
        //         entry => {
        //             if (entry.isIntersecting) {
        //                 console.log('load next page')
        //                 // renderNextPage()
        //                 // lightbox.refresh()
        //                 // observerLoadNextPage.unobserve(entry.target)
        //             }
        //         }
        //     )
        // }, { rootMargin: '100px'});
        
        

    
        
        // refs.pageContainerEl.forEach(div => {
        //         observerLoadNextPage.observe(div);
        //     }
        // )
        
// ======= INFINITY SCROLL ==
    // window.addEventListener('scroll', throttle( async( q, page, per_page )=> {
 


        // const windowBox = document.documentElement.getBoundingClientRect();
        // const clientHeightBox = document.documentElement.clientHeight;

        // refs.upArrowBtnEl.classList.add('hidden')
        // if (windowBox.top  <  -90) {
        //     refs.upArrowBtnEl.classList.remove('hidden')
        // }

        // if (windowBox.bottom < clientHeightBox + 200 && currentPage < totalPages)  {
        //     page = currentPage+1;
            
        //     refs.loaderEl.classList.remove('hidden')
            
        //     try {
        //         const nextPage = await getAxiosImages(q, page, per_page);
        //         const markupNextPage = createMarkup(nextPage, page);
        //         refs.galleryEl.insertAdjacentHTML('beforeend', markupNextPage)
        //     }
        //     catch (err) {
        //         console.log(err)
        //     }
        // lightbox.refresh()
        // }
        // refs.loaderEl.classList.add('hidden')
    // --------------------------------------//


const lightbox = new SimpleLightbox('.number-page a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 300,
  animationSpeed: 150,
  fadeSpeed: 150,
  nav: true
});

//__________ <ЗАВАНТАЖЕННЯ ЧЕРЕЗ КНОПКУ> __________ //

    // refs.loadButtonEl.classList.remove('hidden')

    // refs.loadButtonEl.addEventListener('click', async() =>  {
    //     page++

    //     const nextPage = await getAxiosImages(q, page, per_page)
    //     const markupNextPage = createMarkup(nextPage)
    //     refs.galleryEl.insertAdjacentHTML('beforeend', markupNextPage)
    // })
    
    //_________ </ЗАВАНТАЖЕННЯ ЧЕРЕЗ КНОПКУ> ____________//