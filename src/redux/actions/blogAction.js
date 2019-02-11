import getArrOfObjectForBlog from '../../api/apiAllPosts';

export const addInfoForPost = (data) => {
    return {
        type: 'addInfoForPost',
        data: data,
    }
}

export const fetchData = () => dispatch => {
    return getArrOfObjectForBlog()
    .then(data => dispatch(addInfoForPost(data)))
    .catch(err => console.log(err))
}