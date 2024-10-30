import type { RouteLocationRaw } from "vue-router";
import * as _ from "lodash";
import { PAGE_SIZE_LIST } from "@@/constants/common";
import type { SearchList } from "@@/@types/searchList";

export default function useSearchList(
  fetchList: Function,
  {
    initialQuery,
    updateListCallback,
    autoLoad = true,
  }: {
    initialQuery: any;
    updateListCallback?: () => void;
    autoLoad?: boolean;
  },
) {
  const router = useRouter();
  const route = useRoute();

  const PAGE_SIZE = 50;
  const PAGING_QUERY = {
    page: 1,
    pageSize: PAGE_SIZE,
  };

  const getRouteQuery = () => {
    console.log("initialQuery", initialQuery);
    console.log("route.query", route.query);
    const query = { ...route.query };
    Object.entries(initialQuery).forEach(([key, value]) => {
      if (Array.isArray(value) && !Array.isArray(query[key])) {
        if (!query[key]) return;
        console.log("query[key]", query[key]);
        query[key] = query[key] ? [query[key]] : [];
      }
    });
    console.log("getRouteQuery", query);
    return query;
  };

  const searchData = { ...PAGING_QUERY, ...initialQuery, ...getRouteQuery() };

  const inputQuery = ref({ ...searchData });
  const list = ref([]);
  const totalCount = ref(0);

  function moveTo(page: number) {
    inputQuery.value.page = page;
    const query = { ...inputQuery.value };

    router.push(<RouteLocationRaw>{
      query: _.pickBy(query),
    });
  }

  function searchByQuery(): void {
    console.log("searchByQuery", inputQuery.value);
    inputQuery.value.page = 1;
    const query = { ...inputQuery.value };
    router.push(<RouteLocationRaw>{
      query: _.pickBy(query),
    });
  }

  async function updateList() {
    console.log("updateList", inputQuery.value);
    const data = await fetchList(_.pickBy({ ...inputQuery.value }));
    list.value = data.list || [];

    totalCount.value = Number(data.totalCount) || 0;
  }

  function resetFilter() {
    const { page, pageSize } = inputQuery.value;
    inputQuery.value = { ...initialQuery, page, pageSize };
  }

  watch(
    () => route.query,
    async (newVal, oldVal) => {
      console.log("searchList watch", route.query);
      await nextTick();

      await updateList().then(async () => {
        //console.log("444 :>> ", newVal, oldVal);
        if (updateListCallback) {
          await nextTick();
          await updateListCallback();
        }

        //console.log("555 :>> ", newVal, oldVal);
      });
    },
    { deep: true, flush: "post", immediate: autoLoad },
  );

  // 개발 편의를 위해 3개짜리 추가 (개발에서만)
  const pageSizeList = [...PAGE_SIZE_LIST];
  if (["localhost"].includes(import.meta.env.VITE_ENV)) {
    pageSizeList.splice(0, 0, { code: "3", name: "3" });
  }

  function getRowNum(index: number, isDesc: boolean = true) {
    const { pageSize, page } = inputQuery.value;
    return isDesc
      ? totalCount.value - (page - 1) * pageSize - index
      : (page - 1) * pageSize + index + 1;
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
    getRowNum,
  };

  return commonExports;
}
