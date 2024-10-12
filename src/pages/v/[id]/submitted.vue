<template>
	<div class="min-h-screen flex items-center justify-center p-4">
		<div class="bg-white bg-opacity-90 rounded-xl p-6 sm:p-8 md:p-12 text-center shadow-md border border-line max-w-md  md:max-w-xl  w-full">
			<CheckCircle class="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-green-600 mx-auto" />
			<h1 class="text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800 font-bold">
				Form Submitted Successfully
			</h1>
			<p class="text-lg sm:text-xl text-gray-600 mb-6">
				Thank you for your submission. We've received your response.
			</p>
			<nuxt-link to="/" class="btn-primary block w-full sm:inline-block sm:w-auto">
				Create your own form
			</nuxt-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next'

definePageMeta({
	layout: 'public'
})
</script>

<style scoped>



</style>
