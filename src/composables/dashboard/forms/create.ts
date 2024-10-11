import { v4 as uuidv4 } from 'uuid'
import uid from 'tiny-uid'
import { AtSign, FileIcon, PhoneIcon, CheckSquare2, CircleDot } from 'lucide-vue-next'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import TextIcon from '@/assets/icons/Text.vue'
import LongTextIcon from '@/assets/icons/LongText.vue'

export interface Field {
    id: string
    pos: number
    label: string
    type: string
    required: boolean
    options?: string[]
}

export interface Form {
    user_id: string
    title: string
    description: string
    id: string
    fields: Field[]
    created_at: Date
    updated_at: Date
    status: string
    is_published: boolean
}
export interface FieldType {
    label: string
    value: string
    icon: any
}

export const fieldTypes: FieldType[] = [
    { label: 'Text', value: 'TEXT', icon: shallowRef(TextIcon) },
    { label: 'Textarea', value: 'TEXTAREA', icon: shallowRef(LongTextIcon) },
    { label: 'Email', value: 'EMAIL', icon: shallowRef(AtSign) },
    { label: 'Phone', value: 'PHONE', icon: shallowRef(PhoneIcon) },
    { label: 'Multiple Choice', value: 'RADIO', icon: shallowRef(CircleDot) },
    { label: 'Checkboxes', value: 'CHECKBOX', icon: shallowRef(CheckSquare2) },
    { label: 'File', value: 'FILE', icon: shallowRef(FileIcon) }

    // { label: 'Number', value: 'NUMBER', icon: ChevronDownIcon },
    // { label: 'Date', value: 'DATE', icon: ChevronDownIcon },
    // { label: 'Checkbox', value: 'CHECKBOX', icon: ChevronDownIcon },
    // { label: 'Radio', value: 'RADIO', icon: ChevronDownIcon },
    // { label: 'Select', value: 'SELECT', icon: ChevronDownIcon },

]

export const useCreateForm = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)


    const initForm = async () => {
        const id = uuidv4()
        const initial_data = {
            user_id: user_id.value,
            title: '',
            description: '',
            created_at: new Date(),
            updated_at: new Date(),
            status: 'DRAFT',
            is_published: false,
            id,
            fields: [
                {
                    id: uid(),
                    pos: 0,
                    label: 'Name',
                    type: 'TEXT',
                    required: true
                }
            ]

        } as Form

        const form = await setFirestoreDocument('forms', id, initial_data)
        useRouter().push(`/form/${id}/build`)
    }


    return { initForm, loading }
}
