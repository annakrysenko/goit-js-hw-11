import Notiflix from 'notiflix';

import { messages } from './massages' 

export function getQueryValue(e) {
    e.preventDefault()
    const q = e.target.elements.searchQuery.value.trim();
    console.log(q)

    if (q.trim() === '') {
        Notiflix.Notify.warning(messages.warn);
        return false;
    }
    
    
    localStorage.setItem('query', q.toLowerCase())
        console.log(q.toLowerCase())

    return q.toLowerCase()
}
