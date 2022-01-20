<template>
  <teleport to="body">
    <transition name="mode-fade" mode="out-in">
      <div @click="$emit('close')" v-if="isVisible" class="modal__overflow"></div>
    </transition>
    <transition name="modal">
      <div v-show="isVisible">
        <div class="modal-wrapper" @click.self="$emit('close')">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"> default header </slot>
            </div>

            <div class="modal-body">
              <slot name="body"> default body </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <div class="flex justify-end">
                  <button class="main-btn--dark mr-4" @click="$emit('close')"> {{ $t("Cancel") }} </button>
                  <button class="main-btn main-btn--green" @click="$emit('submit')"> {{ $t("OK") }} </button>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  emits: ["close", "submit"],
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    watch(
      () => props.isVisible,
      (value) => {
        const el = document.getElementById("app");
        if (value && el) el.style.overflow = "hidden";
        else if (el) el.style.overflow = "auto";
      }
    );
  }
});
</script>

<style lang="scss">
.modal-wrapper {
  z-index: 9999;
  position: absolute;
  margin: 30px auto;
  display: flex;
  width: 100%;
  top: 0;
  left: 0;
}

.modal__overflow {
  position: fixed;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 999;
}

.modal-container {
  width: 100%;
  min-width: 300px;
  max-width: 1080px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  height: 90vh;
}

.modal-header {
  margin-top: 0;
  color: $main-gray;
  font-weight: bold;
}

.modal-body {
  margin: 20px 0;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-flow: column;
}
</style>
