import {
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";
import { cn } from "@/lib/utils";

const EmTCFilter = ({ table, rowSelection, resetFilters }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filters */}
      <div className="flex flex-col gap-3 w-full md:flex-row md:flex-1 md:items-center">
        {/* Menu Name */}
        <InputFilter
          column={table.getColumn("testCaseName")}
          placeholder="Search by test case name"
        />

        {/* Portal Name */}
        <SelectFilter
          column={table.getColumn("portalName")}
          placeholder="Filter by portal name"
          options={portalNameOptions}
        />

        {/* Automation Status */}
        <SelectFilter
          column={table.getColumn("automationStatus")}
          placeholder="Filter by automation status"
          options={automationStatusOptions}
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

export default EmTCFilter;

const portalNameOptions = [
  { label: "XPS", value: "XPS" },
  { label: "eMember", value: "eMember" },
  { label: "CAT", value: "CAT" },
  { label: "Fusion", value: "Fusion" },
  { label: "Hangfire", value: "Hangfire" },
];

const automationStatusOptions = [
  { label: "Automated", value: "Automated" },
  { label: "Not Automated", value: "NotAutomated" },
  { label: "In Progress", value: "InProgress" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "On Hold", value: "OnHold" },
];
