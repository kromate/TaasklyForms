

const ALERT_DURATION = 5000



const openAlertArray = ref([] as Record<string, any>[])

interface AlertTypes {
	type: 'Alert' | 'ERROR' | 'SUCCESS'
	msg: string
	addrs?: string
}

export const useAlert = (position: 'TOP' | 'BOTTOM' = 'TOP') => {
	const alertPosition = ref(position)
	const openAlert = ({ type, msg, addrs }: AlertTypes) => {
		const id = Date.now().toString()
		openAlertArray.value.push({ id, type, msg, addrs, position })
	}
	const closeAlert = (id:string) => {
		openAlertArray.value = openAlertArray.value.filter((alert: any) => alert.id !== id)
	}

	return { openAlert, closeAlert, ALERT_DURATION, openAlertArray, alertPosition }
}



