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

    import contributorData from '../contributor-db.json'
    const contributors = computed(() => {
        return contributorData[`src/${page.value.filePath}`] ?? [];
    });
</script>

<template>
    <div class="history-row">
        <VPLink class="history-link-button" :href="historyLink.url" :no-icon="true">
            <span class="vpi-history history-link-icon" />
            {{ historyLink.text }}
        </VPLink>

        <p v-if="contributors.length > 0" class="contributors">Contributors:
            <div class="contributor" v-for="(contributor, i) in contributors" :key="contributor.username">
                <VPLink :href="`https://github.com/${contributor.username}`" :no-icon="true">
                    {{ contributor.username }}
                    <img :src="contributor.avatar" :style="{
                      marginRight: `-${i * 4}px`,
                      opacity: `${100 - contributors.length * 15 + 15 * i}%`
                    }"/>
                </VPLink>
            </div>
        </p>
    </div>
</template>

<style scoped>

.history-row {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.contributors {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    column-gap: .5em;
    display: flex;
    flex-wrap: wrap;
    max-width: 400px;
    justify-content: end;
    align-items: baseline;
    padding-right: 40px;
    position: relative;
}

.contributor {
    display: inline-block;
}

.contributors a {
    --underline-color: var(--vp-c-text-2);
    display: inline-block;
}

.contributors a:hover {
    --underline-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
}

.contributors a::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background: var(--underline-color);
    margin-top: -.45em;
    opacity: .3;
}

.contributor img {
    width: 30px;
    height: 30px;
    display: inline-block;
    position: absolute;
    right: 0px;
    border: 1px solid #1b1b1f;
    border-radius: 100%;
}
.contributor:not(:last-child) img {
    opacity: .75;
}

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
}

.history-link-button:hover {
  color: var(--vp-c-brand-2);
}

.history-link-icon {
  margin-right: 8px;
}

@media screen and (max-width: 639px) {
    .history-row {
        align-items: start;
        flex-direction: column;
    }
    .contributors {
        max-width: 100%;
        justify-content: start;
    }
}
</style>
