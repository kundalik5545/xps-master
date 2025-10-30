import {
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";
import { cn } from "@/lib/utils";

const XpsTCFilter = ({ table, rowSelection, resetFilters }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
      <div className="grid sm:col-span-11 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {/* Test Case Name */}
        <InputFilter
          column={table.getColumn("testCaseName")}
          placeholder="Search by test case name"
        />

        {/* Scheme Type */}
        <SelectFilter
          column={table.getColumn("schemeType")}
          placeholder="Filter by scheme type"
          options={schemeTypeOptions}
        />

        {/* Scheme Level */}
        <SelectFilter
          column={table.getColumn("schemeLevel")}
          placeholder="Filter by scheme level"
          options={schemeLevelOptions}
        />

        {/* Module */}
        <SelectFilter
          column={table.getColumn("module")}
          placeholder="Filter by module"
          options={moduleOptions}
        />

        {/* Automation Status */}
        <SelectFilter
          column={table.getColumn("automationStatus")}
          placeholder="Filter by automation status"
          options={automationStatusOptions}
        />
      </div>

      <div className="grid col-span-1 2xl:grid-cols-2 gap-2 justify-end 2xl:items-center">
        {/* Hide show columns */}
        <TableColVisibilitySelect table={table} />

        <FilterReset resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default XpsTCFilter;

const schemeLevelOptions = [
  { label: "TL", value: "TL" },
  { label: "SL", value: "SL" },
  { label: "ML", value: "ML" },
];

const moduleOptions = [
  { label: "Details", value: "Details" },
  { label: "Tools And Processes", value: "ToolsAndProcesses" },
  { label: "Letters", value: "Letters" },
  { label: "Reports", value: "Reports" },
  { label: "Leavers", value: "Leavers" },
];

const automationStatusOptions = [
  { label: "Automated", value: "Automated" },
  { label: "Not Automated", value: "NotAutomated" },
  { label: "In Progress", value: "InProgress" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "On Hold", value: "OnHold" },
];

const schemeTypeOptions = [
  { label: "DC", value: "DC" },
  { label: "DB", value: "DB" },
  { label: "HYB", value: "HYB" },
  { label: "DB_HYB", value: "DB_HYB" },
  { label: "DC_HYB", value: "DC_HYB" },
  { label: "DB_DC", value: "DB_DC" },
  { label: "Automated", value: "Automated" },
];
