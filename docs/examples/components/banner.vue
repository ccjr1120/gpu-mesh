<template>
  <div class="banner">
    <div class="header-tab">
      <!-- <a href="./examples">show more examples</a> -->
    </div>
    <ul>
      <li v-for="[k, v] in Object.entries(randomMeshMap)">
        <a :href="`./examples/${k.toLowerCase()}`">
          <View :data-map="v" style="width: 100%; height: 100%" />
          <div class="label">
            {{ k.toUpperCase() }}
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import View from './view.vue'
const meshMap = __MESHES
const randomMeshMap = (() => {
  const keys = Object.keys(meshMap)
  let result: string[] = []
  if (keys.length < 8) {
    return meshMap
  }
  while (result.length < 8) {
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    if (!result.includes(randomKey)) {
      result.push(randomKey)
    }
  }
  return result.reduce(
    (pre, cur) => {
      pre[cur] = meshMap[cur]
      return pre
    },
    {} as typeof meshMap
  )
})()
</script>
<style scoped>
.header-tab {
  display: flex;
  justify-content: end;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 360px);
  grid-template-rows: repeat(auto-fit, 240px);
}
.vp-doc li + li {
  margin-top: 0px;
}
li {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  transition: 0.3s;
  a {
    height: 100%;
    pointer-events: none;
  }
  .label {
    font-size: 24px;
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
