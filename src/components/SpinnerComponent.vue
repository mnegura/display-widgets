<template>
  <div class="boxes" :style="styleBoxes">
    <div class="box" :style="styleBox" v-for="i in 4" :key="i">
      <div :style="styleDiv"></div>
      <div :style="styleDiv2"></div>
      <div :style="styleDiv3"></div>
      <div :style="styleShadowDiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    size: {
      type: String,
      default: "35px"
    }
  },
  setup(props) {
    const styleBoxes = computed((): String => {
      return `height: calc(${props.size} * 2); width: calc(${props.size} * 3); 
        margin-top: calc(${props.size} * 1.5 * -1);`;
    });
    const styleBox = computed((): String => {
      return `height: ${props.size}; width: ${props.size};`;
    });
    const styleDiv = computed((): String => {
      return `transform: rotateY(0deg) rotateX(0deg) translateZ(calc(${props.size} / 2));`;
    });
    const styleDiv2 = computed((): String => {
      return `transform: rotateY(90deg) rotateX(0deg) translateZ(calc(${props.size} / 2));`;
    });
    const styleDiv3 = computed((): String => {
      return `transform: rotateY(0deg) rotateX(-90deg) translateZ(calc(${props.size} / 2));`;
    });
    const styleShadowDiv = computed((): String => {
      return `transform: rotateY(0deg) rotateX(0deg) translateZ(calc(${props.size} * -3));`;
    });

    return { styleBoxes, styleBox, styleDiv, styleShadowDiv, styleDiv2, styleDiv3 };
  }
});
</script>

<style lang="scss" scoped>
$color: #abc43f;
$colorRight: darken(#abc43f, 15%);
$colorLeft: darken(#abc43f, 5%);
$shadow: #d5e7d0;

.boxes {
  --duration: 800ms;
  margin: auto;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);

  .box {
    top: 0;
    left: 0;
    position: absolute;
    transform-style: preserve-3d;

    &:nth-child(1) {
      transform: translate(100%, 0);
      animation: box1 var(--duration) linear infinite;
    }

    &:nth-child(2) {
      transform: translate(0, 100%);
      animation: box2 var(--duration) linear infinite;
    }

    &:nth-child(3) {
      transform: translate(100%, 100%);
      animation: box3 var(--duration) linear infinite;
    }

    &:nth-child(4) {
      transform: translate(200%, 0);
      animation: box4 var(--duration) linear infinite;
    }

    & > div {
      --background: #{$color};
      --top: auto;
      --right: auto;
      --bottom: auto;
      --left: auto;
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--background);
      top: var(--top);
      right: var(--right);
      bottom: var(--bottom);
      left: var(--left);

      &:nth-child(1) {
        --top: 0;
        --left: 0;
      }

      &:nth-child(2) {
        --background: #{$colorRight};
        --right: 0;
        --rotateY: 90deg;
      }

      &:nth-child(3) {
        --background: #{$colorLeft};
        --rotateX: -90deg;
      }

      &:nth-child(4) {
        --background: #{$shadow};
        --top: 0;
        --left: 0;
      }
    }
  }
}

@keyframes box1 {
  0%,
  50% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(200%, 0);
  }
}

@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}

@keyframes box3 {
  0%,
  50% {
    transform: translate(100%, 100%);
  }
  100% {
    transform: translate(0, 100%);
  }
}

@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }
  50% {
    transform: translate(200%, 100%);
  }
  100% {
    transform: translate(100%, 100%);
  }
}
</style>
