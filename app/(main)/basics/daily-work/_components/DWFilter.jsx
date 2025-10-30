import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";
const DWFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
  loading,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
      <div className="grid sm:col-span-11 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
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

      <div className="grid col-span-1 gap-2 items-center">
        {/* Hide show columns */}
        <TableColVisibilitySelect table={table} />

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

export default DWFilter;

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
