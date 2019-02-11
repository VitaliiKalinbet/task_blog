import axios from 'axios';

export default function getArrOfComments () {
    return axios.get('https://simple-blog-api.crew.red/comments')
    .then(arrOfData => arrOfData.data)
    .catch(err => console.log(err))
}