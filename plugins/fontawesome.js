// For Nuxt 2
import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAt, faEnvelope, faUser, faPlus, faX } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faAt)
library.add(faEnvelope)
library.add(faUser)
library.add(faPlus)
library.add(faX)

// Register the component globally
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

// Modify nuxt.config.js adding to the `css` and `plugins` sections.
