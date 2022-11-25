import axiosInstance from "../utils/axios"

const ItemTypeService = {

   getAll: async () => {
      let response = await axiosInstance.get('/itemtypes')

      return response.data
   },
   getById: async (id) => {
      if (!id) return

      let response = await axiosInstance.get(`/itemtypes/${id}`)
      return response.data
   },
   create: async (itemtype) => {
      if (!itemtype) return

      let response = await axiosInstance.post(`/itemtypes`, { itemtype: itemtype })
      return response
   },
   destroy: async (id) => {
      if (!id) return

      let response = await axiosInstance.delete(`/itemtypes/${id}`)
      return response

   },
   update: async (id, itemtype) => {
      if (!id) return

      let response = await axiosInstance.put(`/itemtypes/${id}`, { itemtypes: itemtype })
      return response.data

   }
}

export default ItemTypeService