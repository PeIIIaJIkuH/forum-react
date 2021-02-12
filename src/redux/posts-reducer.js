import {postAPI, userAPI} from '../api/requests'
import {getObjectInArray, getPostRating, toastOptions, updateObjectInArray} from '../utils/helpers/helpers'
import history from '../history'
import {toast} from 'react-toastify'
import {setProgress} from './app-reducer'

const SET_POSTS = 'posts/SET_POSTS',
	SET_RATING = 'posts/SET_RATING',
	SET_USER = 'posts/SET_USER',
	SET_COMMENTS = 'posts/SET_COMMENTS',
	DELETE_POST = 'posts/DELETE_POST',
	SET_POST_TO_EDIT = 'posts/SET_POST_TO_EDIT'

const initialState = {
	posts: null,
	user: null,
	comments: null,
	postToEdit: null
}

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_POSTS:
			if (!action.payload.posts && action.payload.allowNull) return {...state, posts: null}
			return {...state, posts: action.payload.posts}
		case SET_RATING:
			const post = getObjectInArray(state.posts, action.payload.id, 'id')
			const [userRating, postRating] = getPostRating(post.userRating, post.postRating, action.payload.reaction)
			return {
				...state,
				posts: updateObjectInArray(state.posts, action.payload.id, 'id',
					{postRating, userRating})
			}
		case SET_USER:
			return {...state, user: action.payload}
		case SET_COMMENTS:
			return {...state, comments: action.payload}
		case DELETE_POST:
			return {...state, posts: state.posts.filter(post => post.id !== action.payload)}
		case SET_POST_TO_EDIT:
			return {...state, postToEdit: action.payload}
		default:
			return state
	}
}

const setPostsAC = posts => ({
	type: SET_POSTS,
	payload: {posts}
})

const setRatingAC = (id, reaction) => ({
	type: SET_RATING,
	payload: {id, reaction}
})

const setUserAC = user => ({
	type: SET_USER,
	payload: user
})

const setCommentsAC = comments => ({
	type: SET_COMMENTS,
	payload: comments
})

const deletePostAC = postID => ({
	type: DELETE_POST,
	payload: postID
})

const setPostToEditAC = post => ({
	type: SET_POST_TO_EDIT,
	payload: post
})

export const requestAllPosts = () => async dispatch => {
	dispatch(setProgress(0))
	const data = await postAPI.all()
	await dispatch(setPostsAC(data.data))
	dispatch(setProgress(100))
}

export const requestUserPosts = id => async dispatch => {
	dispatch(setProgress(0))
	const data = await userAPI.getCreatedPosts(id)
	await dispatch(setPostsAC(data.data))
	dispatch(setProgress(100))
}

export const requestRatedPosts = reaction => async dispatch => {
	dispatch(setProgress(0))
	const data = await userAPI.getRatedPosts(reaction)
	await dispatch(setPostsAC(data.data))
	dispatch(setProgress(100))
}

export const requestPost = id => async dispatch => {
	let res = false
	dispatch(setProgress(0))
	const data = await postAPI.get(id)
	if (data.data) {
		await dispatch(setPostsAC([data.data]))
		res = true
	}
	dispatch(setProgress(100))
	return res
}

export const requestPostsByCategories = categories => async dispatch => {
	dispatch(setProgress(0))
	if (categories) {
		const data = await postAPI.getByCategories(categories)
		await dispatch(setPostsAC(data.data))
		history.push('/by-categories')
	}
	dispatch(setProgress(100))
}

export const setRating = (id, reaction) => async dispatch => {
	dispatch(setProgress(0))
	await postAPI.rate(id, reaction)
	await dispatch(setRatingAC(id, reaction))
	dispatch(setProgress(100))
}

export const requestUser = id => async dispatch => {
	let res = false
	dispatch(setProgress(0))
	const data = await userAPI.get(id)
	if (data.data) {
		await dispatch(setUserAC(data.data))
		res = true
	}
	dispatch(setProgress(100))
	return res
}

export const requestComments = id => async dispatch => {
	dispatch(setProgress(0))
	const data = await postAPI.getComments(id)
	await dispatch(setCommentsAC(data.data))
	dispatch(setProgress(100))
}

export const deletePost = id => async dispatch => {
	dispatch(setProgress(0))
	const data = await postAPI.delete(id)
	if (data && data.status) {
		await dispatch(deletePostAC(id))
	} else {
		toast.warning('Could not delete this post.', toastOptions)
	}
	dispatch(setProgress(100))
}

export const setPostToEdit = post => async dispatch => {
	dispatch(setPostToEditAC(post))
}

export default postsReducer