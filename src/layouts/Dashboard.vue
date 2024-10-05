<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<LayoutsDashboadHeader />
			<slot />
			<a href="https://feedback.taaskly.site/c/forms" target="_blank" class="px-4 py-1 text-sm rounded-full bg-dark text-light fixed bottom-7 right-7 hover:underline">
				Drop us a feedback
			</a>
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">


</script>
