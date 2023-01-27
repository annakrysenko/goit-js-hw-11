import { icons } from "./icons";

export function createMarkup(images) {
    const markup = images.hits.map((image) => {
            
        const {
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads
        } = image;
        
        const newStringWithTags = makeTags(tags)
        
        return`
        <a href="${largeImageURL}">
           <div class="photo-card">
              <img src="${webformatURL}" alt="${newStringWithTags}" loading="lazy"  class='preview' />
            <div class="info">
                <div class='info__item-wrapper'><p class="info-item">
                        ${icons.like}
                    <b>${likes}</b>
                    </p>
                    <p class="info-item">
                        ${icons.view}
                        <b>${views}</b>
                    </p></div>
                <div class='info__item-wrapper'>
                    <p class="info-item">
                        ${icons.comments}
                        <b>${comments}</b>
                    </p>
                    <p class="info-item">
                        ${icons.downloads}
                        <b>${downloads}</b>
                    </p>
                </div>
            </div>
        </div>
         </a>
        `
    }).join('')
    return markup
}

function makeTags(string) {
    let newStringWithTags = '#';
    for (let i = 0; i < string.length; i++){
        if (string[i] === ',') {
            newStringWithTags += " "
        }
        else if (string[i] === ' ') {
            newStringWithTags += '#'
        }
        else {
            newStringWithTags += string[i]
        }
    }
    return newStringWithTags
}