<script setup lang="ts">
import { computed } from "vue";
import { ElDatePicker } from "element-plus";
import { useGlobalI18n } from "@@/locales";

defineOptions({ inheritAttrs: false });

type PickerType =
  | "year"
  | "month"
  | "date"
  | "dates"
  | "datetime"
  | "week"
  | "datetimerange"
  | "daterange"
  | "monthrange";
type DateType = Date | number | string | undefined;
type ModelValueType = DateType | DateType[];

interface IProps {
  pickerClass?: string;
  type?: PickerType;
  disabledDate?: (arg: DateType) => Boolean;
  disabled?: boolean;
  editable?: boolean;
  format?: string;
  valueFormat?: string;
  clearable?: boolean;
  size?: "large" | "default" | "small";
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  rangeSeparator?: string;
  error?: string;
  readMode?: boolean;
}

const { $t } = useGlobalI18n();

const props = withDefaults(defineProps<IProps>(), {
  pickerClass: "",
  type: "date",
  rangeSeparator: "~",
  clearable: true,
});

const modelValue = defineModel<ModelValueType | undefined>("modelValue");
const startDate = defineModel<DateType>("startDate");
const endDate = defineModel<DateType>("endDate");

const formatByType = (type: PickerType) => {
  switch (type) {
    case "month":
    case "monthrange":
      return "YYYY-MM";
    case "year":
      return "YYYY";
    case "week":
      return "ww";
    case "datetime":
    case "datetimerange":
      return "YYYY-MM-DD HH:mm:ss";
    default:
      return "YYYY-MM-DD";
  }
};

const formatDefault = computed(() => {
  return props.format || formatByType(props.type);
});

const valueFormatDefault = computed(() => {
  return props.valueFormat || formatByType(props.type);
});

// const attrs = useAttrs();
// const removeClassAttrs = computed(() => {
//   const { class: className, ...rest } = attrs;
//   return rest;
// });

const isRangeType = computed(() => startDate.value && endDate.value);

const modelValueSync = computed({
  get() {
    return isRangeType.value ? [startDate.value, endDate.value] : modelValue.value;
  },
  set(value: ModelValueType) {
    if (startDate.value && endDate.value && Array.isArray(value)) {
      startDate.value = value[0] as DateType;
      endDate.value = value[1] as DateType;
    } else modelValue.value = value as DateType;
  },
});

// 포커스 및 블러 이벤트 핸들러
function onFocus(e: FocusEvent) {
  emit("focus", e);
}

function onBlur(e: FocusEvent) {
  emit("blur", e);
}
</script>

<template>
  <span
    v-if="readMode"
    class="read-mode"
  >
    <slot
      v-if="modelValueSync"
      name="readMode"
      >{{ modelValueSync }}</slot
    >
    <span v-else>-</span>
  </span>

  <div
    v-else
    :class="['datepicker', $attrs.class, { 'is-error': error }]"
    v-bind="{ style: { ...$attrs.style } }"
  >
    <ElDatePicker
      v-if="!readMode"
      v-bind="{ class: props.pickerClass, style: null }"
      v-model="modelValueSync"
      :type="type"
      :format="format || formatDefault"
      :valueFormat="valueFormat || valueFormatDefault"
      :placeholder="placeholder || $t('common.action.selectDate')"
      :start-placeholder="startPlaceholder || $t('common.action.selectDate')"
      :end-placeholder="endPlaceholder || $t('common.action.selectDate')"
      :popper-options="{ strategy: 'fixed' }"
      popper-class="datepicker-popper"
      :teleported="false"
      :range-separator="rangeSeparator"
      :disabled="disabled"
      :disabledDate="props.disabledDate"
      @blur="onBlur"
      @focus="onFocus"
    />
    <FormErrorMessage v-if="error">{{ error }}</FormErrorMessage>
  </div>
</template>

<style lang="scss" scoped>
@mixin inputStyle {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  height: var(--datepicker-height);
  padding: 0 15px;
  border: 1px solid #e5e5e5;
  border-radius: var(--form-radius);
  color: var(--c-color);
  text-align: left;
  &:hover {
    border: 1px solid #1a1a1a;
  }
}
@mixin inputPsudoIcon {
  content: "";
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: #949494;
  background : {
    image: url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" color="%2351565C" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.49996 6.50003L13.5 6.50003M2.99996 3.50003L13 3.50003C13.2761 3.50003 13.5 3.72389 13.5 4.00003L13.5 13C13.5 13.2762 13.2761 13.5 13 13.5L2.99996 13.5C2.72382 13.5 2.49996 13.2762 2.49996 13L2.49996 4.00003C2.49996 3.72389 2.72382 3.50003 2.99996 3.50003Z" stroke="currentColor" stroke-linecap="square"/><path d="M4.5 2.5V4.5" stroke="currentColor" stroke-linecap="round"/><path d="M11.5 2.5L11.5 4.5" stroke="currentColor" stroke-linecap="round"/></svg>');
    position: 50% 50%;
    repeat: no-repeat;
  }
  font : {
    family: "Material Icons Outlined";
    size: 12px;
  }
  line-height: 1;
}

