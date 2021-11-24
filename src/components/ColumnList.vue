<template>
  <div class="row">
    <div v-for="column in columnList" class="col-4 mb-3" :key="column.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <!-- 传入当前专栏的id -->
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    // computed的只读模式
    const columnList = computed(() => {
      return props.list.map((column) => {
        // 当传入头像的时候，显示默认的头像
        if (!column.avatar) {
          column.avatar = require("@/assets/column.jpg");
        }
        return column;
      });
    });
    return {
      columnList,
    };
  },
});
</script>

<style>
</style>