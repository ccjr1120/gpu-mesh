---
layout: page
pageClass: custom-page-class
---

<script setup>
import { defineAsyncComponent } from 'vue';
import { inBrowser } from 'vitepress';

const Play = inBrowser
  ? defineAsyncComponent(() => import('./component/index.vue'))
  : () => null;
</script>
<Play/>
