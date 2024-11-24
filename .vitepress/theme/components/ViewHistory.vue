<script setup lang="ts">
    import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
    import { useData } from 'vitepress/dist/client/theme-default/composables/data'
    import { computed } from 'vue'

    const { theme, page } = useData()
    const historyLink = computed(() => {
        const { text = 'View History', pattern = '' } = theme.value.historyLink || {}
        let url: string
        if (typeof pattern === 'function') {
            url = pattern(page.value)
        } else {
            url = pattern.replace(/:path/g, page.value.filePath)
        }
        return { text, url } 
    });

</script>

<template>
    <div class="history-row">
        <VPLink class="history-link-button" :href="historyLink.url" :no-icon="true">
            <span class="vpi-history history-link-icon" />
            {{ historyLink.text }}
        </VPLink>
    </div>
</template>

<style scoped>
.vpi-history {
    --icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhpc3RvcnkiPjxwYXRoIGQ9Ik0zIDEyYTkgOSAwIDEgMCA5LTkgOS43NSA5Ljc1IDAgMCAwLTYuNzQgMi43NEwzIDgiLz48cGF0aCBkPSJNMyAzdjVoNSIvPjxwYXRoIGQ9Ik0xMiA3djVsNCAyIi8+PC9zdmc+');
}

.history-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
  margin-left: auto;
}

.history-link-button:hover {
  color: var(--vp-c-brand-2);
}

.history-link-icon {
  margin-right: 8px;
}
</style>
