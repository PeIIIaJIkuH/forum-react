import React, {FC, useState} from 'react'
import Menu from 'antd/lib/menu'
import {isAuthSelector} from '../../redux/selectors'
import {useSelector} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import {DislikeOutlined, FormOutlined, HomeOutlined, LikeOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons'
import {MenuItem} from './MenuItem'
import {CategoriesModal} from './CategoriesModal'

type Props = {
	mobile?: boolean
}

export const LeftMenu: FC<Props> = ({mobile}) => {
	const isAuth = useSelector(isAuthSelector),
		location = useLocation(),
		history = useHistory()

	const options = [location.pathname.split('/')[1] || 'home'],
		[modalVisible, setModalVisible] = useState(false),
		defaultKeys = ['home']

	const onClick = ({key}: any) => {
		if (key !== 'by-categories')
			history.push(`/${key === 'home' ? '' : key}`)
		else
			setModalVisible(true)
	}

	return (
		<Menu mode='inline' defaultSelectedKeys={defaultKeys} selectedKeys={options} onClick={onClick}>
			<MenuItem key='home' title='Home' icon={<HomeOutlined/>} isAuth={isAuth} forAll available/>
			<MenuItem key='my' title='My Posts' icon={<UserOutlined/>} isAuth={isAuth} available/>
			<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} isAuth={isAuth} available/>
			<MenuItem key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>} isAuth={isAuth} available/>
			{mobile && <>
				<MenuItem key='by-categories' title='By Categories' icon={<TagsOutlined/>} available forAll={mobile}/>
				<CategoriesModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
				<MenuItem key='create' title='Create Post' icon={<FormOutlined/>} forAll={mobile} available={mobile}/>
			</>}
		</Menu>
	)
}