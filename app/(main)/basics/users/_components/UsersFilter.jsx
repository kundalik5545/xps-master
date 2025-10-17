import {
  FilterMultiDelete,
  FilterReset,
  InputFilter,
} from "@/components/myUi/FilterComponents";
import { TableColVisibilitySelect } from "@/components/myUi/TableComponents";
import { cn } from "@/lib/utils";

const UsersFilter = ({
  table,
  rowSelection,
  resetFilters,
  handleMultiDelete,
  loading,
}) => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 items-center gap-4 mb-2">
      {/* Left side: filters */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <InputFilter
            column={table.getColumn("userame")}
            placeholder="Search by user name"
          />

          <InputFilter
            column={table.getColumn("eMemberId")}
            placeholder="Search by eMember id"
          />

          <InputFilter
            column={table.getColumn("xpsId")}
            placeholder="Search by xps id"
          />
        </div>

        <div className="flex items-center gap-2">
          <InputFilter
            column={table.getColumn("userHashId")}
            placeholder="Search by user hash id"
          />

          <InputFilter
            column={table.getColumn("xpsSchemeId")}
            placeholder="Search by xps scheme id"
          />

          <InputFilter
            column={table.getColumn("eMemberSchemeId")}
            placeholder="Search by eMember scheme id"
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

export default UsersFilter;
