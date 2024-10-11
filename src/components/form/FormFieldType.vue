<template>
	<div class="flex flex-col gap-2">
		<label :for="field.label" class="block font-medium text-gray-700">
			<span> {{ field.label }} </span>
			<span v-if="field.required" class="text-red">*</span>
		</label>


		<input
			v-if="field.type === 'TEXT' || field.type === 'EMAIL'"
			:id="field.label"
			v-model="formData[field.id]"
			:type="field.type === 'EMAIL' ? 'email' : 'text'"
			:required="field.required"
			class="input_field_gray"
		>
		<textarea
			v-else-if="field.type === 'TEXTAREA'"
			:id="field.label"
			v-model="formData[field.id]"
			:required="field.required"
			rows="3"
			class="input_field_gray"
		/>
		<CustomPhoneInput
			v-else-if="field.type === 'PHONE'"
			:id="field.label"
			v-model="formData[field.id]"
			:required="field.required"
			rows="3"
			class-name="input_field_gray"
		/>
		<div v-else-if="field.type === 'CHECKBOX'" class="space-y-2">
			<div v-for="(option, index) in field.options" :key="index" class="flex items-center">
				<input
					:id="`${field.label}-${index}`"
					v-model="selectedCheckboxes"
					type="checkbox"
					:value="option"
					:required="field.required && selectedCheckboxes.length === 0"
					class="h-4 w-4 text-dark form-checkbox"
					@change="updateCheckboxes"
				>
				<label :for="`${field.label}-${index}`" class="ml-2 block text-sm text-gray-900">
					{{ option }}
				</label>
			</div>
		</div>
		<div v-else-if="field.type === 'RADIO'" class="space-y-2">
			<div v-for="(option, index) in field.options" :key="index" class="flex items-center">
				<input
					:id="`${field.label}-${index}`"
					v-model="formData[field.id]"
					type="radio"
					:name="field.label"
					:value="option"
					:required="field.required"
					class="h-4 w-4  border-gray-300 text-dark focus:ring-dark form-radio"
				>
				<label :for="`${field.label}-${index}`" class="ml-2 block text-sm text-gray-900">
					{{ option }}
				</label>
			</div>
		</div>
		<label
			v-else-if="field.type === 'FILE'"
			:for="field.label"
			class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 cursor-pointer"
		>
			<div class="space-y-1 text-center">

				<div v-if="!uploadedImage" class="flex flex-col items-center text-sm text-gray-600 gap-4">
					<ImagePlus class="mx-auto h-10 w-10 text-line" stroke-width="1.2" />
					<span class="font-medium text-base">Upload a file</span>
					<input
						:id="field.label"

						type="file"
						:required="field.required"
						class="sr-only form"
						@change="handleFileUpload($event, field.id)"
					>


				</div>
				<!-- <p class="text-xs text-gray-500">
					{{ field.fileType }} up to 10MB
				</p> -->
				<img
					v-if="uploadedImage"
					:src="uploadedImage"
					alt="Uploaded Image"
					class="mx-auto h-48 w-auto"
				>
			</div>
		</label>
	</div>
</template>

<script setup lang="ts">
import { ImagePlus } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { Field } from '@/composables/dashboard/forms/create'


const formData = defineModel<Record<string, any>>('formData', { required: true })
const uploadedImage = ref('')

const handleFileUpload = (event: Event, fieldName: string) => {
    const file = (event.target as HTMLInputElement).files?.[0]

	if (file) {
        (formData.value as Record<string, unknown>)[fieldName.trim()] = file

		if (file.type.startsWith('image/')) {
			uploadedImage.value = URL.createObjectURL(file)
		} else {
			uploadedImage.value = ''
		}
	}
}

const props = defineProps<{
	field: Field
}>()

const selectedCheckboxes = ref<string[]>([])

const updateCheckboxes = () => {
    formData.value[props.field.id] = selectedCheckboxes.value
}

</script>

<style scoped>

</style>
