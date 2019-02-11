export default function post (state = [], action) {
    switch (action.type) {
        case 'addInfoForPost': 
            return [...action.data];
        default: 
            return state;
    }
}