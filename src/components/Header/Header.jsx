import React from 'react'
import s from './Header.module.css'
import {getIsAuthSelector, getUserIDSelector, getUsernameSelector} from '../../redux/selectors'
import {signout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import profile from '../../assets/img/profile.svg'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Image from 'antd/lib/image'
import Layout from 'antd/lib/layout'
import Affix from 'antd/lib/affix'

import {toast} from 'react-toastify'
import {toastOptions} from '../../utils/helpers/helpers'

const Header = ({isAuth, signout, username, userID}) => (
	<Affix offsetTop={1}>
		<Layout.Header className={s.header}>
			<Link to='/' className={s.logo}>
				<Image width={50} src={logo} preview={false} alt='logo'/>
				foru<span>me</span>
			</Link>
			<Input.Search className={s.search} placeholder='Search something' enterButton size='middle'
						  onSearch={() => {
							  toast.warning('This feature will be added soon!', toastOptions)
						  }}/>
			{isAuth ?
				<span className={s.actions}>
				<span className={s.profile}>
					<span className={s.username}>
						<Link to={`/user/${userID}`}>{username}</Link>
					</span>
					<Image width={40} src={profile} alt='profile' preview={false}/>
				</span>
				<Button type='link' danger onClick={() => {
					signout()
				}}>
					Sign Out
				</Button>
			</span> :
				<Link to='/signin'><Button type='link'>Sign In</Button></Link>}
		</Layout.Header>
	</Affix>
)

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	username: getUsernameSelector(state),
	userID: getUserIDSelector(state)
})

const mapDispatchToProps = {
	signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)