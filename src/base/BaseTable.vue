<script lang="ts" setup>
interface IProps {
  /** table element에 추가할 class  */
  tableClass?: string;
  /** thead 고정여부 */
  fixedHeader?: boolean;
  /** 스크롤 table 높이 */
  scrollHeight?: string;
  /** 스크롤 table 너비 */
  scrollWidth?: string;
  /** row cellpaddin */
  isSeparate?: Boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  fixedHeader: false,
  scrollWidth: "100%",
  scrollHeight: "",
});

const $table = ref<HTMLTableElement | null>(null);
const isNoData = ref(false);

const isScrollHorizontal = computed(() => {
  return props.scrollWidth && props.scrollWidth !== "100%";
});
onMounted(async () => {
  await nextTick();
  isNoData.value = $table.value?.querySelector(".nodata") ? true : false;
});
onUpdated(() => {
  isNoData.value = $table.value?.querySelector(".nodata") ? true : false;
});

// const isNoData = computed(() => {
//   //$table.value?.querySelector(".nodata");
//   return $table.value?.querySelector(".nodata") ? true : false;
// });
</script>
<template>
  <div
    :class="[
      'table',
      {
        'table--type-separate': isSeparate,
        'table--fixed-header': fixedHeader,
        'table--scroll-vertical': scrollHeight,
        'table--scroll-horizontal': isScrollHorizontal,
      },
    ]"
  >
    <table
      :class="{ tableClass, fullHeight: isNoData }"
      ref="$table"
    >
      <caption>
        <slot name="caption" />
      </caption>
      <colgroup>
        <slot
          name="colgroup"
          ref="refColgroup"
        />
      </colgroup>
      <thead>
        <slot name="thead" />
      </thead>
      <template v-if="$slots.tbodyDrag">
        <slot name="tbodyDrag" />
      </template>
      <template v-else>
        <tbody>
          <slot name="tbody" />
        </tbody>
      </template>
      <template v-if="$slots.tfoot">
        <tfoot>
          <slot name="tfoot" />
        </tfoot>
      </template>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table {
  height: v-bind("props.scrollHeight");
  overflow: visible;
  &--scroll {
    &-vertical {
      overflow-y: scroll;
    }
    &-horizontal {
      overflow-x: scroll;
    }
  }
  &--fixed {
    &-header {
      position: relative;
      & thead {
        position: sticky;
        left: 0;
        top: -1px;
        width: 100%;
        z-index: 12;
      }
    }
  }
  &.table--type-separate {
    & table {
      border-collapse: separate;
      border-spacing: 0 5px;
      & :deep() {
        tbody {
          td {
            &:first-child {
              border-radius: 3px 0 0 3px;
              border-left: 1px solid var(--c-border);
            }
            &:last-child {
              border-radius: 0 3px 3px 0;
              border-right: 1px solid var(--c-border);
            }
          }
          .tr-extend {
            td {
              padding: 0 10px;
              border: 0 none;
              text-align: left;
            }
            &__row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              column-gap: 30px;
              padding: 14px 25px;
              border: 1px solid #dfdfdf;
              border-radius: 3px;
              background-color: #f8f8f8;
            }
          }
        }
      }
    }
  }

  & table {
    width: v-bind("props.scrollWidth");
    height: auto;
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    &.fullHeight {
      height: 100%;
      & :deep() {
        .nodata {
          border-bottom: 0 none;
        }
      }
    }
  }
  & :deep() {
    th,
    td {
      height: 27px;
      border: 1px solid #e6e7e8;
      font : {
        size: 13px;
      }
      text-align: center;
      vertical-align: middle;
      &:first-child {
        border-left: 0 none;
      }
      &:last-child {
        border-right: 0 none;
      }
      &.align {
        &-left {
          text-align: left;
        }
        &-center {
          text-align: center;
        }
        &-right {
          text-align: right;
        }
      }

      &.vertical {
        &-top {
          vertical-align: top;
        }
        &-bottom {
          vertical-align: bottom;
        }
      }
      &.pre-line {
        white-space: pre-line;
      }
      &.ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    th {
      padding: 8px 16px;
      font-weight: 400;
    }
    td {
      padding: 8px 16px;
      background-color: var(--c-background);
      font-weight: 400;
      color: #20262d;

      &:nth-child(2),
      &:nth-child(4) {
      }

      /** 
      .select {
        &:only-child {
          max-width: 292px;
          min-width: 100%;
        }
      }
      .datepicker {
        &:only-child {
          min-width: 100%;
        }
      }
         */
    }
    thead {
      th {
        background-color: var(--c-cell);
        color: #6a6e73;
      }
    }
    tbody {
      tr {
        a {
          text-decoration: underline;
        }
      }
      th {
        padding: 8px 16px;
        background-color: var(--c-cell);
        text-align: left;
        color: #6a6e73;
      }
      td {
        //padding: 0;
      }
      th ~ td {
        text-align: left;
      }
      th ~ td {
        .form,
        .select,
        .datepicker {
          width: 184px;
          &:only-child {
            width: 292px;
          }
        }

        .el-range-editor {
          width: 312px;
        }
      }
      th[rowspan] ~ td,
      td:first-child,
      td:first-child ~ td {
        .form,
        .select,
        .datepicker {
          min-width: auto;
          width: 100%;
          max-width: none;
          &:only-child {
            min-width: auto;
            width: 100%;
            max-width: none;
          }
        }
      }
    }

    .form-box {
      .radio,
      .checkbox {
        margin-left: 4px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
