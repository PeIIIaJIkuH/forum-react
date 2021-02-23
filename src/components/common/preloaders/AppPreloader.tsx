import React, {FC} from 'react'
import s from './AppPreloader.module.css'

const AppPreloader: FC = () => (
	<div className={s.wrapper}>
		<div className={s.boxes}>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
			<div className={s.box}>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
		</div>
	</div>
)

export default AppPreloader