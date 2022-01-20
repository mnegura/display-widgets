<template>
  <div class="dashboard">
    <div class="flex justify-between items-center">
      <h1>Dashboard</h1>
      <button class="main-btn main-btn--green" @click="openWidgetCreateModal">New Widget</button>
    </div>

    <div class="widget-wrapper" v-if="widgets && widgets.length > 0">
      <widget
        v-for="widget in widgets"
        :key="widget.id"
        :widget="widget"
        @editWidget="editWidget"
        @deleteWidget="deleteWidget"
      ></widget>
    </div>
    <div class="text-center w-full" v-else>No widgets to show.</div>
  </div>

  <widget-create></widget-create>
  <widget-edit :widget="editingWidget"></widget-edit>
  <widget-delete :widget="deletingWidget"></widget-delete>
</template>

<script>
import { defineAsyncComponent, computed, ref } from "vue";
import { useStore } from "vuex";

const Widget = defineAsyncComponent(() => import("@/components/Widget.vue"));
const WidgetCreate = defineAsyncComponent(() => import("@/components/WidgetCreate.vue"));
const WidgetEdit = defineAsyncComponent(() => import("@/components/WidgetEdit.vue"));
const WidgetDelete = defineAsyncComponent(() => import("@/components/WidgetDelete.vue"));

export default {
  components: {
    WidgetCreate,
    WidgetEdit,
    WidgetDelete,
    Widget
  },
  setup() {
    const store = useStore();
    const editingWidget = ref({});
    const deletingWidget = ref({});

    const widgets = computed(() => {
      return store.state.dashboard.widgets;
    });

    const openWidgetCreateModal = () => {
      store.commit("visibility/setIsWidgetCreateVisible", true);
    };

    const editWidget = (widget) => {
      editingWidget.value = widget;
      store.commit("visibility/setIsWidgetEditVisible", true);
    };
    const deleteWidget = (widget) => {
      deletingWidget.value = widget;
      store.commit("visibility/setIsWidgetDeleteVisible", true);
    };

    store.dispatch("dashboard/getWidgets");

    return {
      editingWidget,
      deletingWidget,
      widgets,
      editWidget,
      deleteWidget,
      openWidgetCreateModal
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/dashboard.scss";
</style>
