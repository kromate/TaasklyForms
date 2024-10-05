import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'





const fetchedForms = ref([] as any[])

const FormIsEmpty = computed(() => {
    return fetchedForms.value.length === 0
})

export const useFetchForms = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)

    const fetchUserForms = async () => {
        loading.value = true
        fetchedForms.value = []

        try {
            await getFirestoreCollectionWithWhereQuery('forms', fetchedForms, { name: 'user_id', operator: '==', value: user_id.value })

            console.log(fetchedForms.value)

            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { loading, fetchedForms, fetchUserForms, FormIsEmpty }
}

