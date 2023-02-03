import { result } from "lodash";
import { getAxiosImages } from "./axios";
import { createMarkup } from "./create-markup";
import { refs } from "./DOM";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export async function renderChoicePage(q, page, per_page) {
    try {
        const nextPage = await getAxiosImages(q, page, per_page);
        const markupNextPage = createMarkup(nextPage,page);
        refs.galleryEl.innerHTML = markupNextPage;
        lightbox.refresh()
        localStorage.setItem('current-page', page)


    }
    catch (err) {
        console.log(err)
        console.log(result)
    }
}

const lightbox = new SimpleLightbox('.number-page a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 300,
  animationSpeed: 150,
  fadeSpeed: 150,
  nav: true
});