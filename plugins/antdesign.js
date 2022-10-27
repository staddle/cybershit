import { Button, message } from 'ant-design-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Button)
  nuxtApp.vueApp.use(message)
});