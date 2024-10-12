import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'





const fetchedFormSubmissions = ref([] as any[])

const FormSubmissionsIsEmpty = computed(() => {
    return fetchedFormSubmissions.value.length === 0
})

export const useFetchFormSubmissions = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)

    const fetchUserFormSubmissions = async (id: string) => {
        loading.value = true
        fetchedFormSubmissions.value = []

        try {
            await getFirestoreSubCollection('forms', id, 'submissions', fetchedFormSubmissions)
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { loading, fetchedFormSubmissions, fetchUserFormSubmissions, FormSubmissionsIsEmpty }
}

