import { Order } from "../models/order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getOrder = asyncHandler(async (req,res) => { 
    const filter = {};
    const id = req.query.id;
    if(id) filter._id = id;

    const orders = await Order.find(filter);
    if(!orders) throw ApiError(400, "Faild to load orders!");
    return res.status(200).json(new ApiResponse(200, orders, "Orders loaded successfully!"))
 })

 const addOrder = asyncHandler(async (req,res) => { 
    const { product, qty, buyarName, buyarAddress, orderDate, status} = req.body;
    if ( !product || !qty || !buyarName || !buyarAddress ) throw new ApiError(400, "All field are required to create order!")
    const existOrder = await Order.findOne({
                    $and: [{product}, {qty}, {buyarName}, {buyarAddress},{orderDate}]
    })
    if(existOrder) throw new ApiError (404, "This order is already exist!")

    const order = await Order.create({
        product, 
        qty, 
        buyarName: buyarName.toLowerCase(), 
        buyarAddress: buyarAddress.toLowerCase(), 
        orderDate: new Date().toLocaleDateString(), 
        status : "painding"
    })
    if(!order) throw new ApiError(500, "Faild to create order!");
    return res.status(200).json(new ApiResponse(200, order, "Order created successfully!"))
  })

  const updateOrder = asyncHandler( async (req, res) => { 
    const id = req.params.id;
    if(!id) throw new ApiError(404, "Id is required to make update on order!")
    const { product, qty, buyarName, buyarAddress, orderDate, status} = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, {
        $set: {
        product, 
        qty, 
        buyarName: buyarName.toLowerCase(), 
        buyarAddress: buyarAddress.toLowerCase(), 
        status
        }
    },{new: true})

    if(!updatedOrder) throw new ApiError(500, "Faild to update the order")
    return res.status(200).json(new ApiResponse(200, updatedOrder, "Order updated successfully!"))
   })

   const deleteOrder = asyncHandler( async (req, res) => { 
    const id = req.params.id;
    if(!id) throw new ApiError(404, "Id is requird!")
    const deletedorder = await Order.findByIdAndDelete(id);
    if(!deletedorder) throw new ApiError(500, "Faild to delete order!")
    return res.status(200).json(new ApiResponse(200, deletedorder, "Order successfully Deleted!"))
    })


    export { getOrder, addOrder, updateOrder, deleteOrder}