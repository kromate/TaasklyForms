<template>
	<main v-if="!loading" class="p-4 flex flex-col justify-center items-center container gap-4">
		<section class="flex flex-col gap-4 w-full">
			<input
				v-model="form.title"
				placeholder="Enter a Form Name"
				class="bg-gray-100 py-2 h-auto rounded-md px-5 md:text-4xl text-xl font-bold input-field  border-light focus:border-dark hover:border-dark"
			>
			<textarea
				v-model="form.description"
				placeholder="Enter a Form Description (Optional)"
				rows="4"
				class="bg-gray-100 py-2 h-auto rounded-md px-5 md:text-lg  input-field  border-light focus:border-dark hover:border-dark "
			/>
		</section>

		<section class="w-full">
			<FormFieldList v-model:form-fields="form.fields" />
		</section>

		<footer class="flex justify-center w-full">
			<button class="btn-primary w-full" @click="addNewFormField">
				Add Field
			</button>
		</footer>
	</main>
	<div v-else class="flex flex-col gap-4 container p-4">
		<Skeleton height="58px" width="100%" radius="6px" />
		<Skeleton height="74px" width="100%" radius="6px" />
		<Skeleton height="140px" width="100%" radius="6px" />
		<Skeleton height="140px" width="100%" radius="6px" />
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useFetchFormById } from '@/composables/dashboard/forms/id'

const id = useRoute().params.id as string

const { form, loading, fetchFormById, addNewFormField } = useFetchFormById()

fetchFormById(id)

definePageMeta({
  layout: 'form-builder',
  middleware: [
    'is-authenticated',
    () => {
      usePageHeader().setPageHeader({
        title: 'Form Builder',
        description: 'Create a new form'
      })
    }
  ]
})
</script>

<style scoped></style>
