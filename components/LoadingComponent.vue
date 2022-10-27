<template>
  <div>
    <!-- GRADIENT SPINNER -->
    <div v-if="typeData === 'gradient'" class="spinner-box">
      <div class="circle-border bg-teal-600 bg-gradient-to-t from-slate-900 via-violet-800 to-teal-600">
        <div class="circle-core bg-slate-900" />
      </div>
    </div>
    <!-- SPINNING SQUARES -->
    <div v-if="typeData === 'squares'" class="spinner-box">
      <div class="configure-border-1 bg-violet-800">
        <div class="configure-core bg-slate-900" />
      </div>
      <div class="configure-border-2 bg-teal-600">
        <div class="configure-core bg-slate-900" />
      </div>
    </div>
    <!-- LOADING DOTS... -->
    <div v-if="typeData === 'dots'" class="spinner-box">
      <div class="pulse-container">
        <div class="pulse-bubble pulse-bubble-1 bg-teal-600" />
        <div class="pulse-bubble pulse-bubble-2 bg-teal-600" />
        <div class="pulse-bubble pulse-bubble-3 bg-teal-600" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})

const { type } = toRefs(props)

const typeData = ref('')
if (type.value === '') {
  const types = ['gradient', 'squares']
  typeData.value = types[Math.floor(Math.random() * types.length)]
} else {
  typeData.value = type.value
}
</script>

<style>
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
}

@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
}

@keyframes configure-clockwise {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes configure-xclockwise {
  0% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(-135deg);
  }
  75% {
    transform: rotate(-225deg);
  }
  100% {
    transform: rotate(-315deg);
  }
}

.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.circle-border {
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  animation: spin .8s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.pulse-container {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pulse-bubble {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.pulse-bubble-1 {
    animation: pulse .4s ease 0s infinite alternate;
}
.pulse-bubble-2 {
    animation: pulse .4s ease .2s infinite alternate;
}
.pulse-bubble-3 {
    animation: pulse .4s ease .4s infinite alternate;
}

.configure-border-1 {
  width: 115px;
  height: 115px;
  padding: 3px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
}

.configure-border-2 {
  width: 115px;
  height: 115px;
  padding: 3px;
  left: -115px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
}

.configure-core {
  width: 100%;
  height: 100%;
}
</style>
