<template>
	<div>
		<h1>Results</h1>
		{{ id }}
	</div>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useFetchFormById } from '@/composables/dashboard/forms/id'

const id = useRoute().params.id as string

const { form, loading, fetchFormById } = useFetchFormById()

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
