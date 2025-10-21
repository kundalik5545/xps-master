import {
  FilterReset,
  InputFilter,
  SelectFilter,
} from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";
import { cn } from "@/lib/utils";

const EmBugsFilter = ({ table, rowSelection, resetFilters }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filters */}
      <div className="flex flex-col gap-3 w-full  flex-1  ">
        {/* Bug Id */}
        <div className="flex items-center gap-2">
          <InputFilter
            column={table.getColumn("emBugId")}
            placeholder="Search by bug id"
          />

          {/* Bug Title */}
          <InputFilter
            column={table.getColumn("emBugTitle")}
            placeholder="Search by bug title"
          />

          {/* Portal Name */}
          <SelectFilter
            column={table.getColumn("portalName")}
            placeholder="Search by portal name"
            options={portalNameOptions}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* QA Bug State */}
          <SelectFilter
            column={table.getColumn("qaBugState")}
            placeholder="Search by QA bug state"
            options={qaBugStateOptions}
          />

          {/* Env */}
          <SelectFilter
            column={table.getColumn("env")}
            placeholder="Search by env"
            options={envOptions}
          />

          {/* Assigned To */}
          <SelectFilter
            column={table.getColumn("assignedTo")}
            placeholder="Search by assigned to"
            options={assignedToOptions}
          />
        </div>
      </div>

      {/* Right side: actions */}
      <div
        className={cn("flex items-center", rowSelection ? "gap-2" : "gap-0")}
      >
        {/* Hide show columns */}
        <TableColVisibilitySelect table={table} />

        {/* Right side: actions */}
        <div
          className={cn("flex items-center", rowSelection ? "gap-2" : "gap-0")}
        >
          <FilterReset resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
};

export default EmBugsFilter;

const portalNameOptions = [
  { label: "XPS", value: "XPS" },
  { label: "eMember", value: "eMember" },
];

const qaBugStateOptions = [
  { label: "Proposed", value: "Proposed" },
  { label: "Open", value: "Open" },
  { label: "Closed", value: "Closed" },
];

const envOptions = [
  { label: "ST", value: "ST" },
  { label: "IAT", value: "IAT" },
  { label: "PROD", value: "PROD" },
  { label: "UAT", value: "UAT" },
];

const assignedToOptions = [
  { label: "Kundalik", value: "Kundalik" },
  { label: "Priti", value: "Priti" },
  { label: "Swamy", value: "Swamy" },
  { label: "George", value: "George" },
];
