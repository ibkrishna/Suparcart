import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { getAllOrdersForAdmin } from '../../store/admin/order-slice/index';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { toast } from "react-toastify";
import axios from "axios";
import { GoChecklist } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { selectTotalOrders, selectPendingOrders, selectDeliveredOrders } from "../../store/admin/order-slice/index";
import AdminPendingOrders from '../../components/shopping-view/pendingadminorders'; 
import AdminTotalOrders from '../../components/shopping-view/totaladminorders';
import AdminSuccessfulOrders from '../../components/shopping-view/successadminorders';

function AdminDashboard() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showPendingOrders, setShowPendingOrders] = useState(false); 
  const [showTotalOrders, setShowTotalOrders] = useState(false); 
  const [showSuccessfulOrders, setShowSuccessfulOrders] = useState(false); // New state for successful orders
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [adminData, setAdmindata] = useState([]);

  const pendingOrders = useSelector(selectPendingOrders); 
  const deliveredOrders = useSelector(selectDeliveredOrders);
  const totalOrders = useSelector(selectTotalOrders);

  const { featureImageList } = useSelector((state) => state.commonFeature);

  const handleUploadFeatureImage = async () => {
    if (uploadedImageUrl) {
      setButtonLoading(true);
      try {
        const res = await dispatch(addFeatureImage(uploadedImageUrl));
        if (res?.payload?.success) {
          dispatch(getFeatureImages());
          setUploadedImageUrl("");
          alert("Image uploaded successfully");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setButtonLoading(false);
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const res = await dispatch(deleteFeatureImage(id));
    if (res?.payload?.success) {
      toast("Image deleted successfully");
    } else {
      toast("Failed to delete image");
    }
  };

  // Fetching API
  const fetchedUserData = async () => {
    try {
      let response = await axios.get("https://ecommerce-d1.onrender.com/api/auth/users");
      setAdmindata(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedUserData();
  }, []);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
    dispatch(getFeatureImages());
  }, [dispatch]);

  const togglePendingOrders = () => {
    setShowPendingOrders(prev => !prev); // Toggle the visibility state
  };

  const toggleTotalOrders = () => {
    setShowTotalOrders(prev => !prev); // Toggle the visibility state for total orders
  };

  const toggleSuccessfulOrders = () => {
    setShowSuccessfulOrders(prev => !prev); // Toggle the visibility state for successful orders
  };

  return (
    <>
      <div style={{ fontFamily: "Inter" }}>
        <label className="font-medium text-xl">
          <span>Hello</span> {user?.userName},
        </label>
      </div>
      {/* Orders Summary Section */}
      <div className="flex flex-col md:flex-row md:items-center bg-gray-100 py-4 space-y-4 md:space-y-0 md:space-x-2">
        {/* Total Orders Section */}
        <div className="mx-4 md:mx-0 bg-white shadow-lg border-l-[4px] border-[#FFD6D6] border-b-[4px] rounded-md p-4 flex items-center cursor-pointer md:w-full" onClick={toggleTotalOrders}>
          <div className="flex items-center">
            <GoChecklist className="h-[30px] w-[30px] text-[#FFD6D6] mr-2" />
            <div>
              <label className="block text-[#FFD6D6] text-xl font-bold">
                {totalOrders} 
              </label>
              <label className="block text-gray-500 text-sm">
                Total Orders
              </label>
            </div>
          </div>
        </div>

        {/* Pending Orders Section */}
        <div 
          className="mx-4 md:mx-0 bg-white shadow-lg border-l-[4px] border-[#FFD6D6] border-b-[4px] rounded-md p-4 flex items-center cursor-pointer md:w-full"
          onClick={togglePendingOrders} // Click handler to toggle visibility
        >
          <div className="flex items-center">
            <GoChecklist className="h-[30px] w-[30px] text-[#FFD6D6] mr-2" />
            <div>
              <label className="block text-[#FFD6D6] text-xl font-bold">
                {pendingOrders}
              </label>
              <label className="block text-gray-500 text-sm">
                Total Pending Orders
              </label>
            </div>
          </div>
        </div>

        {/* Successful Orders Section */}
        <div 
          className="mx-4 md:mx-0 bg-white shadow-lg border-l-[4px] border-[#FFD6D6] border-b-[4px] rounded-md p-4 flex items-center cursor-pointer md:w-full"
          onClick={toggleSuccessfulOrders} // Click handler to toggle visibility
        >
          <div className="flex items-center">
            <GoChecklist className="h-[30px] w-[30px] text-[#FFD6D6] mr-2" />
            <div>
              <label className="block text-[#FFD6D6] text-xl font-bold">
                {deliveredOrders} 
              </label>
              <label className="block text-gray-500 text-sm">
                Orders Completed
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Show Pending Orders if toggled */}
      {showPendingOrders ? (
        <AdminPendingOrders />
      ) : showTotalOrders ? (
        <AdminTotalOrders /> // Render total orders if toggled
      ) : showSuccessfulOrders ? (
        <AdminSuccessfulOrders /> // Render successful orders if toggled
      ) : (
        <>
          {/* Account Information Section */}
          <div className="mt-6" style={{ fontFamily: "Inter" }}>
            <label className="text-xl font-medium">Account Information</label>
            {adminData.map((admin) => {
              if (admin._id === user.id) {
                return (
                  <ul key={admin._id} className="mt-4 space-y-2 list-disc pl-6">
                    <li className="text-[#636363]">Full Name: {admin.userName}</li>
                    <li className="text-[#636363]">
                      Phone Number: {admin.mobileNumber}
                    </li>
                  </ul>
                );
              }
              return null;
            })}
            {adminData.every((admin) => admin._id !== user?.id) && (
              <p>No account information available.</p>
            )}
          </div>

          {/* Login Details Section */}
          <div className="mt-6" style={{ fontFamily: "Inter" }}>
            <label className="text-xl font-medium">Login Details</label>
            {adminData.map((admin) => {
              if (admin._id === user.id) {
                return (
                  <ul
                    key={admin._id}
                    className="mt-4 flex flex-col md:flex-row md:w-[500px] md:ml-6"
                  >
                    <li className="text-[#636363] flex-1">Email: {admin.email}</li>
                    <li className="text-[#636363] flex-1">
                      Password: {"**********"}
                    </li>
                  </ul>
                );
              }
              return null;
            })}
          </div>

          {/* Image Upload Section */}
          <div>
            <ProductImageUpload
              setUploadedImageUrl={setUploadedImageUrl}
              onImageSelect={setUploadedImageUrl}
            />
            <Button
              onClick={handleUploadFeatureImage}
              className="mt-5 w-full"
              disabled={buttonLoading}
            >
              {buttonLoading ? "Uploading..." : "Upload"}
            </Button>
            <div className="flex flex-col gap-4 mt-5">
              {featureImageList && featureImageList.length > 0
                ? featureImageList.map((featureImgItem) => (
                    <div
                      className="relative flex items-center"
                      key={featureImgItem._id}
                    >
                      <img
                        src={featureImgItem.image}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                      />
                      <span
                        className="absolute right-2 top-2 text-black cursor-pointer hover:text-red-600"
                        onClick={() => handleDelete(featureImgItem._id)}
                      >
                        <MdOutlineDelete className="h-10 w-10" />
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminDashboard;
