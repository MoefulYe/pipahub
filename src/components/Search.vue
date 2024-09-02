<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue'
import { url } from '@utils/url-utils.ts'
import { i18n } from '@i18n/translation'
import I18nKey from '@i18n/i18nKey'
const keyword = ref('')
const result = shallowRef<FindResult>([])
const searchPanel = shallowRef<HTMLElement>()
const search = async (keyword: string, isDesktop: boolean) => {
    if (keyword === '' && isDesktop) {
        searchPanel.value?.classList.add('float-panel-closed')
        return
    }
    let arr: FindResult;
    if (import.meta.env.PROD) {
        const ret = await window.pagefind.search(keyword)
        arr = await Promise.all(ret.results.map((item: any) => item.data()))
    } else {
        arr = FAKE_RESULT
    }
    if (arr.length === 0 && isDesktop) {
        searchPanel.value?.classList.add('float-panel-closed')
        return
    }
    if (isDesktop) {
        searchPanel.value?.classList.remove('float-panel-closed')
    }
    result.value = arr
}
watch(keyword, (keyword) => search(keyword, window.innerWidth >= 1024))

const togglePanel = () => searchPanel.value?.classList.toggle('float-panel-closed')
</script>

<script lang="ts">
const FAKE_RESULT = [
    {
        url: url('/'),
        meta: {
            title: 'This Is a Fake Search Result',
        },
        excerpt:
            'Because the search cannot work in the <mark>dev</mark> environment.',
    },
    {
        url: url('/'),
        meta: {
            title: 'If You Want to Test the Search',
        },
        excerpt: 'Try running <mark>npm build && npm preview</mark> instead.',
    },
]

type ResultEntry = typeof FAKE_RESULT[0]
type FindResult = ResultEntry[]

</script>
<template>
    <!-- search bar for desktop view -->
    <div id="search-bar" class="hidden lg:flex items-center h-11 mr-2
        bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
        dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10 rounded-lg">
        <slot name="search-icon"></slot>
        <input :placeholder="i18n(I18nKey.search)" v-model="keyword"
            class="pl-10 text-sm bg-transparent h-full text-black/50 dark:text-white/50 grow rounded-lg ring-0 hover:ring-2 active:ring-2 duration-200 transition-all focus:outline-none ring-[hsl(var(--hue),25%,75%)]" />
    </div>

    <!-- toggle btn for phone/tablet view -->
    <button @click="togglePanel" aria-label="Search Panel" id="search-switch"
        class="btn-plain scale-animation lg:hidden rounded-lg w-11 h-11 active:scale-90">
        <slot name="search-switch"></slot>
    </button>

    <!-- search panel -->
    <div id="search-panel" ref="searchPanel"
        class="float-panel float-panel-closed search-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2">
        <!-- search bar inside panel for phone/tablet -->
        <div id="search-bar-inside" class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
            bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
            dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10 
            ring-0 hover:ring-2 active:ring-2 duration-200 focus:outline-none ring-[hsl(var(--hue),25%,75%)]
        ">
            <slot name="search-icon"></slot>
            <input placeholder="Search" v-model="keyword" class="pl-10 absolute inset-0 text-sm bg-transparent outline-none
                    text-black/50 dark:text-white/50">
        </div>

        <!-- search results -->
        <a v-for="{ url, meta: { title }, excerpt } of result" :key="url" :href="url" class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
                rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] 
                active:bg-[var(--btn-plain-bg-active)]">
            <div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
                {{ title }}<slot name="arrow-icon"></slot>
            </div>
            <div class="transition text-sm text-50" v-html="excerpt" />
        </a>
    </div>

</template>