import request from "../utils/request";

const productsService = {
  getList: (params) => request.get(`/product`, { params }),
  getById: (id, params) => request.get(`/product/${id}`, { params }),
  create: (data) => request.post("/product", data),
  update: (data) => {
    console.log(data )
    request.put("/product", data)
  },
  delete: (id) => request.delete(`/product/${id}`),
};

export default productsService;
