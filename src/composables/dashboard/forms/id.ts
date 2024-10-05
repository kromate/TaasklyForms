import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'


const form = ref()
const loading = ref(false)

export const useFetchFormById = () => {
    const { id: user_id } = useUser()

    const fetchFormById = async (id: string) => {
        loading.value = true
        try {
            await getSingleFirestoreDocument('forms', id, form)
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useFetchFormById' })
        }
    }



    return { form, loading, fetchFormById }
}
