import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import "../../components/auth/style.css";
import Cart from "../../assets/carttt.png";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [brandIndex, setBrandIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const itemsPerSlide = 4;

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  //uniqueness for brand
  const getUniqueBrands = (products) => {
    const uniqueBrands = new Set();
    return products.filter((product) => {
      if (!uniqueBrands.has(product.brand)) {
        uniqueBrands.add(product.brand);
        return true;
      }
      return false;
    });
  };

  const uniqueBrandList = getUniqueBrands(productList);

  //uniqueness for category

  const getUniqueCategories = (products) => {
    const uniqueCategories = new Set();
    return products.filter((product) => {
      if (!uniqueCategories.has(product.category)) {
        uniqueCategories.add(product.category);
        return true;
      }
      return false;
    });
  };

  const uniqueCategoryList = getUniqueCategories(productList);

  // Handlers to move brand carousel
  const handleNextBrand = () => {
    if (brandIndex < uniqueBrandList.length - itemsPerSlide) {
      setBrandIndex(brandIndex + 1);
    }
  };

  const handlePrevBrand = () => {
    if (brandIndex > 0) {
      setBrandIndex(brandIndex - 1);
    }
  };

  // Handlers to move category carousel
  const handleNextCategory = () => {
    if (categoryIndex < uniqueCategoryList.length - itemsPerSlide) {
      setCategoryIndex(categoryIndex + 1);
    }
  };

  const handlePrevCategory = () => {
    if (categoryIndex > 0) {
      setCategoryIndex(categoryIndex - 1);
    }
  };

  //navigation
  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [item],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user) {
      toast({
        title: "Please log in to add products to your cart.",
        variant: "destructive",
      });
      return;
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  //for less than 10

  useEffect(() => {
    const filteredProducts = productList.filter(
      (product) => product.totalStock > 0 && product.totalStock < 10
    );
    setFilteredProducts(filteredProducts);
  }, [productList]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[350px] lg:h-[600px] overflow-hidden bg-[#FFD6D6]">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-fit transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl font-semibold"
              style={{ fontFamily: "Poppins" }}
            >
              Shop by <span className="text-[#FE6262]">Brand</span>
            </h2>

            <div className="flex space-x-2">
              <div
                onClick={handlePrevBrand}
                className={`cursor-pointer bg-white/80 rounded-full p-2 ${
                  brandIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={brandIndex === 0}
              >
                <IoIosArrowRoundBack className="w-8 h-8 text-[#FE6262]" />
              </div>

              <div
                onClick={handleNextBrand}
                className={`cursor-pointer bg-white/80 rounded-full p-2 ${
                  brandIndex >= uniqueBrandList.length - itemsPerSlide
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={brandIndex >= uniqueBrandList.length - itemsPerSlide}
              >
                <IoIosArrowRoundForward className="w-8 h-8 text-[#FE6262]" />
              </div>
            </div>
          </div>

          {/* brand Items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-hidden w-full">
            {uniqueBrandList
              .slice(brandIndex, brandIndex + itemsPerSlide)
              .map((brandItem) => (
                <div
                  key={brandItem._id}
                  onClick={() => {
                    handleNavigateToListingPage(brandItem.brand, "brand");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="cursor-pointer hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center"
                >
                  <div className="md:h-52 mb-4 overflow-hidden">
                    <img
                      src={brandItem.brandImage}
                      alt="brandItem"
                      className="md:min-w-[200px] md:min-h-[200px] mb-4 object-cover p-6"
                    />
                  </div>

                  <span className="text-sm text-[#FE6262] rounded-full border-[#FE6262] border-2 p-2 min-w-[120px] text-center">
                    {brandItem.brand.toUpperCase()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* 
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl font-semibold"
              style={{ fontFamily: "Poppins" }}
            >
              Shop by <span className="text-[#FE6262]">Brand</span>
            </h2>

            <div className="flex space-x-2">
              <div
                onClick={handlePrevBrand}
                className={`cursor-pointer bg-white/80 rounded-full p-2 ${
                  brandIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={brandIndex === 0}
              >
                <IoIosArrowRoundBack className="w-8 h-8 text-[#FE6262]" />
              </div>

              <div
                onClick={handleNextBrand}
                className={`cursor-pointer bg-white/80 rounded-full p-2 ${
                  brandIndex >= uniqueBrandList.length - itemsPerSlide
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={brandIndex >= uniqueBrandList.length - itemsPerSlide}
              >
                <IoIosArrowRoundForward className="w-8 h-8 text-[#FE6262]" />
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden w-full">
            {uniqueBrandList
              .slice(brandIndex, brandIndex + itemsPerSlide)
              .map((brandItem) => (
                <div
                  key={brandItem._id}
                  onClick={() => {
                    handleNavigateToListingPage(brandItem.brand, "brand");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="cursor-pointer hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center"
                >
                  <img
                    src={brandItem.brandImage}
                    alt="brand"
                    className="mb-4"
                  />
                  <span className="text-sm text-[#FE6262] rounded-full border-[#FE6262] border-2 p-2 w-[120px] text-center">
                    {brandItem.brand.toUpperCase()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section> */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-3xl font-semibold"
              style={{ fontFamily: "Poppins" }}
            >
              Shop by <span className="text-[#FE6262]">Category</span>
            </h2>

            <div className="flex space-x-2">
              <div
                onClick={handlePrevCategory}
                className={`cursor-pointer bg-white/80 rounded-full p-2 ${
                  brandIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={brandIndex === 0}
              >
                <IoIosArrowRoundBack className="w-8 h-8 text-[#FE6262]" />
              </div>

              <div
                onClick={handleNextCategory}
                className={`cursor-pointer bg-white/80 rounded-full p-2 ${
                  brandIndex >= uniqueBrandList.length - itemsPerSlide
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={brandIndex >= uniqueBrandList.length - itemsPerSlide}
              >
                <IoIosArrowRoundForward className="w-8 h-8 text-[#FE6262]" />
              </div>
            </div>
          </div>

          {/* Category Items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden w-full">
            {uniqueCategoryList
              .slice(categoryIndex, categoryIndex + itemsPerSlide)
              .map((categoryItem) => (
                <div
                  key={categoryItem._id}
                  onClick={() => {
                    handleNavigateToListingPage(
                      categoryItem.category,
                      "category"
                    );
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="cursor-pointer hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center"
                >
                  <img
                    src={categoryItem.categoryImage}
                    alt="category"
                    className="w-[150px] h-[180px] mb-4 object-cover"
                  />
                  <span className="text-sm text-[#FE6262] rounded-full border-[#FE6262] border-2 p-2 min-w-[120px] text-center">
                    {categoryItem.category.toUpperCase()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-semibold text-start mb-8"
            style={{ fontFamily: "Poppins" }}
          >
            Shop The <span className="text-[#FE6262]">New Collection</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? [...productList]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 8)
                  .map((productItem) => (
                    <ShoppingProductTile
                      key={productItem.id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  ))
              : null}
          </div>
        </div>
        <section className="flex flex-col items-center justify-center mt-4 py-12">
          <button
            className="px-6 py-2 bg-[#FE6262] text-white rounded-full transition font-bold hover:bg-[#e05555] text-xl"
            style={{ fontFamily: "Inter" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/shop/listing");
            }}
          >
            Explore More
          </button>
        </section>

        <div className="container mx-auto px-4">
          <div className="relative rounded-lg w-full flex items-center justify-center">
            <div className="relative w-full h-full md:h-96 lg:w-[90vw]">
              <img
                src={Cart}
                alt="Shopping Cart"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />

              <div
                className="relative z-10 p-8 flex flex-col justify-center h-full lg:ml-20"
                style={{ fontFamily: "Inter" }}
              >
                <h2 className="text-xs font-medium text-white uppercase mb-2">
                  New Season Sale
                </h2>
                <h1 className="text-4xl text-black mb-4">
                  <span className="text-white">Upto</span>{" "}
                  <span className="text-black">70% OFF</span>
                </h1>
                <p className="text-white mb-6">Don't miss the opportunity</p>
                <button
                  className="bg-[#D9D9D9] text-[#FE6262] py-2 px-4 rounded-md transition duration-300 w-[160px] md:w-[200px]"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/shop/listing");
                  }}
                >
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 mb-6 md:mb-14">
        <h2
          className="text-3xl font-semibold text-start mb-8"
          style={{ fontFamily: "Poppins" }}
        >
          <span className="text-[#FE6262]">Best</span> Sellers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0
            ? filteredProducts.slice(0, 4).map((productItem) => (
                <div
                  key={productItem.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/shop/bestsellers");
                  }}
                  className="cursor-pointer"
                >
                  <ShoppingProductTile
                    // handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
