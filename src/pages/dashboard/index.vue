<template>
	<main class="flex flex-col gap-8 p-4 container mt-10">
		<header class="flex">
			<button class="btn-primary gap-4 px-4 ml-auto" @click="initForm">
				<span v-if="!createFormLoading" class="flex items-center gap-2">
					<PlusCircle name="plus" />
					Add Form
				</span>
				<Spinner v-else />
			</button>
		</header>
		<div v-if="!formsLoading && !FormIsEmpty">
			<FormList :forms="fetchedForms" />
		</div>

		<div v-if="formsLoading" class="flex flex-col gap-4">
			<Skeleton v-for="n in 3" :key="n" height="122px" radius="6px" />
		</div>

		<div
			v-if="FormIsEmpty && !formsLoading"
			class="flex flex-col items-center justify-center gap-4 mt-24"
		>
			<FileText :size="60" />
			<p class="text-2xl font-medium">
				You don't have any forms yet
			</p>
			<button class="btn-primary" @click="initForm">
				<span v-if="!createFormLoading">Add Form</span>
				<Spinner v-else />
			</button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { PlusCircle, FileText } from 'lucide-vue-next'
import { useFetchForms } from '@/composables/dashboard/forms/fetch'
import { useCreateForm } from '@/composables/dashboard/forms/create'

const { initForm, loading: createFormLoading } = useCreateForm()

const {
  loading: formsLoading,
  fetchedForms,
  fetchUserForms,
  FormIsEmpty
} = useFetchForms()

fetchUserForms()

definePageMeta({
  layout: 'dashboard',
  middleware: ['is-authenticated']
})
</script>

<style scoped></style>
