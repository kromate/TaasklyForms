


export const useCreateFormSubmission = () => {
    const loading = ref(false)
    const formData = ref({})

    const createFormSubmission = () => {
        console.log(formData)
    }

    return { loading, createFormSubmission, formData }
}
