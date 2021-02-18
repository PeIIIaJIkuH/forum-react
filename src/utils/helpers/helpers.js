import moment from 'moment'
import notification from 'antd/lib/notification'

export const updateObjectInArray = (items, itemId, prop, newObjProp) => items.map(e =>
	e[prop] === itemId ? {...e, ...newObjProp} : e
)

export const getObjectInArray = (items, itemId, prop) => {
	return items.find(e => e[prop] === itemId)
}

export const getPostRating = (userRating, postRating, reaction) => {
	if (userRating !== 0) {
		if (userRating === reaction) {
			userRating = 0
			postRating -= reaction
		} else {
			userRating *= -1
			postRating += 2 * userRating
		}
	} else {
		userRating = reaction
		postRating += reaction
	}
	return [userRating, postRating]
}

export const getDateDifference = (createdAt, long) => {
	const date = moment(new Date(createdAt * 1000))
	const now = moment()
	const arr = ['months', 'days', 'hours', 'minutes', 'seconds'].map(e => ({
		num: now.diff(date, e),
		type: e
	}))
	if (!long) {
		arr[0].type = 'M'
		arr[1].type = 'D'
		arr[2].type = 'h'
		arr[3].type = 'm'
		arr[4].type = 's'	
	}
	return arr.find(e => {
		if (e.num > 0) return `${+e.num} ${e.type}`
		return false
	})
}

export const getRandomInt = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

export const groupBy = key => array =>
	array && array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key]
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
		return objectsByKeyValue
	}, {})

export const notificationType = {
	SUCCESS: 'success',
	INFO: 'info',
	WARNING: 'warning',
	ERROR: 'error'
}


export const openNotification = (type, message, description) => {
	notification[type]({message, description, placement: 'bottomRight', duration: 3})
}