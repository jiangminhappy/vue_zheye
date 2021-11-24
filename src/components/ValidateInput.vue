<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      :value="inputRef.val"
      @blur="validateInput"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      id="exampleInputEmail"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      :value="inputRef.val"
      @blur="validateInput"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      id="exampleInputEmail"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from "vue";
import { emitter } from "./ValidateForm.vue";

const emailReg =
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProps = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProps>,
    // 第一步接受一个modelValue的变量
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    // 自定义组件的v-model的写法
    const updateValue = (e: KeyboardEvent) => {
      const tergetValue = (e.target as HTMLInputElement).value;
      inputRef.val = tergetValue;
      // 用update:modelValue的方法，触发一个方法
      context.emit("update:modelValue", tergetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>