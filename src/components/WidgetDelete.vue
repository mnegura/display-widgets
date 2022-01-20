<template>
  <teleport to="body">
    <modal :isVisible="isVisible" @close="closeModal">
      <template v-slot:header>
        <h2>Delete Widget</h2>
      </template>
      <template v-slot:body>
        <div>
          Are you sure you want to delete widget <strong v-if="widget">{{ widget.name }}</strong
          >?
        </div>
      </template>
      <template v-slot:footer
        ><div class="flex justify-end">
          <div class="my-4 mr-4" v-show="deleteLoading">
            <box-spinner :size="'10px'"></box-spinner>
          </div>
          <button class="main-btn main-btn--green mr-2" @click="deleteWidget">Confirm</button>
          <button class="main-btn main-btn--gray" @click="closeModal">Cancel</button>
        </div></template
      >
    </modal>
  </teleport>
</template>

<script>
import { ref, computed, watch } from "vue";
import Modal from "@/components/ModalComponent.vue";
import { useStore } from "vuex";

export default {
  components: {
    Modal
  },
  props: {
    widget: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const deleteLoading = ref(false);

    const isVisible = computed(() => {
      return store.state.visibility.isWidgetDeleteVisible;
    });
    const closeModal = () => {
      store.commit("visibility/setIsWidgetDeleteVisible", false);
    };
    const deleteWidget = () => {
      deleteLoading.value = true;

      store
        .dispatch("dashboard/deleteWidget", props.widget.id)
        .then(() => {
          closeModal();
        })
        .catch((err) => {})
        .finally(() => {
          deleteLoading.value = false;
        });
    };

    return {
      isVisible,
      deleteLoading,
      deleteWidget,
      closeModal
    };
  }
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
