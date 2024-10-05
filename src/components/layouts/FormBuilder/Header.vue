<template>
	<header class="grid gap-y-4 py-4 px-4 md:px-5 bg-transparent border-b lg:grid-cols-3 grid-cols-2 gap-0">
		<section class="flex items-center gap-2 order-1 col-span-1">
			<nuxt-link to="/dashboard" class="btn p-0.5">
				<ChevronLeft />
			</nuxt-link>
			<h1 class="text-lg sm:text-xl font-medium truncate">
				{{ form?.name || 'loading...' }}
			</h1>
		</section>

		<section class="flex items-center justify-center lg:justify-center sm:justify-end order-3 lg:order-2 col-span-3">
			<Tabs :selected="selected" :tabs="tabViews" @changed="updateTab($event)" />
		</section>

		<section class="flex items-center gap-2 justify-end col-span-1 order-2 lg:order-3">
			<button class="btn-sm  sm:flex">
				<Link :size="18" />
			</button>
			<button class="btn-sm  sm:flex">
				<SquareArrowOutUpRight :size="18" />
			</button>
			<button class="btn-sm  sm:w-auto">
				Publish
			</button>
		</section>
	</header>
</template>

<script setup lang="ts">
import { ChevronLeft, Link, SquareArrowOutUpRight } from 'lucide-vue-next'
import { useTabs } from '@/composables/utils/tabs'
import { usePageHeader } from '@/composables/utils/header'

import Build from '@/pages/form/[id]/build.vue'
import Design from '@/pages/form/[id]/design.vue'
import Integrations from '@/pages/form/[id]/integrations.vue'
import Results from '@/pages/form/[id]/results.vue'
import Settings from '@/pages/form/[id]/settings.vue'

import { useFetchFormById } from '@/composables/dashboard/forms/id'

const { headstate } = usePageHeader()

const { form, loading } = useFetchFormById()


const { initTabs, selected, tabViews, tabs } = useTabs()

const updateTab = (tab: string) => {
	selected.value = tab
	useRouter().push({ name: `form-id-${tab}` })
}

initTabs(
	'Build',
	['build', 'design', 'integrations', 'results', 'settings'],
	markRaw({ Build, Design, Integrations, Results, Settings })
)

onMounted(() => {
	const selectedTab = (useRoute().name as string)?.split('-')[2]
	selected.value = selectedTab
})

</script>

<style scoped>
.btn-primary {
	@apply text-sm px-3 py-2 md:text-base md:px-5 md:py-3;
}

.btn-sm {
	@apply px-2 py-1 text-xs sm:px-3 sm:text-sm;
}
</style>
