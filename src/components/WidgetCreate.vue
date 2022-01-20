<template>
  <teleport to="body">
    <modal :isVisible="isVisible" @close="closeModal">
      <template v-slot:header>
        <h2>Create Widget</h2>
      </template>
      <template v-slot:body>
        <div class="flex">
          <div class="form-group mr-4">
            <div class="form-label">Name</div>
            <input type="text" v-model="name" maxlength="150" />
          </div>
          <div class="form-group ml-4">
            <div class="form-label">Type</div>
            <Multiselect
              v-model="widgetType"
              :options="widgetTypeOptions"
              :placeholder="'Type'"
              :canClear="false"
              :canDeselect="false"
            />
          </div>
        </div>
        <div class="flex">
          <div class="form-group mr-4">
            <div class="form-label">Width</div>
            <Multiselect
              v-model="width"
              :options="widthOptions"
              :placeholder="'Width'"
              :canClear="false"
              :canDeselect="false"
            />
          </div>
          <div class="form-group ml-4">
            <div class="form-label">Height</div>
            <Multiselect
              v-model="height"
              :options="heightOptions"
              :placeholder="'Height'"
              :canClear="false"
              :canDeselect="false"
            />
          </div>
        </div>
      </template>
      <template v-slot:footer
        ><div class="flex justify-end">
          <div class="my-4 mr-4" v-show="saveLoading">
            <box-spinner :size="'10px'"></box-spinner>
          </div>
          <button class="main-btn main-btn--green mr-2" @click="saveWidget" :disabled="!canSave">Save</button>
          <button class="main-btn main-btn--gray" @click="closeModal">Cancel</button>
        </div></template
      >
    </modal>
  </teleport>
</template>

<script>
import { ref, computed } from "vue";
import Multiselect from "@vueform/multiselect";
import Modal from "@/components/ModalComponent.vue";
import { useStore } from "vuex";

export default {
  components: {
    Multiselect,
    Modal
  },
  setup() {
    const store = useStore();

    const defaultWidgetType = "Report";
    const defaultWidth = 1;
    const defaultHeight = 1;

    const widthOptions = [1, 2, 3];
    const heightOptions = [1, 2, 3, 4];
    const widgetTypeOptions = ["Report", "Graph"];

    const width = ref(defaultWidth);
    const height = ref(defaultHeight);
    const widgetType = ref(defaultWidgetType);
    const name = ref(null);
    const saveLoading = ref(false);

    const isVisible = computed(() => {
      return store.state.visibility.isWidgetCreateVisible;
    });
    const canSave = computed(() => {
      return name.value && name.value.length > 0 && name.value.length < 151;
    });

    const closeModal = () => {
      store.commit("visibility/setIsWidgetCreateVisible", false);
      width.value = defaultWidth;
      height.value = defaultHeight;
      widgetType.value = defaultWidgetType;
      name.value = null;
    };
    const saveWidget = () => {
      if (canSave) {
        saveLoading.value = true;

        const model = {
          name: name.value,
          width: width.value,
          height: height.value,
          type: widgetType.value
        };

        store
          .dispatch("dashboard/createWidget", model)
          .then(() => {
            closeModal();
          })
          .catch((err) => {})
          .finally(() => {
            saveLoading.value = false;
          });
      }
    };

    return {
      name,
      widgetType,
      isVisible,
      width,
      height,
      canSave,
      widgetTypeOptions,
      heightOptions,
      widthOptions,
      saveLoading,
      saveWidget,
      closeModal
    };
  }
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
