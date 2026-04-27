import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { fetchCategoriesWithCount, deleteCategory } from "../../services/api";

const CategoryManagement = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCategoriesWithCount();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
        setCategories([]);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      try {
        await deleteCategory(id);
        const res = await fetchCategoriesWithCount();
        setCategories(res.data || []);
        setDeleteConfirm(null);
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete category");
      }
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Categories</h2>
        <Link
          to="/admin/categories/new"
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <Plus size={18} />
          New Category
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-900 border border-dark-500 rounded-lg py-3 pl-12 pr-4 text-white 
            placeholder-gray-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-dark-800 rounded-xl border border-dark-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-900 border-b border-dark-500">
              <tr>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Name</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Description</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Articles</th>
                <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-500">
              {filteredCategories.map((cat) => (
                <tr key={cat._id} className="hover:bg-dark-700/50">
                  <td className="px-6 py-4 text-white font-medium">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-400">{cat.description}</td>
                  <td className="px-6 py-4 text-gray-400">{cat.articleCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/categories/edit/${cat._id}`}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          deleteConfirm === cat._id
                            ? "text-red-500 bg-red-500/10"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                        }`}
                        title={
                          deleteConfirm === cat._id
                            ? "Click again to confirm"
                            : "Delete"
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;