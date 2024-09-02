<script setup lang="ts">
import type { LIGHT_DARK_MODE } from '@/types/config.ts'
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from '@constants/constants.ts'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'
import {
    applyThemeToDocument,
    getStoredTheme,
    setTheme,
} from '@utils/setting-utils.ts'
import { onMounted, ref, onUnmounted, shallowRef } from 'vue'
import { Icon } from '@iconify/vue'

const modes: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, AUTO_MODE]

const lightDarkPanel = shallowRef<HTMLElement>()
const showPanel = () => lightDarkPanel.value!.classList.remove('float-panel-closed')
const hidePanel = () => lightDarkPanel.value!.classList.add('float-panel-closed')

const curMode = ref<LIGHT_DARK_MODE>(AUTO_MODE)
let perference: MediaQueryList
const onThemeChange = () => applyThemeToDocument(curMode.value)
onMounted(() => {
    curMode.value = getStoredTheme()
    perference = window.matchMedia('(prefers-color-scheme: dark)')
    perference.addEventListener('change', onThemeChange)
})
onUnmounted(() => perference.removeEventListener('change', onThemeChange))
const switchMode = (newMode: LIGHT_DARK_MODE) => {
    curMode.value = newMode
    setTheme(newMode)
}
const toggleMode = () => {
    let i = 0
    for (; i < modes.length; i++) {
        if (modes[i] === curMode.value) {
            break
        }
    }
    switchMode(modes[(i + 1) % modes.length])
}
</script>

<template>
    <div class="relative z-50" role="menu" tabindex="-1" @mouseleave="hidePanel">
        <button
            aria-label="Light/Dark Mode" role="menuitem"
            class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" 
            id="theme-switch"
            @click="toggleMode"
            @mouseenter="showPanel">
            <div class="absolute: true">
                <Icon v-if="curMode === LIGHT_MODE" icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem]" />
                <Icon v-else-if="curMode === DARK_MODE" icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem]" />
                <Icon v-else icon="material-symbols:radio-button-partial-outline" class="text-[1.25rem]" />
            </div>
        </button>
        <div ref="lightDarkPanel" id="light-dark-panel"
            class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5">
            <div class="card-base float-panel p-2">
                <button
                    :class="{ 'flex transition whitespace-nowrap items-center justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5': true, 'current-theme-btn': curMode === LIGHT_MODE }"
                    @click="switchMode(LIGHT_MODE)">
                    <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem] mr-3" />
                    {{ i18n(I18nKey.lightMode) }}
                </button>
                <button
                    :class="{ 'flex transition whitespace-nowrap items-center justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5': true, 'current-theme-btn': curMode === DARK_MODE }"
                    @click="switchMode(DARK_MODE)">
                    <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem] mr-3" />
                    {{ i18n(I18nKey.darkMode) }}
                </button>
                <button
                    :class="{ 'flex transition whitespace-nowrap items-center justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95': true, 'current-theme-btn': curMode === AUTO_MODE }"
                    @click="switchMode(AUTO_MODE)">
                    <Icon icon="material-symbols:radio-button-partial-outline" class="text-[1.25rem] mr-3" />
                    {{ i18n(I18nKey.systemMode) }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="css">
.current-setting {
    background: var(--btn-plain-bg-hover);
    color: var(--primary);
}
</style>