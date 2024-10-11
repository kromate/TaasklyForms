<template>
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="grid grid-cols-12 mt-7 py-1 gap-6">
			<article v-for="form in forms" :key="form.id" class="bg-white relative rounded-md mx-4 shadow-md hover:btn_shadow col-span-12 md:col-span-6 lg:col-span-3 border border-dark">
				<a :href="`/form/${form.id}/build`" class="text-center px-2 h-40 flex items-center justify-center rounded-t-lg bg-cover bg-center bg-no-repeat" :style="{ backgroundColor: form.backgroundColor, color: form.textColor, backgroundImage: `url('${form.backgroundImage}')` }">
					<h1 class="text-2xl font-light px-2 line-clamp-4">{{ form.title || 'Untitled Form' }}</h1>
				</a>
				<div class="p-4 border-t border-gray-200 flex items-center justify-between">
					<div>
						<div class="text-gray-500 items-center  cursor-default inline-block text-xs ">
							<a v-if="form.responseCount > 0" :href="`/form/${form.id}/submissions`">
								{{ form.responseCount }} {{ form.responseCount === 1 ? 'response' : 'responses' }}
							</a>
							<span v-else>
								No responses
							</span>
						</div>
					</div>
					<IconDropdown :children="dropdownChildren()" :data="form" />
				</div>
			</article>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Edit } from 'lucide-vue-next'

const dropdownChildren = () => {
    const res = [] as any[]


    res.push({ name: 'Edit ', func: (data) => { useRouter().push(`/form/${data.id}/build`) }, class: 'w-full', icon: Edit })


    // if (order.payment_status === 'UNPAID') {
    // 	res.push({ name: 'Generate Payment link', func: (data) => { shareShopPaymentLink(data.id) }, class: 'w-full' })
    // }



    return res
}


defineProps({
	forms: {
		type: Array as PropType<any[]>,
		required: true
	}
})
</script>

<style scoped></style>
