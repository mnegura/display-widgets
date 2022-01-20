import { instance } from "./api.service";

export function getWidgets() {
  return instance.get("/widgets");
}

export function createWidget(model) {
  return instance.post("/widgets", model);
}

export function editWidget(model) {
  return instance.put(`/widgets/${model.id}`, model);
}

export function deleteWidget(id) {
  return instance.delete(`/widgets/${id}`);
}
