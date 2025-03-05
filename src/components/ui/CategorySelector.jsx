"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List, Plus, Pencil, Trash, Check, X } from "lucide-react";

// describing categoryselector props
// categories array containing { name color }
// selectedcategory string
// onselectcategory callback
// onaddcategory callback
// ondeletecategory callback
// onrenamecategory callback
export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
  onRenameCategory,
}) {
  const [open, setOpen] = useState(false);

  // storing new category text
  const [newCategory, setNewCategory] = useState("");

  // storing editing category name
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // checking popover close while renaming
  // We revert changes if closed
  useEffect(() => {
    if (!open) {
      setEditingCategory(null);
      setEditingValue("");
    }
  }, [open]);

  const handleStartEditing = (catName) => {
    setEditingCategory(catName);
    setEditingValue(catName);
  };

  const handleCancelEditing = () => {
    setEditingCategory(null);
    setEditingValue("");
  };

  const handleSaveEditing = () => {
    if (editingCategory && editingValue.trim()) {
      onRenameCategory(editingCategory, editingValue);
    }
    setEditingCategory(null);
    setEditingValue("");
  };

  const handleDelete = (catName) => {
    onDeleteCategory(catName);
    if (selectedCategory === catName) {
      onSelectCategory("Uncategorized");
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* using type=button to avoid form submission */}
      <PopoverTrigger>
        <Button type="button" variant="outline" className="flex items-center space-x-2">
          <List className="h-4 w-4" />
          <span>{selectedCategory || "Select Category"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2 z-50">
        <div className="space-y-2">
          {categories.map((category) => {
            const isUncategorized = category.name === "Uncategorized";
            const isEditingThis = category.name === editingCategory;

            return (
              <div
                key={category.name}
                className={`group relative flex items-center justify-between w-full rounded px-2 py-1 hover:bg-gray-100 ${category.color}`}
              >
                {isEditingThis ? (
                  <Input
                    className="h-8"
                    value={editingValue}
                    autoFocus
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectCategory(category.name)}
                    className="text-left flex-1"
                  >
                    {category.name}
                  </button>
                )}

                {/* right-side icons appearing on hover */}
                <div className="flex items-center space-x-2 ml-2">
                  {isEditingThis ? (
                    <>
                      <button
                        type="button"
                        className="hover:text-blue-400"
                        onClick={handleCancelEditing}
                        aria-label="cancel rename"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="hover:text-blue-400"
                        onClick={handleSaveEditing}
                        aria-label="confirm rename"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      {!isUncategorized && (
                        <button
                          type="button"
                          className="hover:text-blue-400 hidden group-hover:inline-block"
                          onClick={() => handleStartEditing(category.name)}
                          aria-label="rename category"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {!isUncategorized && (
                        <button
                          type="button"
                          className="hover:text-red-500 hidden group-hover:inline-block"
                          onClick={() => handleDelete(category.name)}
                          aria-label="delete category"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* adding new category input */}
          <div className="flex items-center space-x-2 mt-3">
            <Input
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button type="button" variant="ghost" onClick={handleAddNewCategory}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
