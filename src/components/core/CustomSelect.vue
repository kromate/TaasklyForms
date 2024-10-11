<template>
	<Listbox v-model="selectedOption" as="div" class="relative">
		<ListboxButton class="input_field_gray w-auto  flex items-center justify-between min-w-40">
			<div class="flex gap-3 items-center">
				<component :is="selectedOption.icon.value ? selectedOption.icon.value : selectedOption.icon" class="h-4 w-4 text-dark" aria-hidden="true" />
				<span class="text-base">{{ selectedOption.label }}</span>
			</div>
			<ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
		</ListboxButton>

		<transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
			<ListboxOptions class="absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-dark">
				<ListboxOption v-for="option in options" :key="option.value" v-slot="{ active, selected }" :value="option">
					<li
						:class="[active ? ' bg-hover text-dark' : 'text-dark', 'cursor-default select-none relative py-2 pl-5  flex items-center gap-3']"

					>
						<component :is="option.icon.value" class="h-4 w-4" aria-hidden="true" />
						<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate text-base']">
							{{ option.label }}
						</span>
					</li>
				</ListboxOption>
			</ListboxOptions>
		</transition>
	</Listbox>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronDownIcon } from 'lucide-vue-next'

interface Option {
  value: string
  label: string
  icon: any
}

const props = defineProps<{
  options: Option[]
  modelValue: Option | string
}>()

const emit = defineEmits(['update:modelValue'])

const selectedOption = shallowRef<Option>(props.modelValue as Option)

watch(() => props.modelValue, (newValue) => {
    if (typeof newValue === 'string') {
        const option = props.options.find((option) => option.value === newValue)
        if (option) {
            selectedOption.value = option
        }
    } else {
        selectedOption.value = newValue
    }
}, { immediate: true, deep: true })

watch(selectedOption, (newValue) => {
  emit('update:modelValue', newValue.value)
})
</script>
