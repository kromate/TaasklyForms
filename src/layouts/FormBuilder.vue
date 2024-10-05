<template>
	<div class="min-h-screen">
		<section class="flex flex-col">
			<LayoutsFormBuilderHeader />
			<slot />
		</section>

		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts"></script>
