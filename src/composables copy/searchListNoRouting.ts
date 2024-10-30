import type { SearchList } from "@@/@types/searchList";
import { PAGE_SIZE_LIST } from "@@/constants/common";
import * as _ from "lodash";

export default async function useSearchListNoRouting({
  fetchList,
  initialQuery,
}: {
  fetchList: Function;
  initialQuery: any;
}) {
  const PAGE_SIZE = 10;
  const PAGING_QUERY = {
    page: 1,
    pageSize: PAGE_SIZE,
  };

  const inputQuery = ref({ ...PAGING_QUERY, ...initialQuery });
  const list = ref([]);
  const totalCount = ref(0);

  await updateList();
  function moveTo(page: number) {
    inputQuery.value = { ...inputQuery.value, page };
    updateList();
  }

  async function searchByQuery() {
    inputQuery.value = { ...inputQuery.value, page: 1 };
    await updateList();
  }

  async function updateList() {
    const data = await fetchList(_.pickBy(inputQuery.value));
    list.value = data.data || [];
    totalCount.value = Number(data.totalCount) || 0;
  }

  function resetFilter() {
    inputQuery.value = { ...PAGING_QUERY, ...initialQuery };
  }

  // 개발 편의를 위해 3개짜리 추가 (개발에서만)
  const pageSizeList = [...PAGE_SIZE_LIST];
  if (import.meta.env.DEV) {
    pageSizeList.splice(0, 0, { code: "1", name: "1" });
  }

  const commonExports: SearchList<any> = {
    inputQuery,
    list,
    totalCount,
    moveTo,
    searchByQuery,
    resetFilter,
    updateList,
    PAGE_SIZE_LIST: pageSizeList,
  };

  return commonExports;
}
