import { getWidgets, createWidget, editWidget, deleteWidget } from "@/services/widget.service.js";
import { notify } from "@kyvg/vue3-notification";

const errorMessage = (message) => {
  notify({
    title: "Get Widgets Error",
    text: message,
    type: "error"
  });
};

export const dashboard = {
  namespaced: true,
  state: () => ({
    widgets: []
  }),
  actions: {
    async getWidgets({ commit }) {
      return getWidgets()
        .then((data) => {
          commit("setWidgets", data.data);
          return Promise.resolve(data);
        })
        .catch((error) => {
          errorMessage(error.response.data.message);
          console.error(error);
          return Promise.reject(error);
        });
    },
    async createWidget({ commit }, model) {
      return createWidget(model)
        .then(() => {
          notify({
            title: "Create Widget",
            text: "Widget created successfully",
            type: "success"
          });
          commit("addWidget", model);
          return Promise.resolve();
        })
        .catch((error) => {
          errorMessage(error.response.data.message);
          console.error(error);
          return Promise.reject(error);
        });
    },
    async editWidget({ commit }, model) {
      return editWidget(model)
        .then(() => {
          notify({
            title: "Edit Widget",
            text: "Widget edited successfully",
            type: "success"
          });
          commit("editWidget", model);
          return Promise.resolve();
        })
        .catch((error) => {
          errorMessage(error.response.data.message);
          console.error(error);
          return Promise.reject(error);
        });
    },
    async deleteWidget({ commit }, id) {
      return deleteWidget(id)
        .then(() => {
          notify({
            title: "Delete Widget",
            text: "Widget deleted successfully",
            type: "success"
          });
          commit("deleteWidget", id);
          return Promise.resolve();
        })
        .catch((error) => {
          errorMessage(error.response.data.message);
          console.error(error);
          return Promise.reject(error);
        });
    }
  },
  mutations: {
    setWidgets(state, data) {
      state.widgets = data;
    },
    addWidget(state, widget) {
      state.widgets.push(widget);
    },
    editWidget(state, widget) {
      const elIndex = state.widgets.findIndex((item) => item.id === widget.id);

      if (elIndex !== -1) {
        state.widgets[elIndex] = JSON.parse(JSON.stringify(widget));
      }
    },
    deleteWidget(state, id) {
      state.widgets = state.widgets.filter((item) => item.id !== id);
    }
  }
};
