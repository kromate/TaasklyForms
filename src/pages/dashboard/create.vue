<template>
	<main class="flex flex-col gap-4 p-4">
		<DashboardBookingTypesCreate :edit="false" :loading="false" />
	</main>
</template>



<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'




definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
		usePageHeader().setPageHeader({
			title: 'Create Booking Type',
			description: 'Create a new booking type',
			btnText: 'create  ',

			shouldShowFab: false,
			shouldShowTab: true

		})
	}]
})
</script>

<style scoped></style>
