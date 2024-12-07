import ProductImageUpload from "@/components/admin-view/image-upload";
import BrandImageUpload from "@/components/admin-view/brand-image-upload"; // Import BrandImageUpload
import CategoryImageUpload from '@/components/admin-view/category-image-upload'; // Import CategoryImageUpload
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedBrandImageUrl, setUploadedBrandImageUrl] = useState("");
  const [uploadedCategoryImageUrl, setUploadedCategoryImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      dispatch(fetchAllProducts(user.id));
    }
  }, [dispatch, user]);

  const handleEditProduct = (product) => {
    setOpenCreateProductsDialog(true);
    setCurrentEditedId(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      salePrice: product.salePrice,
      totalStock: product.totalStock,
      averageReview: product.averageReview,
    });
    setUploadedImageUrl(product.image);
    setUploadedBrandImageUrl(product.brandImage); // Assuming product object has brandImage
    setUploadedCategoryImageUrl(product.categoryImage); // Assuming product object has categoryImage
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      ...formData,
      image: uploadedImageUrl,
      brandImage: uploadedBrandImageUrl,
      categoryImage: uploadedCategoryImageUrl,
      category: formData.category.toLowerCase(),
      brand: formData.brand.toLowerCase(),
    };

    try {
      setUploading(true);
      if (currentEditedId !== null) {
        const data = await dispatch(
          editProduct({
            id: currentEditedId,
            formData: newData,
            adminId: user.id,
          })
        );
        if (data?.payload?.success) {
          dispatch(fetchAllProducts(user.id));
          resetForm();
        }
      } else {
        const data = await dispatch(
          addNewProduct({ formData: newData, adminId: user.id })
        );
        if (data?.payload?.success) {
          dispatch(fetchAllProducts(user.id));
          resetForm();
          toast({ title: "Product added successfully" });
        }
      }
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setFormData(initialFormData);
    setUploadedImageUrl("");
    setUploadedBrandImageUrl("");
    setUploadedCategoryImageUrl("");
  };

  function handleDelete(productId) {
    dispatch(deleteProduct({ id: productId, adminId: user.id })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts(user.id));
        }
      }
    );
  }

  const isFormValid = () => {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-[#FFD6D6] p-2 rounded-md font-medium"
          style={{ fontFamily: "Inter" }}
        >
          Add New Product
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((productItem) => (
          <AdminProductTile
            key={productItem._id}
            product={productItem}
            setFormData={setFormData}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
            setCurrentEditedId={setCurrentEditedId}
            handleDelete={handleDelete}
            onEdit={() => handleEditProduct(productItem)}
          />
        ))}
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={resetForm}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          {/* Product Image Upload */}
          <h2 className="text-lg font-semibold mt-4">Product Image</h2>
          <ProductImageUpload
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            onImageSelect={setUploadedImageUrl}
          />

          {/* Category Image Upload */}
          <h2 className="text-lg font-semibold mt-4">
            Category Image{" "}
            <span className="text-sm text-gray-500">(Optional)</span>
          </h2>
          <CategoryImageUpload
            uploadedImageUrl={uploadedCategoryImageUrl}
            setUploadedImageUrl={setUploadedCategoryImageUrl}
            onImageSelect={setUploadedCategoryImageUrl}
          />

          {/* Brand Image Upload */}
          <h2 className="text-lg font-semibold mt-4">
            Brand Image{" "}
            <span className="text-sm text-gray-500">(Optional)</span>
          </h2>
          <BrandImageUpload
            uploadedImageUrl={uploadedBrandImageUrl}
            setUploadedImageUrl={setUploadedBrandImageUrl}
            onImageSelect={setUploadedBrandImageUrl}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null
                  ? uploading
                    ? "Updating..."
                    : "Update"
                  : uploading
                  ? "Adding..."
                  : "Add"
              }
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid() || uploading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
