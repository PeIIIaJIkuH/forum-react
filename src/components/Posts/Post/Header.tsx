import React, {FC, useState} from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {DeleteOutlined, EditOutlined, MoreOutlined} from '@ant-design/icons'
import {Link, useHistory} from 'react-router-dom'
import Popover from 'antd/lib/popover'
import {TPost} from '../../../types/types'
import {DeletePost} from '../../../redux/posts-reducer'
import message from 'antd/lib/message'

type Props = {
	post: TPost
	userID: number | null
	deletePost: DeletePost
	postPage?: boolean
}

export const Header: FC<Props> = ({post, userID, deletePost, postPage}) => {
	const history = useHistory()

	const [loading, setLoading] = useState(false),
		[visible, setVisible] = useState(false)

	const onDelete = async () => {
		setVisible(false)
		setLoading(true)
		const ok: any = deletePost(post.id)
		if (ok)
			if (postPage)
				history.push('/')
			else {
				setLoading(false)
				message.error('Can not delete post!')
			}
	}

	const onEdit = async () => {
		setVisible(false)
		history.push(`/edit?id=${post.id}`)
	}

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const content = <>
		<div className={s.actions}>
			<Button type='text' icon={<EditOutlined/>} onClick={onEdit}/>
			<Button danger type='link' icon={<DeleteOutlined/>} onClick={onDelete} loading={loading}/>
		</div>
	</>

	return <>
		<div className={s.header}>
			<Link className={s.title} to={`/post/${post.id}`}>
				{post.title}
			</Link>
			{userID === post.author.id && <>
				<div className={s.more}>
					<Popover trigger='click' placement='bottom' visible={visible} onVisibleChange={handleVisibleChange}
							 content={content}>
						<Button type='text' icon={<MoreOutlined/>}/>
					</Popover>
				</div>
			</>}
		</div>
	</>
}