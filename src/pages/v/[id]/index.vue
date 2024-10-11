<template>
	<div class="container mx-auto px-4 py-8">
		<div v-if="form" class="max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold mb-4">
				{{ form.title }}
			</h1>
			<p v-if="form.description" class="text-gray-600 mb-6">
				{{ form.description }}
			</p>
			<form class="space-y-6" @submit.prevent="createFormSubmission">
				<FormFieldType v-for="field in form.fields" :key="field.pos" v-model:form-data="formData" :field="field" />

				<div>
					<button type="submit" class="btn-primary w-full">
						Submit
					</button>
				</div>
			</form>
		</div>
		<div v-else class="text-center text-gray-600">
			Form not found or has been deleted.
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAPI } from '@/api_factory'
import { useCustomHead } from '@/composables/core/head'
import { useCreateFormSubmission } from '@/composables/dashboard/forms/submissions/create'

const { createFormSubmission, loading, formData } = useCreateFormSubmission()

const id = useRoute().params.id as string
	const { data: form, error } = await useAPI('/getFormById', {
			method: 'GET',
			query: { id }
	}) as { data: Ref<any>, error: any }


definePageMeta({
	layout: 'public'
})
</script>
