import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInventory } from "@/contexts/InventoryContext";

interface Category {
  id: string;
  name: string;
  itemCount: number;
  description: string;
}

// Mock data
const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Medications",
    itemCount: 156,
    description: "All pharmaceutical products and medications",
  },
  {
    id: "2",
    name: "Supplies",
    itemCount: 89,
    description: "General medical supplies and consumables",
  },
  {
    id: "3",
    name: "Equipment",
    itemCount: 47,
    description: "Medical equipment and devices",
  },
  {
    id: "4",
    name: "PPE",
    itemCount: 35,
    description: "Personal protective equipment",
  },
  {
    id: "5",
    name: "Lab",
    itemCount: 29,
    description: "Laboratory supplies and equipment",
  },
];

const Categories = () => {
  const { toast } = useToast();
  // const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(MOCK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(
    undefined
  );
  const [formData, setFormData] = useState({ name: "", description: "" });

  const { categories } = useInventory();

  // Filter categories based on search
  const filterCategories = () => {
    if (!searchQuery) {
      setFilteredCategories(categories);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );

    setFilteredCategories(filtered);
  };

  React.useEffect(() => {
    filterCategories();
  }, [searchQuery, categories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddNew = () => {
    setCurrentCategory(undefined);
    setFormData({ name: "", description: "" });
    setFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const categoryName = categories.find((c) => c.id === id)?.name;

    // setCategories((prev) => prev.filter((c) => c.id !== id));

    toast({
      title: "Category deleted",
      description: `${categoryName} has been removed.`,
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentCategory) {
      // Update existing category
      // setCategories((prev) =>
      //   prev.map((c) =>
      //     c.id === currentCategory.id
      //       ? { ...c, name: formData.name, description: formData.description }
      //       : c
      //   )
      // );

      toast({
        title: "Category updated",
        description: `${formData.name} has been updated.`,
      });
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        itemCount: 0,
      };

      // setCategories((prev) => [...prev, newCategory]);

      toast({
        title: "Category added",
        description: `${formData.name} has been added.`,
      });
    }

    setFormOpen(false);
  };

  return (
    <PageContainer title="Categories">
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-end">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          className="bg-medical-500 hover:bg-medical-600"
          onClick={handleAddNew}
        >
          <Plus
            size={18}
            className="mr-2"
          />{" "}
          Add Category
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="w-1/2">Description</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-800 font-normal"
                    >
                      {category.itemCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={formOpen}
        onOpenChange={setFormOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveCategory}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-medical-500 hover:bg-medical-600"
              >
                {currentCategory ? "Update Category" : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Categories;
