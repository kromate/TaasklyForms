import { form } from './id'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'
import { useAlert } from '@/composables/core/notification'






export const useUpdateForm = () => {
    const loading = ref(false)

    const updateForm = async () => {
        const formData = {
            ...form.value,
            fields: form.value.fields.map((field: any) => ({
                ...field,
                type: typeof field.type === 'string' ? field.type : field.type.value
            })),
            updated_at: new Date()
        }

        if (!validateSaveForm()) {
            return
        }

        try {
            loading.value = true
            await updateFirestoreDocument('forms', form.value.id, formData)
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Form updated successfully', addrs: 'useUpdateForm' })
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useUpdateForm' })
        }
    }

    return { updateForm, loading }
}



const validateSaveForm = () => {
    const validField = form.value.fields.every((field: any) => {
        const hasLabelAndType = field.label && field.type
        const hasValidOptions = !field.options || (Array.isArray(field.options) && field.options.every((option: string) => option.trim() !== ''))
        return hasLabelAndType && hasValidOptions
    })

    if (!form.value.title) {
        useAlert('BOTTOM').openAlert({ type: 'ERROR', msg: 'Please fill a form title', addrs: 'useUpdateForm' })
        return false
    }

    if (!validField) {
        useAlert('BOTTOM').openAlert({ type: 'ERROR', msg: 'All fields must have a label, and if options are present, they cannot be empty', addrs: 'useUpdateForm' })
        return false
    }

    return true
}
