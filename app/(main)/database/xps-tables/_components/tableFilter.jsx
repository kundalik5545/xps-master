import { FilterReset, InputFilter } from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";
import { cn } from "@/lib/utils";

const DbTableFilter = ({ table, rowSelection, resetFilters }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filters */}
      <div className="flex flex-col gap-3 w-full md:flex-row md:flex-1 md:items-center">
        {/* Menu Name */}
        <InputFilter
          column={table.getColumn("tableName")}
          placeholder="Search by table name"
        />
      </div>

      {/* Hide show columns */}
      <TableColVisibilitySelect table={table} />

      {/* Right side: actions */}
      <div
        className={cn("flex items-center", rowSelection ? "gap-2" : "gap-0")}
      >
        <FilterReset resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default DbTableFilter;
