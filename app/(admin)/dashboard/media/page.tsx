/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { createMedia, updateMedia, deleteMedia } from "@/services/admin.api";
import { toast } from "sonner";
import {
  Film,
  Edit2,
  Trash2,
  Plus,
  Loader2,
  Search,
  X,
  DollarSign,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Media } from "@/lib/types/types";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { useMedia } from "@/hooks/useMovie";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageMediaPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Movie" | "Series">(
    "all",
  );
  const [filterPrice, setFilterPrice] = useState<"all" | "Free" | "Premium">(
    "all",
  );

  const queryClient = useQueryClient();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    type: "all",
    priceType: "all",
  });

  const { data, isLoading, isFetching } = useMediaQuery({
    page: params.page,
    limit: params.limit,
    search: params.search,
    type: params.type !== "all" ? params.type : undefined,
    priceType: params.priceType !== "all" ? params.priceType : undefined,
  });

  const mediaList: Media[] = data?.data || [];
  const meta = data?.meta || {};

  // Form data
  const [formData, setFormData] = useState<{
    title: string;
    type: "Movie" | "Series";
    priceType: "Free" | "Premium";
    releaseYear: number;
    director: string;
    synopsis: string;
    platform: string;
    youtubeLink: string;
    cast: string[];
    genre: string[];
    coverImage: string | File | null;
  }>({
    title: "",
    type: "Movie",
    priceType: "Free",
    releaseYear: new Date().getFullYear(),
    director: "",
    synopsis: "",
    platform: "",
    youtubeLink: "",
    cast: [],
    genre: [],
    coverImage: null, // start with null instead of empty string
  });

  const [newCastMember, setNewCastMember] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const GENRES = [
    "Action",
    "Adventure",
    "Crime",
    "Comedy",
    "Drama",
    "Documentary",
    "Thriller",
    "Science_fiction",
    "Psychological",
    "Sports",
    "Horror",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "cast" || key === "genre") {
          form.append(key, JSON.stringify(value));
        } else if (key === "coverImage") {
          if (value instanceof File) {
            form.append("coverImage", value);
          }
        } else {
          form.append(key, value as string);
        }
      });

      if (editingMedia) {
        await updateMedia(editingMedia.id, form);
        toast.success("Media updated");
      } else {
        await createMedia(form);
        toast.success("Media created");
      }

      queryClient.invalidateQueries({ queryKey: ["media"] });

      setShowForm(false);
      setEditingMedia(null);
    } catch (err: any) {
      toast.error("Failed to save media!!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media?")) return;

    await deleteMedia(id);
    queryClient.invalidateQueries({ queryKey: ["media"] });
    toast.success("Deleted");
  };

  const handleEdit = (media: Media) => {
    setEditingMedia(media);
    setFormData({
      ...media,
      coverImage: null,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "Movie",
      priceType: "Free",
      releaseYear: new Date().getFullYear(),
      director: "",
      synopsis: "",
      platform: "",
      youtubeLink: "",
      cast: [],
      genre: [],
      coverImage: null,
    });
    setNewCastMember("");
    setNewGenre("");
  };

  const addCastMember = () => {
    if (newCastMember.trim() && !formData.cast.includes(newCastMember.trim())) {
      setFormData({
        ...formData,
        cast: [...formData.cast, newCastMember.trim()],
      });
      setNewCastMember("");
    }
  };

  const removeCastMember = (member: string) => {
    setFormData({
      ...formData,
      cast: formData.cast.filter((c) => c !== member),
    });
  };

  const removeGenre = (genre: string) => {
    setFormData({
      ...formData,
      genre: formData.genre.filter((g) => g !== genre),
    });
  };

  const stats = {
    total: mediaList.length || 0,
    movies: mediaList.filter((m) => m.type === "Movie").length,
    series: mediaList.filter((m) => m.type === "Series").length,
    premium: mediaList.filter((m) => m.priceType === "Premium").length,
  };

  return (
    <div className="space-y-4 md:space-y-6 mt-14 ml-0 md:ml-56">
      {/* Header Stats - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-linear-to-br from-blue-500/10 to-blue-600/10 rounded-xl md:rounded-2xl p-3 md:p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-blue-400">Total Media</p>
              <p className="text-xl md:text-2xl font-bold text-white">
                {stats.total}
              </p>
            </div>
            <Film className="w-6 h-6 md:w-8 md:h-8 text-blue-400 opacity-50" />
          </div>
        </div>
        <div className="bg-linear-to-br from-purple-500/10 to-purple-600/10 rounded-xl md:rounded-2xl p-3 md:p-4 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-purple-400">Movies</p>
              <p className="text-xl md:text-2xl font-bold text-white">
                {stats.movies}
              </p>
            </div>
            <Film className="w-6 h-6 md:w-8 md:h-8 text-purple-400 opacity-50" />
          </div>
        </div>
        <div className="bg-linear-to-br from-green-500/10 to-green-600/10 rounded-xl md:rounded-2xl p-3 md:p-4 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-green-400">TV Series</p>
              <p className="text-xl md:text-2xl font-bold text-white">
                {stats.series}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-400 opacity-50" />
          </div>
        </div>
        <div className="bg-linear-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl p-3 md:p-4 border border-red-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-red-400">Premium Content</p>
              <p className="text-xl md:text-2xl font-bold text-white">
                {stats.premium}
              </p>
            </div>
            <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-red-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Manage Media
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1">
            Add, edit, or remove movies and series
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMedia(null);
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-linear-to-r from-red-500 to-purple-600 hover:shadow-lg hover:shadow-red-500/25 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          Add New Media
        </button>
      </div>

      {/* Filters - Responsive */}
      <div className="bg-gray-900/50 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or director..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setParams((prev) => ({
                  ...prev,
                  page: 1,
                  search: e.target.value,
                }));
              }}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => {
                const value = e.target.value;
                setFilterType(value as any);
                setParams((prev) => ({
                  ...prev,
                  page: 1,
                  type: value,
                }));
              }}
              className="flex-1 md:flex-none px-3 md:px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Types</option>
              <option value="Movie">Movies</option>
              <option value="Series">TV Series</option>
            </select>
            <select
              value={filterPrice}
              onChange={(e) => {
                const value = e.target.value;
                setFilterPrice(value as any);
                setParams((prev) => ({
                  ...prev,
                  page: 1,
                  priceType: value,
                }));
              }}
              className="flex-1 md:flex-none px-3 md:px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Prices</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid - Responsive */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-gray-900/50 rounded-2xl md:rounded-3xl border border-gray-800 text-center py-12 md:py-20">
          <Film className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-gray-600" />
          <p className="text-gray-400 text-base md:text-lg">No media found</p>
          <p className="text-gray-500 text-xs md:text-sm mt-1 md:mt-2">
            Add your first movie or series to get started
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {mediaList.map((media) => (
              <div
                key={media.id}
                className="group bg-gray-900/50 rounded-xl md:rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-gray-800">
                  {media.coverImage ? (
                    <Image
                      src={media.coverImage}
                      alt={media.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="w-8 h-8 md:w-12 md:h-12 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleEdit(media)}
                      className="p-1.5 bg-black/50 rounded-lg hover:bg-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(media.id)}
                      className="p-1.5 bg-black/50 rounded-lg hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span
                      className={`px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${
                        media.priceType === "Premium"
                          ? "bg-linear-to-r from-red-500 to-purple-600"
                          : "bg-green-500"
                      }`}
                    >
                      {media.priceType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2 md:p-3">
                  <h3 className="font-semibold text-sm md:text-base text-white mb-0.5 md:mb-1 line-clamp-1">
                    {media.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 mb-1 md:mb-2">
                    <span className="capitalize">{media.type}</span>
                    <span>•</span>
                    <span>{media.releaseYear}</span>
                  </div>
                  {media.director && (
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2 line-clamp-1">
                      Director: {media.director}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                    <span className="text-[10px] md:text-xs font-medium text-white">
                      {media.averageRating
                        ? media.averageRating.toFixed(1)
                        : "0.0"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - Responsive */}
          {/* {totalPages > 1 && (
            <div className="flex justify-center mt-6 md:mt-8">
              <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="p-1.5 md:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronsLeft className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 md:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                </button>

                <div className="flex gap-1 md:gap-2">
                  {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 10) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-7 h-7 md:w-9 md:h-9 text-xs md:text-sm rounded-lg transition ${
                          currentPage === pageNum
                            ? "bg-linear-to-r from-red-500 to-purple-600 text-white"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 md:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 md:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronsRight className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          )} */}

          <Pagination meta={meta} params={params} setParams={setParams} />
        </>
      )}

      {/* Add/Edit Modal - Responsive */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4 overflow-y-auto">
          <div className="bg-gray-900 rounded-xl md:rounded-3xl w-full max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-bold text-white">
                {editingMedia ? "Edit Media" : "Add New Media"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 md:p-2 hover:bg-gray-800 rounded-lg transition"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-6 space-y-4 md:space-y-5"
            >
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as "Movie" | "Series",
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Movie">Movie</option>
                    <option value="Series">TV Series</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    Price Type
                  </label>
                  <select
                    value={formData.priceType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priceType: e.target.value as "Free" | "Premium",
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    Release Year
                  </label>
                  <input
                    type="number"
                    value={formData.releaseYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        releaseYear:
                          parseInt(e.target.value) || new Date().getFullYear(),
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  Director
                </label>
                <input
                  type="text"
                  value={formData.director}
                  onChange={(e) =>
                    setFormData({ ...formData, director: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Christopher Nolan"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  Synopsis
                </label>
                <textarea
                  value={formData.synopsis}
                  onChange={(e) =>
                    setFormData({ ...formData, synopsis: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  placeholder="Enter movie/series description..."
                />
              </div>

              {/* Cast */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  Cast
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCastMember}
                    onChange={(e) => setNewCastMember(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCastMember()}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Add cast member"
                  />
                  <button
                    type="button"
                    onClick={addCastMember}
                    className="px-3 md:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg md:rounded-xl text-sm transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {formData.cast.map((member) => (
                    <span
                      key={member}
                      className="px-2 md:px-3 py-1 bg-gray-800 rounded-full text-xs md:text-sm flex items-center gap-1 md:gap-2"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() => removeCastMember(member)}
                      >
                        <X className="w-3 h-3 hover:text-red-500" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Genres */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Genres
                </label>

                <div className="flex gap-2 mb-2">
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2"
                  >
                    <option value="">Select genre</option>
                    {GENRES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (newGenre && !formData.genre.includes(newGenre)) {
                        setFormData({
                          ...formData,
                          genre: [...formData.genre, newGenre],
                        });
                      }
                    }}
                    className="px-4 py-2 bg-red-600 rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.genre.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full flex items-center gap-2"
                    >
                      {g}
                      <button onClick={() => removeGenre(g)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  Platform
                </label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Netflix, Amazon Prime, etc."
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  YouTube Trailer Link
                </label>
                <input
                  type="url"
                  value={formData.youtubeLink}
                  onChange={(e) =>
                    setFormData({ ...formData, youtubeLink: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  Cover Image{" "}
                  {editingMedia ? "(Leave empty to keep current)" : "*"}
                </label>

                {/* Current Cover Image Preview */}
                {editingMedia &&
                  editingMedia.coverImage &&
                  formData.coverImage === null && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-1">
                        Current Cover Image:
                      </p>
                      <Image
                        src={editingMedia.coverImage}
                        alt={editingMedia.title || "Cover"}
                        width={240}
                        height={320}
                        className="rounded-lg object-cover border border-gray-700"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave file input empty to keep this image
                      </p>
                    </div>
                  )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, coverImage: file });
                    }
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 md:gap-4 pt-3 md:pt-4 sticky bottom-0 bg-gray-900 py-3 md:py-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 md:py-3 border border-gray-700 rounded-lg md:rounded-xl font-medium text-sm hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 md:py-3 bg-linear-to-r from-red-500 to-purple-600 rounded-lg md:rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-70"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mx-auto" />
                  ) : editingMedia ? (
                    "Update Media"
                  ) : (
                    "Create Media"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
