import axios from "axios";
import { useState } from "react";

function AdminOrderTracking({ orderId }) {
  const [status, setStatus] = useState("");

  const updateTrackingStatus = async (newStatus) => {
    try {
      await axios.put(`/api/admin/order/update-tracking/${orderId}`, { trackingStatus: newStatus });
      setStatus(newStatus);
      alert("Tracking status updated successfully");
    } catch (error) {
      console.error("Error updating tracking status", error);
    }
  };

  return (
    <div>
      <h2>Update Order Tracking Status</h2>
      <button onClick={() => updateTrackingStatus("shippingSoon")}>Shipping Soon</button>
      <button onClick={() => updateTrackingStatus("shipped")}>Shipped</button>
      <button onClick={() => updateTrackingStatus("outForDelivery")}>Out for Delivery</button>
      <button onClick={() => updateTrackingStatus("delivered")}>Delivered</button>
    </div>
  );
}

export default AdminOrderTracking;
