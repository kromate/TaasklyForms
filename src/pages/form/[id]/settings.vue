<template>
	<div class="h-[86dvh] flex items-center justify-center bg-gray-100 bg-pattern p-4">
		<div class="bg-white bg-opacity-90 rounded-xl p-12 text-center shadow-md border border-line">
			<Cog class="w-16 h-16 mb-4 text-indigo-600 mx-auto" />
			<h1 class="text-4xl mb-4 text-gray-800">
				Settings section
			</h1>
			<p class="text-base text-gray-600 mb-2">
				Manage your form settings.
			</p>
			<ColorBadge name="Coming Soon" color="magenta" />

			<p class="text-xl text-gray-600">
				Form ID: {{ id }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Cog } from 'lucide-vue-next'
import { useFetchFormById } from '@/composables/dashboard/forms/id'
import { usePageHeader } from '@/composables/utils/header'

const id = useRoute().params.id as string

const { form, loading, fetchFormById } = useFetchFormById()

fetchFormById(id)

definePageMeta({
  layout: 'form-builder',
  middleware: [
    'is-authenticated',
    () => {
      usePageHeader().setPageHeader({
        title: 'Form Builder | Settings',
        description: 'Manage your form settings'
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
