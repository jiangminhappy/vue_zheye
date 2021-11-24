<template>
  <div class="dropdown" ref="dropdownRef">
    <a @click.prevent="toggleOpen" class="btn btn-outline-light my-2 dropdown-toggle">{{ title }}</a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    // 获取元素，传入钩子函数中
    const dropdownRef = ref<null | HTMLElement | undefined>();
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    // 引入hooks钩子函数
    const isClickOutside = useClickOutside(dropdownRef)

    // 监听isClickOutside的变化，使之时刻变化
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef,
    };
  },
});
</script>