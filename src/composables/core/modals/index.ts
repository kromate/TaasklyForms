import { useModal } from '../modal'

// ==================== AUTH ===============================
import Logout from '@/components/modals/auth/logout.vue'

// ==================== CORE ===============================
import Confirmation from '@/components/modals/core/Confirmation.vue'
import LoadingVerification from '@/components/modals/core/loading.vue'






type AuthTypes = 'Logout'
type CoreTypes = 'Confirmation' | 'LoadingVerification'
type WalletTypes = 'SendMoney'
type BottombarTypes = 'BottomMenu'


const AuthModals = { Logout } as Record<AuthTypes, any>
const CoreModals = { Confirmation, LoadingVerification } as Record<CoreTypes, any>




export const modal = useModal()
const authModal = modal.register('Auth', AuthModals)
const coreModal = modal.register('Core', CoreModals)






export const useAuthModal = () => authModal
export const useCoreModal = () => coreModal





