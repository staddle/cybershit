import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAt, faEnvelope, faUser, faPlus, faXmark, faQuestion, faDice, faMagnifyingGlass, faArrowRightToBracket, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faAt)
library.add(faEnvelope)
library.add(faUser)
library.add(faPlus)
library.add(faXmark)
library.add(faQuestion)
library.add(faDice)
library.add(faMagnifyingGlass)
library.add(faArrowRightToBracket)
library.add(faChevronDown)
library.add(faChevronUp)

// Register the component globally
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon, {})
})
