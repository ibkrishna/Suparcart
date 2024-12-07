export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    placeholder: "Enter your mobile number",
    componentType: "input",
    type: "text",
    pattern: "[6-9][0-9]{9}",
    maxLength: 10,
  },
  {
    name: "role",
    label: "Role",
    componentType: "radio",
    options: [
      { value: "user", label: "User" },
      { value: "admin", label: "Admin" },
    ],
  },
];


export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  }
];

export const otpFormControls = [
  {
    name: "mobileNumber",
    label: "Mobile Number",
    placeholder: "Enter your mobile number",
    componentType: "input",
    type: "text",
    pattern: "[6-9][0-9]{9}",
    maxLength: 10,
  },
  {
    name: "otp",
    label: "OTP",
    placeholder: "Enter the OTP sent to your mobile",
    componentType: "input",
    type: "text",
    maxLength: 6,
    condition: (formData) => formData.isOTPRequested,
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    componentType: "input",
    placeholder: "Enter product category",
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    componentType: "input",
    placeholder: "Enter product brand",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "HOME",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "PRODUCTS",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "MEN",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "WOMEN",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "KIDS",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "FOOTWEAR",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "ACCESSORIES",
    path: "/shop/listing",
  },
  // {
  //   id: "search",
  //   label: "Search",
  //   path: "/shop/search",
  // },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
