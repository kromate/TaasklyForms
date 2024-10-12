<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-4">
			Form Submissions
		</h1>
		<p class="text-gray-600 mb-6">
			View the results of your form.
		</p>

		<div v-if="submissionsLoading" class="flex justify-center items-center h-64">
			<Spinner size="40px" />
		</div>

		<div v-else-if="fetchedFormSubmissions.length > 0">
			<Table
				:headers="tableHeaders"
				:table-data="tableData"
				:loading="submissionsLoading"
			>
				<template #empty>
					<div class="text-center text-gray-500">
						No submissions yet.
					</div>
				</template>
			</Table>
		</div>

		<div v-else class="text-center text-gray-500">
			No submissions yet.
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FileText } from 'lucide-vue-next'
import { useFetchFormById } from '@/composables/dashboard/forms/id'
import { useFetchFormSubmissions } from '@/composables/dashboard/forms/submissions/fetch'
import { usePageHeader } from '@/composables/utils/header'

const id = useRoute().params.id as string

const { form, loading: formLoading, fetchFormById } = useFetchFormById()
const { fetchedFormSubmissions, loading: submissionsLoading, fetchUserFormSubmissions } = useFetchFormSubmissions()

// Fetch both form and submissions
fetchFormById(id)
fetchUserFormSubmissions(id)

const tableHeaders = computed(() => {
	if (form.value && form.value.fields) {
		return form.value.fields.map((field) => ({
			text: field.label,
			value: field.id
		}))
	}
	return []
})

const tableData = computed(() => {
	if (!form.value || !form.value.fields) return []

	return fetchedFormSubmissions.value.map((submission) => {
		const rowData = {}
		for (const field of form.value.fields) {
			rowData[field.id] = submission.response[field.id] || '-'
		}
		return rowData
	})
})

const isLoading = computed(() => formLoading.value || submissionsLoading.value)

definePageMeta({
	layout: 'form-builder',
	middleware: [
		'is-authenticated',
		() => {
			usePageHeader().setPageHeader({
				title: 'Form Builder | Results',
				description: 'View the results of your form'
			})
		}
	]
})
</script>

<style>
.bg-pattern {
	background-image:
		linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
		linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
		linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
		linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
	background-size: 20px 20px;
	background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
</style>
