<template>
	<main class="flex flex-col gap-4 p-4">
		<div v-if="true">
			dashboard
		</div>

		<div v-else class="flex flex-col gap-4">
			<Skeleton v-for="n in 3" :key="n" height="122px" radius="6px" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'







definePageMeta({
	layout: 'dashboard',
	middleware: ['is-authenticated', () => {
		usePageHeader().setPageHeader({
			title: 'Booking Types',
			description: 'Configure the types of bookings you offer.',
			btnText: 'Add Booking',
			btnCall: () => useRouter().push('/dashboard/create'),
			shouldShowFab: true,
			shouldShowTab: usePageHeader().isLargeScreen.value

		})
	}]
})
</script>

<style scoped></style>
