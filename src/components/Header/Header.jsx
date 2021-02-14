import React from 'react'
import s from './Header.module.css'
import {isAuthSelector, progressSelector, userIDSelector, usernameSelector} from '../../redux/selectors'
import {signout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import profile from '../../assets/img/profile.svg'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Image from 'antd/lib/image'
import Layout from 'antd/lib/layout'
import Affix from 'antd/lib/affix'
import {toast} from 'react-toastify'
import {toastOptions} from '../../utils/helpers/helpers'
import {LogoutOutlined} from '@ant-design/icons'
import LoadingBar from 'react-top-loading-bar'
import {setProgress, setUrlTo} from '../../redux/app-reducer'

const Header = ({isAuth, signout, username, userID, progress, setProgress, location, setUrlTo}) => {
	const onSignout = () => {
		signout()
	}

	const onFinished = () => {
		setProgress(0)
	}

	const onSearch = () => {
		toast.warning('This feature will be added soon!', toastOptions)
	}

	const onClick = async () => {
		await setUrlTo(location.pathname)
	}

	return (
		<Affix offsetTop={1} className='headerWrapper'>
			<Layout.Header className={s.header}>
				<LoadingBar color='#40a9ff' progress={progress} onLoaderFinished={onFinished}/>
				<Link to='/' className={s.logo}>
					<Image width={50} src={logo} preview={false} alt='logo'/>
					foru<span>me</span>
				</Link>
				<Input.Search className={s.search} placeholder='Search something' enterButton size='middle'
							  onSearch={onSearch}/>
				{isAuth ?
					<>
						<span className={s.actions}>
						<span className={s.profile}>
							<span className={s.username}>
								<Link to={`/user/${userID}`}>{username}</Link>
							</span>
							<Image width={40} src={profile} alt='profile' preview={false}/>
						</span>
						<Button type='link' icon={<LogoutOutlined/>} danger onClick={onSignout}>
							Sign Out
						</Button>
						</span>
					</> :
					<Link to='/auth/signin'>
						<Button type='link' onClick={onClick}>Sign In</Button>
					</Link>}
			</Layout.Header>
		</Affix>
	)
}

const mapStateToProps = state => ({
	isAuth: isAuthSelector(state),
	username: usernameSelector(state),
	userID: userIDSelector(state),
	progress: progressSelector(state)
})

const mapDispatchToProps = {
	signout,
	setProgress,
	setUrlTo
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))