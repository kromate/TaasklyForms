import uid from 'tiny-uid'
import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'


export const form = ref()
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

    const addNewFormField = () => {
        form.value.fields.push({
            id: uid(),
            pos: form.value.fields.length,
            label: '',
            type: 'TEXT',
            required: true
        })
    }

    const duplicateFormField = (field: any) => {
        const index = form.value.fields.indexOf(field)
        const newField = {
            id: uid(),
            pos: form.value.fields.length,
            label: field.label,
            type: field.type,
            required: field.required
        } as any
        if (field.options) {
            newField.options = field.options
        }
        form.value.fields.splice(index + 1, 0, newField)
        // form.value.fields.push(newField)
    }

    const deleteFormField = (field: any) => {
        form.value.fields.splice(form.value.fields.indexOf(field), 1)
    }

    const addOption = (field: any) => {
	if (!field.options) {
		field.options = []
	}
	field.options.push('')
}

const removeOption = (field: any, index: number) => {
	field.options.splice(index, 1)
}


    return { form, loading, fetchFormById, addNewFormField, duplicateFormField, deleteFormField, addOption, removeOption }
}
