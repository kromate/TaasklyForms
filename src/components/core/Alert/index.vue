
<template>
	<transition-group
		appear
		tag="aside"
		class="fixed  z-[1000] w-auto flex flex-col-reverse gap-4 !transition-all !duration-300"
		:class="alertPosition === 'TOP' ? 'top-4 right-4' : 'bottom-4 right-4'"
		name="list"
	>
		<AlertCard v-for="(alert, index) in openAlertArray" :id="alert.id" :key="alert.id" :data-index="index+1" :message="alert.msg" :addrs="alert.addrs" :type="alert.type" @closeAlert="closeAlert($event)" />
	</transition-group>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/core/notification'
const { openAlertArray, closeAlert, alertPosition } = useAlert()


</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


</style>
