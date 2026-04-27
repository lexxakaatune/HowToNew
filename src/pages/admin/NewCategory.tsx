import React, { useState } from "react";
import { createCategory } from "../../services/api";
import { useNavigate } from "react-router-dom";

const NewCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Upload image directly to Cloudinary and store URL
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "HowTool"); // same preset as articles

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtpe1a6tb/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImage(data.secure_url); // store Cloudinary URL
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      imageUrl: image,
    };

    try {
      const res = await createCategory(payload);
      const created = res.data;
      alert(JSON.stringify(created));
      const id = created.id || created._id;

      navigate(`/categories/${id}`);
    } catch (err: any) {
      const backendError = err.response?.data?.error || err.response?.data?.message || err.message;
      console.error("Create category failed:", backendError);
      alert(`Error: ${backendError}`);
    }
  };

  return (
    <div className="p-6 bg-dark-800 rounded-xl border border-dark-500">
      <h2 className="text-white text-xl font-semibold mb-4">Create New Category</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white"
          required
        />

        <textarea
          placeholder="Category Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white h-24"
        />

        {/* IMAGE UPLOAD */}
        <div className="text-white">
          <label className="block mb-1">Upload Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white"
          />
        </div>

        {/* Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border border-dark-500"
          />
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};

export default NewCategory;