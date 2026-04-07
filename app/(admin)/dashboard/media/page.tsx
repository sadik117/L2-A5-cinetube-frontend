"use client";

import { useState, useEffect } from "react";
import { createMedia, updateMedia, deleteMedia, getAllMedia } from "@/services/admin.api";
import { toast } from "sonner";
import { Film, Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import { Media } from "@/lib/types/types";

export default function ManageMediaPage() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "movie" as "movie" | "series",
    priceType: "Free" as "Free" | "Premium",
    releaseYear: new Date().getFullYear(),
    director: "",
    synopsis: "",
    platform: "",
    youtubeLink: "",
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const data = await getAllMedia();
      setMediaList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch media:", error);
      toast.error("Failed to load media list");
      setMediaList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSubmitting(true);
    try {
      if (editingMedia) {
        await updateMedia(editingMedia.id, formData);
        toast.success("Media updated successfully");
      } else {
        await createMedia(formData);
        toast.success("Media created successfully");
      }

      setShowForm(false);
      setEditingMedia(null);
      resetForm();
      fetchMedia();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save media");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "movie",
      priceType: "Free",
      releaseYear: new Date().getFullYear(),
      director: "",
      synopsis: "",
      platform: "",
      youtubeLink: "",
    });
  };

  const handleEdit = (media: Media) => {
    setEditingMedia(media);
    setFormData({
      title: media.title,
      type: media.type,
      priceType: media.priceType,
      releaseYear: media.releaseYear,
      director: media.director || "",
      synopsis: media.synopsis || "",
      platform: media.platform || "",
      youtubeLink: media.youtubeLink || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      await deleteMedia(id);
      toast.success("Media deleted successfully");
      fetchMedia();
    } catch (error) {
      toast.error("Failed to delete media");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Media</h1>
        <button
          onClick={() => {
            setEditingMedia(null);
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-semibold transition"
        >
          <Plus className="w-5 h-5" />
          Add New Media
        </button>
      </div>

      {/* Media Table */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          </div>
        ) : mediaList.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No media found</p>
            <p className="text-sm mt-2">Add your first movie or series</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-6">Title</th>
                <th className="text-left p-6">Type</th>
                <th className="text-left p-6">Price</th>
                <th className="text-left p-6">Year</th>
                <th className="text-left p-6">Rating</th>
                <th className="text-right p-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaList.map((media) => (
                <tr key={media.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="p-6 font-medium">{media.title}</td>
                  <td className="p-6 capitalize">{media.type}</td>
                  <td className="p-6">
                    <span className={`px-4 py-1 rounded-full text-xs font-medium ${
                      media.priceType === "Premium" 
                        ? "bg-red-500/20 text-red-400" 
                        : "bg-green-500/20 text-green-400"
                    }`}>
                      {media.priceType}
                    </span>
                  </td>
                  <td className="p-6">{media.releaseYear}</td>
                  <td className="p-6">
                    {media.averageRating ? media.averageRating.toFixed(1) : "—"} ★
                  </td>
                  <td className="p-6 text-right space-x-3">
                    <button 
                      onClick={() => handleEdit(media)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 hover:text-blue-500"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(media.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">
              {editingMedia ? "Edit Media" : "Add New Media"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 focus:border-red-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "movie" | "series" })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3"
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Price Type</label>
                  <select
                    value={formData.priceType}
                    onChange={(e) => setFormData({ ...formData, priceType: e.target.value as "Free" | "Premium" })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3"
                  >
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Release Year</label>
                <input
                  type="number"
                  value={formData.releaseYear}
                  onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border border-gray-700 rounded-2xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-2xl font-semibold disabled:opacity-70"
                >
                  {submitting ? "Saving..." : editingMedia ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}