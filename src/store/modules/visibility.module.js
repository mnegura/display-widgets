import { getWidgets } from "@/services/widget.service.js";

export const visibility = {
  namespaced: true,
  state: () => ({
    isWidgetCreateVisible: false,
    isWidgetEditVisible: false,
    isWidgetDeleteVisible: false
  }),
  mutations: {
    setIsWidgetCreateVisible(state, value = !isWidgetCreateVisible) {
      state.isWidgetCreateVisible = value;
    },
    setIsWidgetEditVisible(state, value = !isWidgetEditVisible) {
      state.isWidgetEditVisible = value;
    },
    setIsWidgetDeleteVisible(state, value = !isWidgetDeleteVisible) {
      state.isWidgetDeleteVisible = value;
    }
  }
};
