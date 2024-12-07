import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { MdKeyboardArrowRight } from "react-icons/md";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]);
  const ordersPerPage = 11;

  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const sortedOrderList = orderList?.slice().sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrderList?.slice(indexOfFirstOrder, indexOfLastOrder) || [];

  const totalPages = Math.ceil(sortedOrderList?.length / ordersPerPage) || 1;

  const handleFetchOrderDetails = async (getId) => {
    setLoadingDetails(true);
    await dispatch(getOrderDetailsForAdmin(getId));
    setLoadingDetails(false);
    setOpenDetailsDialog(true);
  };

  const handleNextPages = () => {
    if (visiblePages[3] < totalPages) {
      setVisiblePages((prev) => prev.map((page) => page + 1));
    }
  };

  const handlePrevPages = () => {
    if (visiblePages[0] > 1) {
      setVisiblePages((prev) => prev.map((page) => page - 1));
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-medium text-xl" style={{ fontFamily: 'Inter' }}>My Orders</h2>
      <div className="hidden md:block border border-slate-400 bg-white shadow-lg mt-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border">
              <th className="px-4 py-4 text-left">Order ID</th>
              <th className="px-4 py-4 text-left">Order Date</th>
              <th className="px-4 py-4 text-left">Order Status</th>
              <th className="px-4 py-4 text-left">Order Price</th>
              <th className="px-4 py-4">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? currentOrders.map((orderItem) => {
              if (!orderItem) return null; // Check if orderItem is defined
              return (
                <tr key={orderItem._id}>
                  <td className="border-b px-4 py-2">{orderItem._id}</td>
                  <td className="border-b px-4 py-2">
                    {orderItem.orderDate ? orderItem.orderDate.split("T")[0] : "N/A"}
                  </td>
                  <td className="border-b px-4 py-2">
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </td>
                  <td className="border-b px-4 py-2">${orderItem.totalAmount}</td>
                  <td className="border-b px-4 py-2">
                    <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-2">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile view */}
      <div className="md:hidden mt-4">
        {currentOrders.length > 0 ? currentOrders.map((orderItem) => {
          if (!orderItem) return null; // Check if orderItem is defined
          return (
            <div key={orderItem._id}>
              <h3 className="text-xs mb-2 mt-2">Order ID: {orderItem._id}</h3>
              <div className="bg-white shadow-lg rounded-md p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <img
                      src={orderItem.cartItems[0]?.image}
                      alt="Order Item"
                      className="w-20 h-14 object-cover rounded-md"
                    />
                    <div className="flex items-center">
                      <div
                        className={`w-20 text-white text-center ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem.orderStatus}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col justify-between">
                    <div>
                      <div className={`w-24 text-start text-black mb-1`}>
                        {orderItem.orderStatus}
                      </div>
                      <p className="text-xs text-gray-700">Date: {orderItem.orderDate ? orderItem.orderDate.split("T")[0] : "N/A"}</p>
                      <p className="text-xs text-gray-700">Price: ${orderItem.totalAmount}</p>
                    </div>
                  </div>
                  <button
                    className="ml-2 p-2 text-gray-500 hover:text-gray-800"
                    onClick={() => handleFetchOrderDetails(orderItem._id)}
                  >
                    <MdKeyboardArrowRight className="h-8 w-8" />
                  </button>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center">No orders found</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button onClick={handlePrevPages} className="h-[30px] w-[30px] text-black text-xl">&lt;</button>
        )}
        {visiblePages.map((pageNum) => {
          if (pageNum <= totalPages) {
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`mx-1 border border-slate-400 h-[30px] w-[30px] ${currentPage === pageNum ? 'bg-[#FE6262] text-white' : ''}`}
              >
                {pageNum}
              </button>
            );
          }
          return null;
        })}
        {currentPage < totalPages && (
          <button onClick={handleNextPages} className="h-[30px] w-[30px] text-black text-xl">&gt;</button>
        )}
      </div>

      {/* Dialog to show order details */}
      <Dialog
        open={openDetailsDialog}
        onOpenChange={() => {
          setOpenDetailsDialog(false);
          dispatch(resetOrderDetails());
        }}
      >
        {loadingDetails ? (
          <div className="p-4">Loading...</div>
        ) : (
          <AdminOrderDetailsView orderDetails={orderDetails} />
        )}
      </Dialog>
    </div>
  );
}

export default AdminOrdersView;