.datepicker {
  --datepicker-width: 100%;
  --datepicker-height: var(--form-height);
  display: inline-block;

  vertical-align: top;
  & :deep() {
    .el-input {
      width: var(--datepicker-width);
      height: var(--datepicker-height);
      &__wrapper {
        width: var(--datepicker-width);
        height: var(--datepicker-height);
        padding: 0;
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
        &::after {
          @include inputPsudoIcon;
          right: 0;
          top: 0;
        }
      }
      &__inner {
        @include inputStyle;
      }
    }
    .el-range {
      &-input {
        @include inputStyle;
      }
      &-separator {
        flex: 1 1 24px;
        position: relative;
        width: 24px;
        background-color: #ffffff;
        &::before {
          @include inputPsudoIcon;
          left: -35px;
          top: 0;
        }
      }
    }
    .el-input__wrapper .el-icon {
      display: none;
    }
    //.el-input__wrapper:hover .el-range__close-icon {
    //  display: inline-flex;
    //}
    //.el-input__wrapper .el-range__close-icon {
    //  position: absolute;
    //  right: 1px;
    //  top: 1px;
    //  width: 32px;
    //  height: 32px;
    //  background-color: #ffffff;
    //  z-index: 1;
    //}
  }
}
</style>
<style lang="scss" scoped>
// 달력 popup style
@mixin cellDefaultStyle {
  border-radius: var(--form-radius);
  border: 1px solid transparent;
  font: {
    size: 12px;
    family: var(--font-roboto);
  }
}
@mixin cellHoverStyle {
  border-color: #f7f7f7;
  background-color: #f7f7f7;
  color: var(--c-color);
}
@mixin cellTodayStyle {
  border-color: #cccccc;
  color: var(--c-color);
}
@mixin cellCurentStyle {
  border-color: #3377ff;
  background-color: #fafbff;
  color: var(--c-color);
}

.datepicker {
  & :deep() {
    .el-picker {
      &__popper {
        &.el-popper {
          border: 1px solid #1a1a1a;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
          background-color: #ffffff;
          .el-popper__arrow {
            display: none;
          }
        }

        .el-date {
          &-picker {
            width: 298px;
            &__header {
              margin: 24px 24px 16.5px;
              padding-bottom: 0;
              border-bottom: 0 none;
              font : {
                size: 16px;
                family: var(--font-notoSans);
              }
            }
            &__prev {
              &-btn {
                padding-left: 8px;
              }
            }
            &__next {
              &-btn {
                padding-right: 8px;
              }
            }
            &-panel {
              &__content {
                margin: 0 24px 24px;
              }
            }
            .el-picker-panel__content {
              width: 250px;
              margin: 0 24px 24px;
            }
          }

          &-table {
            tbody {
              th {
                height: auto;
                //padding: 0 0 16.5px 0;
                border-bottom: 0 none;
                text-align: center;
                font : {
                  size: 11px;
                  family: var(--font-notoSans);
                }
                border: 0 none;
                line-height: 1.55;
                background-color: transparent;
                &:first-child {
                  color: #ec0000;
                }
                &:last-child {
                  color: #0055ff;
                }
              }
            }
            &__row {
              td {
                height: auto;
                border: 0 none;
                &:first-child {
                  color: #ff8080;
                  &.prev-month,
                  &.next-month {
                    color: #fbcccc;
                  }
                }
                &:last-child {
                  color: #3377ff;
                  &.prev-month,
                  &.next-month {
                    color: #b2ccff;
                  }
                }
              }
            }
            td {
              $cellSize: 32px;
              height: $cellSize;
              padding: 4px 0;
              &:hover {
                color: var(--c-color);
                .el-date-table-cell {
                  &__text {
                    @include cellHoverStyle;
                  }
                }
              }
              .el-date-table-cell {
                height: $cellSize;
                padding: 0;
                .el-date-table-cell__text {
                  @include cellDefaultStyle;
                  box-sizing: border-box;
                  width: $cellSize;
                  height: $cellSize;
                  line-height: $cellSize;
                }
              }

              &.today {
                .el-date-table-cell {
                  .el-date-table-cell__text {
                    @include cellTodayStyle;
                  }
                }
              }
              &.current {
                .el-date-table-cell {
                  .el-date-table-cell__text {
                    @include cellCurentStyle;
                  }
                }
              }
              &.in-range {
                .el-date-table-cell .el-date-table-cell__text {
                  color: var(--c-color);
                }
                &.start-date,
                &.end-date {
                  .el-date-table-cell .el-date-table-cell__text {
                    @include cellCurentStyle;
                  }
                }
              }
            }
          }
        }
        .el-year,
        .el-month {
          &-table {
            width: calc(100% + 24px);
            margin: 0 -12px;
            th,
            td {
              width: auto;
              height: auto;
              padding: 0;
              border: 0 none;
            }
            td {
              > div {
                height: 48px;
                padding: 4px;
              }
            }
            tbody {
              tr {
                td {
                  &:first-child {
                    //text-align: left;
                    & > div {
                      //text-align: center;
                    }
                  }
                }
              }
            }
            .cell {
              $cellSize: 38px;
              @include cellDefaultStyle;
              width: $cellSize;
              height: $cellSize;
              line-height: $cellSize;
              &:hover {
                @include cellHoverStyle;
              }
            }
            .today {
              .cell {
                @include cellTodayStyle;
              }
            }
            .current {
              .cell {
                @include cellCurentStyle;
              }
              &:not(.disabled) {
                .cell {
                  @include cellCurentStyle;
                }
              }
            }
          }
        }
      }
      &-panel {
        &__icon {
          &-btn {
            width: 16px;
            height: 16px;
            margin-top: 0;
            line-height: 0;
          }
        }
        &__content {
        }
      }
    }
  }
  & :deep() {
    .error {
      display: block;
      padding-top: 8px;
      width: 100%;
    }
  }
}
.datepicker {
  & :deep() {
    .el-input__inner,
    .el-range-input {
      &:disabled {
        background-color: #fafafa;
      }
    }
  }
}

.datepicker.is-error {
  & :deep() {
    .el-input__inner,
    .el-range-input {
      border: 1px solid var(--c-error);
    }
  }
}

.read-mode {
  vertical-align: middle;
}
</style>
