<template>
	<div>
		<TooltipProvider>
			<TooltipRoot>
				<TooltipTrigger as-child>
					<slot />
				</TooltipTrigger>
				<TooltipContent
					class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade text-xs !border border-dark data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-grass11 select-none rounded-md bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
					:side="side"
					:align="align">
					{{ content }}
					<TooltipArrow class="tooltip-arrow" />
				</TooltipContent>
			</TooltipRoot>
		</TooltipProvider>
	</div>
</template>

<script setup lang="ts">
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow } from 'radix-vue'

defineProps<{
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}>()
</script>

<style scoped>
.tooltip-content {
  @apply bg-gray-800 text-white px-2 py-1 rounded text-sm;
}

.tooltip-arrow {
  @apply fill-gray-800;
}
</style>
