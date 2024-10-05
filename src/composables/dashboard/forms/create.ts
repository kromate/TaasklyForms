import { v4 as uuidv4 } from 'uuid'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'


interface Field {
    pos: number
    label: string
    type: string
    required: boolean
}

interface Form {
    user_id: string
    name: string
    description: string
    id: string
    form_data: {
        title: string
        description: string
        fields: Field[]
    }
    created_at: Date,
    updated_at: Date,
    status: string,
    is_published: boolean
}

export const useCreateForm = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)


    const initForm = async () => {
        const id = uuidv4()
        const initial_data = {
            user_id: user_id.value,
            name: 'untitled form',
            created_at: new Date(),
            updated_at: new Date(),
            status: 'DRAFT',
            is_published: false,
            id,
            form_data: {
                title: 'untitled form',
                description: '',
                fields: [
                    {
                        pos: 0,
                        label: 'Name',
                        type: 'TEXT',
                        required: false
                    }
                ]
            }
        } as Form

        const form = await setFirestoreDocument('forms', id, initial_data)
        useRouter().push(`/form/${id}/build`)
    }


    return { initForm, loading }
}
