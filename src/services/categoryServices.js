import request from "../utils/request";

const CategoryService = {
  getList: (params) => request.get(`/category`, { params }),
  getById: (id, params) => request.get(`/category/${id}`, { params }),
  create: (data) => request.post("/category", data),
  update: (data) => {
    console.log(data )
    request.put("/category", data)
  },
  delete: (id) => request.delete(`/category/${id}`),
};

export default CategoryService;
