import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement | undefined>) => {
  const isClickOutside = ref(false)

  // 钩子函数拿到传入的元素，判断点击的目标是否在目标元素中
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside
}

export default useClickOutside;