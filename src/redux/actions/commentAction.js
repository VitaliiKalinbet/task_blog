import getArrOfComments from '../../api/apiAllComments';

export const addInfoForComment = (data) => {
    return {
        type: 'addInfoForComment',
        data: data,
    }
}

export const addOneComment = (data) => {
    return {
        type: 'addOneComment',
        data: data,
    }
}

export const fetchDataComment = () => dispatch => {
    return getArrOfComments()
    .then(data => dispatch(addInfoForComment(data)))
    .catch(err => console.log(err))
}