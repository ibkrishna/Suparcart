import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  updateTrackingStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
  trackingStatus: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  const handleTrackingStatusUpdate = (newStatus) => {
    const updatedOrderDetails = {
      ...orderDetails,
      trackingStatus: newStatus,
    };
  
    dispatch(getOrderDetailsForAdmin(updatedOrderDetails?._id));
  
    dispatch(
      updateTrackingStatus({ id: orderDetails?._id, trackingStatus: newStatus })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        toast({
          title: "Tracking status updated",
        });
      } else {
        toast({
          title: "Failed to update tracking status",
        });
      }
    });
  };

  const trackingStatus = orderDetails?.trackingStatus;

  return (
    <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[100vh]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate ? orderDetails.orderDate.split("T")[0] : "N/A"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails.cartItems.map((item) => (
                    <li className="flex items-center justify-between" key={item.id}>
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : <li>No items found</li>}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {/* <span>{user.userName}</span> */}
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-2 mb-4">
          <div className="font-medium">Order Tracking Status</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <button
                className={`flex items-center justify-center h-6 w-6 rounded-full ${
                  ["shippingSoon", "shipped", "outForDelivery", "delivered"].includes(orderDetails?.trackingStatus)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handleTrackingStatusUpdate("shippingSoon")}
              >
                1
              </button>
              <span className="ml-2">Shipping Soon</span>
            </div>
            <div className="flex items-center">
              <button
                className={`flex items-center justify-center h-6 w-6 rounded-full ${
                  ["shipped", "outForDelivery", "delivered"].includes(orderDetails?.trackingStatus)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handleTrackingStatusUpdate("shipped")}
              >
                2
              </button>
              <span className="ml-2">Shipped</span>
            </div>
            <div className="flex items-center">
              <button
                className={`flex items-center justify-center h-6 w-6 rounded-full ${
                  ["outForDelivery", "delivered"].includes(orderDetails?.trackingStatus)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handleTrackingStatusUpdate("outForDelivery")}
              >
                3
              </button>
              <span className="ml-2">Out for Delivery</span>
            </div>
            <div className="flex items-center">
              <button
                className={`flex items-center justify-center h-6 w-6 rounded-full ${
                  orderDetails?.trackingStatus === "delivered"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handleTrackingStatusUpdate("delivered")}
              >
                4
              </button>
              <span className="ml-2">Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
