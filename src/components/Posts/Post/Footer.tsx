import React, {FC} from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import history from '../../../history'
import {CommentOutlined} from '@ant-design/icons'
import {getDateDifference} from '../../../utils/helpers/helpers'
import {TPost} from '../../../types/types'

type Props = {
	post: TPost
}

const Footer: FC<Props> = ({post}) => {
	const created = getDateDifference(post.createdAt)

	const onClick = () => {
		history.push(`/user/${post.author.id}`)
	}

	return (
		<div className={s.footer}>
			<div className={s.author}>
				<Button className={s.user} type='text' onClick={onClick}>
					{post.author.username}
				</Button>
			</div>
			<div>
				{created ? `${created.num}${created.type}` : 'Just now'}
			</div>
			<Button type='text' onClick={() => history.push(`/post/${post.id}`)}>
				<span>{post && post.commentsNumber}</span>
				<CommentOutlined/>
			</Button>
		</div>
	)
}

export default Footer