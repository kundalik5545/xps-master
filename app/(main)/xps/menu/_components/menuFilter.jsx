import {
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";

const MenuFilter = ({ table, resetFilters }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
      <div className="grid sm:col-span-11 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {/* Menu Name */}
        <InputFilter
          column={table.getColumn("menuName")}
          placeholder="Search by menu name"
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

      <div className="grid col-span-1 xl:grid-cols-2 2xl:grid-cols-2  2xl:justify-end gap-4 2xl:items-center">
        {/* Hide show columns */}
        <TableColVisibilitySelect table={table} />

        <FilterReset resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default MenuFilter;

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
