<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">电子邮箱</label>
      <validate-input
        type="text"
        placeholder="请输入邮箱"
        v-model="emailVal"
        :rules="emailRules"
        ref="inputRef"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input
        type="password"
        placeholder="请输入密码"
        v-model="passwordVal"
        :rules="passwordRules"
      ></validate-input>
    </div>
  </validate-form>
</template>

<script lang="ts">
import ValidateInput, { RulesProps } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router'
import { useStore} from 'vuex'
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const inputRef = ref<any>()
    const router = useRouter()
    const store = useStore()
    const emailRules: RulesProps = [
      { type: 'required', message: '电子邮箱不能为空' },
      { type: 'email', message: '输入正确的电子邮箱' }
    ]
    const emailVal = ref('')
    const passwordVal = ref('')
    const passwordRules: RulesProps = [
      { type: 'required', message: '密码不能为空' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push('/')
        store.commit('login')
      }
    }

    return {
      inputRef,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>