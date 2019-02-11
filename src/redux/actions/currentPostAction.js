export const selectCurrentPost = (data) => {
    return {
        type: 'selectCurrentPost',
        data: data,
    }
}

export const deleteCurrentPost = () => {
    return {
        type: 'deleteCurrentPost',
    }
}