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
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
      <div className="grid sm:col-span-11 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        <InputFilter
          column={table.getColumn("username")}
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
          placeholder="Search by EM scheme id"
        />
      </div>

      <div className="grid col-span-1 gap-2 items-center">
        {/* Hide show columns */}
        <TableColVisibilitySelect table={table} />

        {/* Multi Delete */}
        <FilterMultiDelete
          rowSelection={rowSelection}
          handleMultiDelete={handleMultiDelete}
          loading={loading}
        />

        {/* Reset Filters */}
        <FilterReset resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default UsersFilter;
