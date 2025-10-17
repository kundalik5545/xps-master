import { Funnel, FunnelX } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const FilterMultiDelete = ({ rowSelection, handleMultiDelete, loading }) => {
  return (
    <div>
      {handleMultiDelete &&
        rowSelection &&
        Object.keys(rowSelection).length > 0 && (
          <Button onClick={handleMultiDelete} variant={"destructive"}>
            {loading ? "Deleting..." : "Delete Selected"}
          </Button>
        )}
    </div>
  );
};

const FilterReset = ({ resetFilters }) => {
  return (
    <div>
      {resetFilters && (
        <Button
          onClick={resetFilters}
          variant={"outline"}
          className={"text-muted-foreground"}
        >
          <FunnelX />
          Reset Filters
        </Button>
      )}
    </div>
  );
};

const InputFilter = ({ column, placeholder = "Search..." }) => {
  const value = column?.getFilterValue() || "";

  return (
    <div className="relative max-w-fit md:max-w-[240px]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <Funnel className="w-4 h-4 text-muted-foreground" />
      </div>
      <Input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => column?.setFilterValue(e.target.value)}
        className="pl-9 text-foreground"
      />
    </div>
  );
};

const SelectFilter = ({ column, placeholder = "Select...", options = [] }) => {
  const val = column?.getFilterValue() ?? "";

  const handleValueChange = (selectedValue) => {
    if (!column) return;
    column.setFilterValue(selectedValue === "all" ? "" : selectedValue);
  };

  return (
    <div className="relative max-w-[240px] md:max-w-xs">
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <Funnel className="w-4 h-4 text-muted-foreground" />
      </div>
      <Select value={val} onValueChange={handleValueChange}>
        {/* ✅ add pl-8 so text doesn't overlap the icon */}
        <SelectTrigger className="min-w-[240px] pl-8">
          {val === "all"
            ? "All"
            : options.find((opt) => String(opt.value) === String(val))?.label ||
              placeholder}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((opt) => (
            <SelectItem key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { FilterMultiDelete, FilterReset, InputFilter, SelectFilter };
