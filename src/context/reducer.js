


export default function reducer (state, action) {
    switch (action.type) {
        case 'set_authenticated':
            return {
                ...state,
                authenticated: true
            };
        case 'set_unauthenticated':
            return state;
        case 'set_user':
            return {
                ...state,
                authenticated: true,
                loadingUser: false,
                user: action.payload,
            };
        case 'set_notifications':
            return {
              ...state,
              notifications: action.payload
            };
        case 'set_likes':
            return {
              ...state,
              likes: action.payload
            }
        case 'loading_user':
            return {
                ...state,
                loadingUser: true
            };
        case 'set_errors':
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case 'clear_errors':
            return {
                ...state,
                loading: false,
                errors: {}
            };
        case 'loading_ui':
            return {
                ...state,
                loading: true
            };
        case 'loading_data':
            return {
              ...state,
              loadingData: true
            };
        case 'set_data':
            return {
              ...state,
              loadingData: false,
              posts: action.payload
            };
        case 'set_post':
            return {
              ...state,
              loading: false,
              posts: [
                {
                  id: action.payload.id,
                  body: action.payload.body,
                  userId: action.payload.userId,
                  user: state.user,
                  createdAt: action.payload.createdAt,
                  comments_count: 0,
                  likes_count: 0,
                },
                ...state.posts,
              ]
            };    
        case 'like_post':
            let index = state.posts.findIndex((post) => post.id === action.payload.id);
            state.posts[index] = action.payload;
            return {
              ...state,
              likes:[ 
              ...state.likes,
              {
              post_id: action.payload.id
              }]
            };
        case 'unlike_post':
            let unlikeIndex = state.posts.findIndex((post) => post.id === action.payload.id);
            state.posts[unlikeIndex] = action.payload;
            return {
              ...state,
              likes: state.likes.filter(like => like.post_id !== action.payload.id)
            };
        default:
            return state;    
    }
}