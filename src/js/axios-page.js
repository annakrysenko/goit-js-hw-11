import { getAxiosImages } from './axios'


export async function createPage(q, page, per_page) {
    try {
        const nextPage = await getAxiosImages(q, page, per_page);
        return nextPage
    }
    catch (err) {
        console.log(err)
    }  
} 