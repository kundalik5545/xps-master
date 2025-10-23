import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";
import { cn } from "@/lib/utils";

const XpsRTFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
  loading,
}) => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 items-center gap-4 mb-2">
      {/* Left side: filters */}
      <div className="flex items-center  flex-col gap-2">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Task Id */}
          <InputFilter
            column={table.getColumn("taskId")}
            placeholder="Search by task id"
          />

          {/* Task Title */}
          <InputFilter
            column={table.getColumn("taskTitle")}
            placeholder="Search by task title"
          />

          {/* Task State */}
          <SelectFilter
            column={table.getColumn("taskState")}
            placeholder="Search by task state"
            options={taskStateOptions}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Portal Name */}
          <SelectFilter
            column={table.getColumn("portalName")}
            placeholder="Search by portal name"
            options={portalNameOptions}
          />

          {/* Env */}
          <SelectFilter
            column={table.getColumn("env")}
            placeholder="Search by env"
            options={envOptions}
          />

          {/* Assigned By */}
          <SelectFilter
            column={table.getColumn("assignedBy")}
            placeholder="Search by assigned by"
            options={assignedByOptions}
          />
        </div>
      </div>

      <div className="flex flex-col items-start sm:flex-row sm:justify-between md:items-center gap-2 md:justify-end">
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
    </div>
  );
};

export default XpsRTFilter;

const taskStateOptions = [
  { label: "Proposed", value: "Proposed" },
  { label: "Active", value: "Active" },
  { label: "Released", value: "Released" },
  { label: "Resolved", value: "Resolved" },
  { label: "Closed", value: "Closed" },
  { label: "Reassigned", value: "Reassigned" },
];

const portalNameOptions = [
  { label: "XPS", value: "XPS" },
  { label: "eMember", value: "eMember" },
  { label: "CAT", value: "CAT" },
  { label: "Fusion", value: "Fusion" },
  { label: "Hangfire", value: "Hangfire" },
];

const envOptions = [
  { label: "ST", value: "ST" },
  { label: "IAT", value: "IAT" },
  { label: "UAT", value: "UAT" },
  { label: "PROD", value: "PROD" },
];

const assignedByOptions = [
  { label: "Kundalik", value: "Kundalik" },
  { label: "George", value: "George" },
  { label: "Priti", value: "Priti" },
  { label: "Steve", value: "Steve" },
  { label: "Swamy", value: "Swamy" },
  { label: "Other", value: "Other" },
];
