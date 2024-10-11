<template>
	<draggable
		v-model="formFields"
		group="fields"
		item-key="pos"
		class="flex flex-col gap-4  h-full"
	>
		<template #item="{ element: field }">
			<transition
				name="glide_up"
				appear
			>
				<div :key="field.pos" class="shadow-md p-4 pt-2 rounded-md border w-full">
					<GripHorizontal class="cursor-move mx-auto mb-2" :size="20" />
					<div class="flex justify-between items-center gap-2">
						<input v-model="field.label" type="text" class="input_field_gray w-auto flex-1" placeholder="Label">
						<CustomSelect v-model="field.type" :options="fieldTypes" />
					</div>
					<div v-if="field.type === 'RADIO' || field.type === 'CHECKBOX'" class="mt-4">
						<label class="block mb-2 font-medium">Options:</label>
						<draggable
							v-model="field.options"
							group="options"
							item-key="index"
							class="flex flex-col gap-2"
						>
							<template #item="{ index }">
								<div class="flex items-center gap-3">
									<GripVertical class="cursor-move" :size="16" />
									<div class="border-2 border-line h-5 w-5" :class="field.type === 'CHECKBOX' ? 'rounded-sm' : 'rounded-full'" />
									<input
										v-model="field.options[index]"
										type="text"
										class="input_field_gray w-full"
										placeholder="Option"
									>
									<button class="ml-2 text-red-500" @click="removeOption(field, index)">
										<X :size="16" />
									</button>
								</div>
							</template>
						</draggable>
						<button class="btn-sm mt-2" @click="addOption(field)">
							Add Option
						</button>
					</div>
					<footer class="flex justify-end gap-4 mt-4 items-center border-t pt-4">
						<Copy class="cursor-pointer" :size="20" @click="duplicateFormField(field)" />
						<Trash2 class="cursor-pointer" :size="20" @click="deleteFormField(field)" />

						<div class="w-0 h-6 border-r border-dark" />
						<span class="flex gap-2 text-sm">
							Required
							<Switch v-model="field.required" />
						</span>
					</footer>
				</div>
			</transition>
		</template>
	</draggable>
</template>

<script setup lang="ts">
import { TransitionGroup } from 'vue'
import draggable from 'vuedraggable'
import { Copy, Trash2, GripHorizontal, GripVertical, X } from 'lucide-vue-next'
import { fieldTypes } from '@/composables/dashboard/forms/create'
import { useFetchFormById } from '@/composables/dashboard/forms/id'

const { duplicateFormField, deleteFormField, addOption, removeOption } = useFetchFormById()

const formFields = defineModel<any[]>('formFields', {
	required: true
})







watch(() => formFields.value, (newFields) => {
	newFields.forEach((field) => {
		const type = typeof field.type === 'string' ? field.type : field.type.value
		if ((type === 'RADIO' || type === 'CHECKBOX') && !field.options) {
			field.options = ['Option 1']
		}
	})
}, { deep: true })
</script>

<style>
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
.list-move {
	transition: transform 0.5s;
}


</style>
