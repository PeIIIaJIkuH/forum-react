import React from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signin, signup} from '../../redux/auth-reducer'
import {isAuthSelector, urlToSelector} from '../../redux/selectors'
import AuthForm from './AuthForm'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import history from '../../history'
import Error403 from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {setUrlTo} from '../../redux/app-reducer'
import {toast} from 'react-toastify'
import {toastOptions} from '../../utils/helpers/helpers'

const Auth = ({signup, signin, isAuth, register, urlTo, setUrlTo}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)

	const onSubmit = async ({username, email, password}) => {
		setIsFetching(true)
		if (register) {
			const ok = await signup(username, email, password)
			setIsFetching(false)
			if (ok) {
				toast.success('Successfully created new user!', toastOptions)
				form.resetFields()
				history.push('/auth/signin')
			} else {
				toast.error('Can not register, some error happened!', toastOptions)
			}
		} else {
			const ok = await signin(username, password)
			setIsFetching(false)
			if (ok) {
				if (urlTo) {
					await setUrlTo(null)
					history.push(urlTo)
				} else {
					history.push('/')
				}
			} else {
				toast.error('Can not log in, some error happened!', toastOptions)
			}
		}
	}

	const onClick = () => {
		form.resetFields()
	}

	if (isAuth) return <Error403 text='Sorry, you are authorized, you have no access to the authorization page.'/>

	return (
		<>
			<Helmet><title>{register ? 'Sign Up' : 'Sign In'} | forume</title></Helmet>
			<div className={s.wrapper}>
				<Card className={s.card} title={register ? 'Sign Up' : 'Sign In'}
					  extra={(
						  <Link to={register ? '/auth/signin' : '/auth/signup'} onClick={onClick}>
							  {register ? 'Sign In' : 'Sign Up'}
						  </Link>
					  )}>
					<AuthForm onsubmit={onSubmit} isSignup={register} form={form} isFetching={isFetching}/>
				</Card>
			</div>
		</>
	)
}

const mapStateToProps = state => ({
	isAuth: isAuthSelector(state),
	urlTo: urlToSelector(state)
})

const mapDispatchToProps = {
	signup,
	signin,
	setUrlTo
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)