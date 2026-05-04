import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Kolhapur", "Pune", "Bangalore", "Hyderabad", "Chennai", "Remote"],
  },
  {
    filterType: "Technology",
    array: ["Mern", "React", "Data Scientist", "Fullstack", "Node", "Python", "Java", "Frontend", "Backend", "Mobile", "Desktop"],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selected));
  }, [selected, dispatch]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-5 shadow-sm sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-purple-500" /> Filters
        </h2>
        {selected && (
          <button
            onClick={() => setSelected("")}
            className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-300 hover:underline"
          >
            <RotateCcw size={12} /> Clear
          </button>
        )}
      </div>

      <RadioGroup value={selected} onValueChange={setSelected}>
        {filterData.map((group, idx) => (
          <div key={idx} className="mb-4 pb-4 border-b border-gray-100 dark:border-white/5 last:border-0 last:pb-0 last:mb-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              {group.filterType}
            </h3>
            <div className="space-y-1.5">
              {group.array.map((item, i) => {
                const id = `Id${idx}-${i}`;
                const checked = selected === item;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                      checked
                        ? "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <RadioGroupItem value={item} id={id} />
                    <span className="text-sm">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
