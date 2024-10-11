<template>
	<header class="grid gap-y-4 py-4 px-4 md:px-5 bg-transparent border-b lg:grid-cols-3 grid-cols-2 gap-0">
		<section class="flex items-center gap-2 order-1 col-span-1">
			<nuxt-link to="/dashboard" class="btn p-0.5">
				<ChevronLeft />
			</nuxt-link>
			<client-only>
				<h1 class="text-lg sm:text-xl font-medium truncate">
					{{ form?.title || 'Untitled Form' }}
				</h1>
			</client-only>
		</section>

		<section class="flex items-center justify-center lg:justify-center sm:justify-end order-3 lg:order-2 col-span-3 lg:col-span-1">
			<Tabs :selected="selected" :tabs="tabViews" @changed="updateTab($event)" />
		</section>

		<section class="flex items-center gap-2 justify-end col-span-1 order-2 lg:order-3">
			<Tooltip content="Copy form link">
				<button class="btn-sm sm:flex" @click="copyFormLink">
					<Link :size="18" />
				</button>
			</Tooltip>

			<Tooltip content="View form">
				<button class="btn-sm sm:flex" @click="viewForm">
					<SquareArrowOutUpRight :size="18" />
				</button>
			</Tooltip>

			<Tooltip content="Preview form">
				<button class="btn-sm sm:flex" @click="previewForm">
					<EyeIcon :size="18" />
				</button>
			</Tooltip>

			<Tooltip :content="form?.is_published ? 'Save changes' : 'Publish form'">
				<button class="btn-sm sm:w-auto" @click="updateForm">
					<span v-if="!loading">{{ form?.is_published ? 'Save' : 'Publish' }}</span>
					<Spinner v-else :light="false" size="18px" />
				</button>
			</Tooltip>
		</section>
	</header>
</template>

<script setup lang="ts">
import { ChevronLeft, Link, SquareArrowOutUpRight, EyeIcon } from 'lucide-vue-next'
// import Tooltip from '@/components/ui/Tooltip.vue'
import { useTabs } from '@/composables/utils/tabs'
import Build from '@/pages/form/[id]/build.vue'
import Design from '@/pages/form/[id]/design.vue'
import Integrations from '@/pages/form/[id]/integrations.vue'
import Results from '@/pages/form/[id]/results.vue'
import Settings from '@/pages/form/[id]/settings.vue'
import { useFetchFormById } from '@/composables/dashboard/forms/id'
import { useUpdateForm } from '@/composables/dashboard/forms/update'
import { useCopyToClipboard } from '@/composables/utils/share'


const { updateForm, loading } = useUpdateForm()
const { form } = useFetchFormById()
const { initTabs, selected, tabViews, tabs } = useTabs()
const { copyData } = useCopyToClipboard()


const updateTab = (tab: string) => {
	selected.value = tab
	useRouter().push({ name: `form-id-${tab}` })
}

const copyFormLink = () => {
	copyData({ info: `${location.host}/v/${form.value.id}`, msg: 'Link copied!' })
}

const previewForm = () => {
	window.open(`http://${location.host}/preview/${form.value.id}`, '_blank')
}
const viewForm = () => {
	window.open(`http://${location.host}/v/${form.value.id}`, '_blank')
}


initTabs(
	'Build',
	['build', 'design', 'integrations', 'results', 'settings'],
	markRaw({ Build, Design, Integrations, Results, Settings })
)

watch(() => useRoute().name, (newVal) => {
	const selectedTab = (useRoute().name as string)?.split('-')[2]
	selected.value = selectedTab
}, { immediate: true })

</script>

<style scoped>
.btn-primary {
	@apply text-sm px-3 py-2 md:text-base md:px-5 md:py-3;
}

.btn-sm {
	@apply px-2 py-1 text-xs sm:px-3 sm:text-sm;
}
</style>
