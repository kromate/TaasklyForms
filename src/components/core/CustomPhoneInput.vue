<template>
	<div class="field relative">
		<input
			id="phone"
			v-model="phone_number"
			name="phone"
			:placeholder="placeholder"
			type="tel"
			pattern="[0-9]*"
			inputmode="numeric"
			class="pl-[132px] !outline-none"
			:class="className"
			:disabled="disabled"
			:required="required"
			@input="handleInput"
		>
		<XCircle v-if="phone_number && !disabled" name="close-fill" class="w-4 absolute top-[25%] right-4 cursor-pointer" @click="clearInput" />

		<div ref="target" class="flex flex-col absolute top-[20%]">
			<ClientOnly>
				<DropdownMenuRoot v-slot="{ open }" @update:open="onDropdownOpenChange">
					<DropdownMenuTrigger as="button" :disabled="disabled" class="cursor-pointer flex items-center gap-2.5 p-1.5 px-2 pl-4 py-0 bg-transparent border-r border-neut3 !outline-none">
						<span class="text-xl">{{ selectedCountry.flag }}</span>
						<span class="truncate">{{ selectedCountry.dial_code }}</span>
						<ChevronDown name="down" :class="['ml-1 w-4 duration-300', open ? 'rotate-180' : '']" />
					</DropdownMenuTrigger>

					<DropdownMenuContent
						ref="dropdownContent"
						class="bg-white border border-dark z-20 py-6 absolute top-[2rem] -left-[60px] w-[325px] rounded overflow-hidden max-h-96 min-h-28"
					>
						<section class="relative w-full flex flex-col  text-sm ">
							<div class="px-7 relative">
								<input
									ref="searchInput"
									v-model="searchQuery"
									type="text"
									placeholder="Search country"
									class=" border-b border-gray-300 !outline-none  top-0 w-full px-7"
									autocomplete="off"
								>
							</div>

							<div class="flex flex-col  text-sm  overflow-y-auto md:max-h-96 max-h-40 hide-scrollbar">
								<DropdownMenuItem
									v-for="country in filteredCountries"
									:key="country.code"
									:data-country-code="country.code"
									class="flex  items-center gap-3 !outline-none px-7 py-2"
									:class="{ 'bg-grey border border-primary': country.code === selectedCountry.code }"
									@select="onDropdownClick(country)"
								>
									<span class="text-xl">{{ country.flag }}</span>
									<p class="cursor-pointer flex items-center text-base">
										{{ country.name }}
									</p>
									<span class="ml-auto text-neut5">{{ country.dial_code }}</span>
								</DropdownMenuItem>
							</div>
						</section>
					</DropdownMenuContent>
				</DropdownMenuRoot>
			</ClientOnly>
		</div>
	</div>
</template>



<script setup lang="ts">
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'radix-vue'
import { ChevronDown, XCircle } from 'lucide-vue-next'
import { nextTick, ref, computed, watch } from 'vue'
import countries from '@/composables/helpers/countries'

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

const selectedCountry = ref<Country>({ name: 'Nigeria', flag: '🇳🇬', code: 'NG', dial_code: '+234' })
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const isDropdownOpen = ref(false)

const phone_number = ref('')
const dial_code = computed(() => selectedCountry.value.dial_code)

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter Phone number'
  },
  label: {
    type: String,
    default: 'Phone number'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

// Check if a phone number is E.164 compliant
const isE164Compliant = (phoneNumber: string): boolean => {
  const e164Pattern = /^\+[1-9]\d{1,14}$/
  return e164Pattern.test(phoneNumber)
}

// Split E.164 compliant phone number into country code and subscriber number
const splitE164Number = (phoneNumber: string) => {
  const match = phoneNumber.match(/^\+(\d{1,3})(\d{1,14})$/)
  if (match) {
    return {
      countryCode: match[1],
      subscriberNumber: match[2]
    }
  }
  return null
}

watch(() => props.modelValue, (newValue) => {
  if (newValue === '') {
    selectedCountry.value = { name: 'Nigeria', flag: '🇳🇬', code: 'NG', dial_code: '+234' }
    phone_number.value = ''
  } else if (isE164Compliant(newValue)) {
    const splitNumber = splitE164Number(newValue)
    if (splitNumber) {
      const country = countries.find((country) => country.dial_code === `+${splitNumber.countryCode}`)
      if (country) {
        selectedCountry.value = country
        phone_number.value = splitNumber.subscriberNumber
      }
    }
  }
}, { immediate: true })

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const phoneWithoutDialCode = target.value.replace(/^0+/, '') // Remove leading zeros
  const phone = `${dial_code.value}${phoneWithoutDialCode}`
  emit('update:modelValue', phone)
}

const clearInput = () => {
  phone_number.value = ''
  emit('update:modelValue', '')
}

const onDropdownClick = (country: Country) => {
  selectedCountry.value = country
  const phone = `${country.dial_code}${Number(phone_number.value)}`
  emit('update:modelValue', phone)
}

const onDropdownOpenChange = (open: boolean) => {
  isDropdownOpen.value = open
  if (open) {
    nextTick(() => {
      searchInput.value?.focus()
      // scrollToSelectedCountry()
    })
  } else {
    searchQuery.value = '' // Clear search when dropdown closes
  }
}

const filteredCountries = computed(() => {
  return countries.filter((country) => country.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const dropdownContent = ref<InstanceType<typeof DropdownMenuContent> | null>(null)

const scrollToSelectedCountry = () => {
  nextTick(() => {
    if (dropdownContent.value) {
      const selectedElement = dropdownContent.value.$el.querySelector(`[data-country-code="${selectedCountry.value.code}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
    }
  })
}

// Add this computed property
const isCountrySelected = computed(() => (countryCode: string) => countryCode === selectedCountry.value.code)
</script>


<style scoped lang="scss">
.dropdown-content {
  background: #ffffff;
  box-shadow: 4px 4px 16px 5px rgba(27, 25, 36, 0.12);
  border-radius: 16px;
}


</style>

