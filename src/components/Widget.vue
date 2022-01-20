<template>
  <div class="widget-item" :style="{ gridColumn: `span ${widget.width}`, gridRow: `span ${widget.height}` }">
    <div class="flex justify-between">
      <div class="widget-item__title">{{ widget.name }}</div>
      <div class="flex">
        <button class="main-btn main-btn--orange mr-2" @click="editWidget">Edit</button>
        <button class="main-btn main-btn--red" @click="deleteWidget">Delete</button>
      </div>
    </div>
    <div class="widget-item__type">{{ widget.type }}</div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["edit-widget", "delete-widget"],
  props: {
    widget: {
      type: Object
    }
  },
  setup(props, context) {
    const store = useStore();

    const editWidget = () => {
      context.emit("edit-widget", props.widget);
    };
    const deleteWidget = () => {
      context.emit("delete-widget", props.widget);
    };

    return {
      deleteWidget,
      editWidget
    };
  }
};
</script>
