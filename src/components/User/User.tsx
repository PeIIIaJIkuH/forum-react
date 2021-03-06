import React, {FC, useEffect, useState} from 'react'
import s from './User.module.css'
import {userCommentsSelector, userSelector} from '../../redux/selectors'
import {requestCommentedPosts, requestRatedPosts, requestUserPosts} from '../../redux/posts-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'
import {UserInfo} from './UserInfo'
import {Helmet} from 'react-helmet'
import {Error404} from '../common/errors/Error404'
import Menu from 'antd/lib/menu'
import {MenuItem} from '../LeftMenu/MenuItem'
import {CommentOutlined, DislikeOutlined, LikeOutlined, UserOutlined} from '@ant-design/icons'
import {Posts} from '../Posts/Posts'
import {requestUser} from '../../redux/user-reducer'

export const User: FC = () => {
	const user = useSelector(userSelector),
		userComments = useSelector(userCommentsSelector),
		match = useRouteMatch<{ id: string }>()

	const dispatch = useDispatch()

	const urlId = match.params.id,
		[check, setCheck] = useState(true)

	useEffect(() => {
		const initialize = async () => {
			const ok: any = await dispatch(requestUser(+urlId))
			if (!ok)
				setCheck(false)
			dispatch(requestUserPosts(+urlId))
		}
		initialize().then()
	}, [urlId, dispatch])

	if ((urlId !== undefined && isNaN(+urlId)) || !check)
		return <Error404/>

	const onClick = ({key}: any) => {
		if (key === 'created')
			dispatch(requestUserPosts(+urlId))
		else if (key === 'up-voted')
			dispatch(requestRatedPosts(+urlId, 'up-voted'))
		else if (key === 'down-voted')
			dispatch(requestRatedPosts(+urlId, 'down-voted'))
		else
			dispatch(requestCommentedPosts(+urlId))
	}

	const title = user ? user.username : 'User Page'

	return user && <>
		<Helmet><title>{title} | forume</title></Helmet>
		<UserInfo user={user}/>
		<Menu className={s.menu} mode='horizontal' defaultSelectedKeys={['created']} onClick={onClick}>
			<MenuItem key='created' title='Created Posts' icon={<UserOutlined/>} forAll available/>
			<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} forAll available/>
			<MenuItem key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>} forAll available/>
			<MenuItem key='commented' title='Commented Posts' icon={<CommentOutlined/>} forAll available/>
		</Menu>
		<Posts userComments={userComments}/>
	</>
}