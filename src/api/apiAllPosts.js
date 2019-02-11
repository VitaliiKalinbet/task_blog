import axios from 'axios';

export default function getArrOfObjectForBlog () {
    return Promise.all([axios.get('https://simple-blog-api.crew.red/posts'), axios.get('https://simple-blog-api.crew.red/comments')])
    .then( arrOfData => {
        let posts =  arrOfData[0].data;
        let comments = arrOfData[1].data;
        return posts.map(el => ({
            title: el.title, 
            body: el.body,
            author: el.author,
            date: el.date,
            id: el.id,
            quantityComments: (comments.filter(coment => coment.postId === el.id)).length,
        }))
    }
)}