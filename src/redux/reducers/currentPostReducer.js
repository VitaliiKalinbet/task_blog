export default function currentPost (state = '', action) {
    switch (action.type) {
        case 'selectCurrentPost': 
            return action.data;
        case 'deleteCurrentPost': 
            return '';
        default: 
            return state;
    }
}