import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCategoryById, updateCategory } from "../../services/api";

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await fetchCategoryById(id!);
        const cat = res.data;
        setName(cat.name);
        setDescription(cat.description || "");
        setImage(cat.imageUrl || null);
      } catch (err) {
        console.error("Failed to load category", err);
      }
    };
    loadCategory();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "HowTool"); // reuse same preset

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtpe1a6tb/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImage(data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCategory(id!, { name, description, imageUrl: image });
      navigate("/admin/categories");
    } catch (err: any) {
      console.error("Update failed:", err);
      alert("Failed to update category");
    }
  };

  return (
    <div className="p-6 bg-dark-800 rounded-xl border border-dark-500">
      <h2 className="text-white text-xl font-semibold mb-4">Edit Category</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white h-24"
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" className="w-40 h-40 object-cover rounded" />}
        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg">
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;