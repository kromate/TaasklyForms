import { User } from 'firebase/auth'
import { useUser } from './user'
import { setFirestoreDocument } from '@/firebase/firestore/create'



export const afterAuthCheck = async (user: User | null) => {
    if (user) {
        const { fetchUserProfile } = useUser()
        const userProfile = await fetchUserProfile(user.uid) as any
        if (!userProfile?.value?.name) {
            await setFirestoreDocument('users', user.uid, {
                id: user.uid,
                name: user.displayName,
                photo_url: user.photoURL,
                email: user.email,
                phone: user.phoneNumber,
                username: user.displayName,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
        }
        const redirectUrl = useUser().redirectUrl.value
        useUser().redirectUrl.value = null
         useRouter().push(redirectUrl ?? '/dashboard')
    }
}

