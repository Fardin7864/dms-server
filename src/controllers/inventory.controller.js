import { Inventory } from "../models/inventory.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getInventory = asyncHandler(async (req, res) => {
  try {
    const filter = {};
    const id = req.query.id;
    if (id) filter._id = id;
    const inventory = await Inventory.find(filter);
    if (!inventory) throw new ApiError(400, "Nothing found on inventory!");
    return res
      .status(200)
      .json(new ApiResponse(200, inventory, "Iventory loaded!"));
  } catch (error) {
    throw new ApiError(500, "Server faild to load inventory!");
  }
});

const addInventory = asyncHandler(async (req, res) => {
  const { product, qty } = req.body;
  if (!product || !qty)
    throw new ApiError(400, "product and quantity required!");
  const existInInventory = await Inventory.findOne({ product });
  if (existInInventory) throw new ApiError(400, "This product already exist!");
  const list = await Inventory.create({
    product,
    qty,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, list, "Add to Inventory successfully!"));
});

const updateInventory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { qty } = req.body;
    if (!qty || !id)
      throw new ApiError(400, "Quantity and ID are required to update");

    const updatedQty = await Inventory.findByIdAndUpdate(
      id,
      { $set: { qty } },
      { new: true }
    );

    if (!updatedQty) throw new ApiError(404, "Inventory item not found");

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedQty, "Inventory item updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Server faild to update!");
  }
});

const deleteInventory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      throw new ApiError(400, "ID is required to delete an inventory item");

    const deletedItem = await Inventory.findByIdAndDelete(id);

    if (!deletedItem) throw new ApiError(404, "Inventory item not found");

    res
      .status(200)
      .json(new ApiResponse(200, null, "Inventory item deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Server faild to delete !");
  }
});

export { getInventory, addInventory, updateInventory, deleteInventory };
