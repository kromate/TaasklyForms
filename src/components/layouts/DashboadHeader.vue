<template>
	<header class=" flex items-center justify-between py-4 md:px-5 px-4 bg-transparent border-b">
		<img src="/lt.svg" alt="logo" class=" md:w-auto w-32">



		<div class="w-auto  block">
			<AvatarDropdown />
		</div>
	</header>
</template>

<script setup lang="ts">

import { usePageHeader } from '@/composables/utils/header'

import AvatarDropdown from '@/components/core/AvatarDropdown.vue'

const { headstate } = usePageHeader()


</script>

<style scoped>
.btn-primary {
	@apply text-sm px-5 py-3 md:text-base md:px-10
}
</style>
