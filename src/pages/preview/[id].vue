<template>
	<div class="container mx-auto px-4 py-8 mb-40">
		<div v-if="loading" class="flex justify-center items-center h-64">
			<Spinner size="40px" />
		</div>
		<div v-else-if="form" class="max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold mb-4">
				{{ form.title }}
			</h1>
			<p v-if="form.description" class="text-gray-600 mb-6">
				{{ form.description }}
			</p>
			<form class="flex flex-col gap-5">
				<FormFieldType v-for="field in form.fields" :key="field.pos" v-model:form-data="formData" :field="field" />

				<div>
					<button type="submit" class="btn-primary w-full">
						Submit
					</button>
				</div>
			</form>
			<span class="fixed bottom-4 right-4">
				<ColorBadge name="preview mode" class="shadow-lg" color="#000fff" />
			</span>
		</div>
		<div v-else class="text-center text-gray-600">
			Form not found or has been deleted.
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetchFormById } from '@/composables/dashboard/forms/id'
import { useAlert } from '@/composables/core/notification'
import { callFirebaseFunction } from '@/firebase/functions'

const route = useRoute()
const { form, loading, fetchFormById } = useFetchFormById()
const formData = ref({})

onMounted(async () => {
  const id = route.params.id as string
  await fetchFormById(id)
})




definePageMeta({
  layout: 'public'
})
</script>
