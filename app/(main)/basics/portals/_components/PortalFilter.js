import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUis/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUis/TableComponents";
import { cn } from "@/lib/utils";

const PortalFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filters */}
      <div className="flex flex-col gap-3 w-full md:flex-row md:flex-1 md:items-center">
        <SelectFilter
          column={table.getColumn("portalName")}
          placeholder="Filter by portal Name"
          options={portalNames}
        />

        <InputFilter
          column={table.getColumn("appName")}
          placeholder="Search by app name"
        />
      </div>

      {/* Hide show columns */}
      <TableColVisibilitySelect table={table} />

      {/* Right side: actions */}
      <div
        className={cn("flex items-center", rowSelection ? "gap-2" : "gap-0")}
      >
        <FilterMultiDelete
          rowSelection={rowSelection}
          handleMultiDelete={handleMultiDelete}
          loading={loading}
        />
        <FilterReset resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default PortalFilter;

const portalNames = [
  { label: "Default", value: "Default" },
  { label: "XPS", value: "XPS" },
  { label: "eMember", value: "eMember" },
];
