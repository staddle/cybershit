import Vue from 'vue'
import PrimeVue from 'primevue/config/PrimeVue'
import Checkbox from 'primevue/checkbox/Checkbox'
import Dropdown from 'primevue/dropdown/Dropdown'

Vue.use(PrimeVue)
Vue.component(Checkbox)
Vue.component('DropDown', Dropdown)
