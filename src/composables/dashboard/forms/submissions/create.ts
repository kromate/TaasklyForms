import { callFirebaseFunction } from '@/firebase/functions'
import { useAlert } from '@/composables/core/notification'

export const useCreateFormSubmission = () => {
    const loading = ref(false)
    const formData = ref({})

    const createFormSubmission = async (form_object: any) => {
        loading.value = true
        const sent_data = {
            form_id: form_object.id,
            response: formData.value
        }

        const res = await callFirebaseFunction('createFormSubmission', sent_data) as any

        if (res.code === 200) {
            useAlert().openAlert({ type: 'SUCCESS', msg: res.msg, addrs: 'useCreateFormSubmission' })
            loading.value = false
            useRouter().push(`/v/${form_object.id}/submitted`)
        } else {
            useAlert().openAlert({ type: 'ERROR', msg: res.msg, addrs: 'useCreateFormSubmission' })
            loading.value = false
        }
    }

    return { loading, createFormSubmission, formData }
}
