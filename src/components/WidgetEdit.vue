<template>
  <teleport to="body">
    <modal :isVisible="isVisible" @close="closeModal">
      <template v-slot:header>
        <h2>Edit Widget</h2>
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
import { ref, computed, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import Modal from "@/components/ModalComponent.vue";
import { useStore } from "vuex";

export default {
  components: {
    Multiselect,
    Modal
  },
  props: {
    widget: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();

    const widthOptions = [1, 2, 3];
    const heightOptions = [1, 2, 3, 4];
    const widgetTypeOptions = ["Report", "Graph"];

    const width = ref(props.widget.width);
    const height = ref(props.widget.height);
    const widgetType = ref(props.widget.type);
    const name = ref(props.widget.name);
    const saveLoading = ref(false);

    const isVisible = computed(() => {
      return store.state.visibility.isWidgetEditVisible;
    });
    const canSave = computed(() => {
      return name.value && name.value.length > 0 && name.value.length < 151;
    });

    watch(
      () => props.widget,
      (value) => {
        if (value) {
          width.value = value.width;
          height.value = value.height;
          widgetType.value = value.type;
          name.value = value.name;
        }
      }
    );

    const closeModal = () => {
      store.commit("visibility/setIsWidgetEditVisible", false);
    };
    const saveWidget = () => {
      if (canSave) {
        saveLoading.value = true;

        const model = {
          id: props.widget.id,
          name: name.value,
          width: width.value,
          height: height.value,
          type: widgetType.value
        };

        store
          .dispatch("dashboard/editWidget", model)
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
