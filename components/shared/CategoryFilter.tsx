"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {

  //   }, 300);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [categories, searchParams, router]);
  return (
    <div className="w-full md:w-1/2 ">
      <Select onValueChange={(e: string) => onSelectCategory(e)}>
        <SelectTrigger className="select-field outline-none">
          <SelectValue placeholder="Tech Stack" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="All"
            className="select-item outline-none p-regular-14"
          >
            All Projects
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              value={category.name}
              key={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
