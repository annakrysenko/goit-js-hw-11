
export function createMarkupButtonsPagesNumbers(totalPages) {
    let markup = '';
    for (let i = 1; i <= totalPages; i++){
        markup += `<button type='button' data-style id='btn-number-page' class=''>
                            ${i}
                    </button>
                    `
    }
    return markup
}
