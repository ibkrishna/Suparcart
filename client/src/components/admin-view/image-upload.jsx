import { useState } from "react";

function ProductImageUpload({ uploadedImageUrl, setUploadedImageUrl, onImageSelect }) {
  const [loading, setLoading] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageSelect = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      setLoading(true);
      const base64 = await convertBase64(files[0]);
      setUploadedImageUrl(base64); // Store the image URL in the parent state
      onImageSelect(base64); // Call the function passed as a prop
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full md:h-[100px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> the image
          </p>
          <p className="text-xs text-gray-500">(MAX. 10MB)</p>
          <input
            onChange={handleImageSelect}
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>
      {loading && <p>Loading...</p>}
      {uploadedImageUrl && (
        <div className="mt-2">
          <img src={uploadedImageUrl} alt="Uploaded" className="h-32 w-auto" />
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
