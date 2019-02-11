export default function comment (state = [], action) {
    switch (action.type) {
        case 'addInfoForComment': 
            return [...action.data];
        case 'addOneComment': 
            return [...state, action.data];
        default: 
            return state;
    }
}