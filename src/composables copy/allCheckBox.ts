import type { Ref } from 'vue';

export default function useAllCheckBox({
  dataList,
  valueKey,
}: {
  dataList: Ref<any[]>;
  /**
   * checkedList가 string[] || number[] 일 경유 필수
   */
  valueKey?: string;
}) {
  const route = useRoute();

  const checkedState = reactive({
    isCheckedAll: false,
    checkedList: [],
  });

  const unchecked = computed(() => {
    return checkedState.checkedList.length === 0;
  });

  function toggleCheckAll() {
    if (checkedState.isCheckedAll) {
      checkedState.checkedList = dataList.value.map((item) => {
        if (valueKey) {
          return item[valueKey];
        } else {
          return item;
        }
      });
    } else {
      checkedState.checkedList = [];
    }
  }
  function resetCheckedList() {
    checkedState.checkedList = [];
  }
  watch(
    () => checkedState.checkedList.length,
    (newVal, oldVal) => {
      if (dataList.value.length === newVal) {
        checkedState.isCheckedAll = true;
      } else {
        checkedState.isCheckedAll = false;
      }
    },
  );

  watch(route, () => {
    resetCheckedList();
  });

  return { checkedState, toggleCheckAll, resetCheckedList, unchecked };
}
