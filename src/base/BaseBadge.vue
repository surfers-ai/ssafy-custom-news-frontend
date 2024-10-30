<script setup lang="ts">
interface IProps {
  theme?:
    | "chip"
    | "bluelight"
    | "blue"
    | "redlight"
    | "red"
    | "graydark"
    | "gray"
    | "yellowlight"
    | "yellow"
    | "greenlight"
    | "green"
    | "black"
    | "transparent";
  size?: "medium" | "small";
  isGhost?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  theme: "bluelight",
  size: "medium",
});

const computedBorder = computed(() => {
  const colorSet = {
    chip: "#F2F6FF",
    bluelight: "#E5EEFF",
    blue: "#3377FF",
    redlight: "#FDE5E5",
    red: "#F46666",
    graydark: "#6A6E73",
    gray: "#F8F8F8",
    yellowlight: "#FFF199",
    yellow: "#FFE433",
    greenlight: "#EEFFE5",
    green: "#7A996B",
    black: "#20262D",
    transparent: "transparent",
  };

  //   const ghostColorSet = {
  //     bluelight: "#E5EEFF",
  //     blue: "#3377FF",
  //     redlight: "#FDE5E5",
  //     red: "#F46666",
  //     graydark: "#6A6E73",
  //     gray: "#F8F8F8",
  //     yellowlight: "#FFE433",
  //     yellow: "#FFE433",
  //     greenlight: "#EEFFE5",
  //     green: "#7A996B",
  //     black: "#20262D",
  //     transparent: "transparent",
  //   };
  //let ret = "";
  //   if (!props.isGhost) {
  //     ret = fillColorSet[props.theme] || "#000000";
  //   } else {
  //     ret = ghostColorSet[props.theme] || "#000000";
  //   }
  return colorSet[props.theme] || "#000000";
});
const computedBackground = computed(() => {
  const fillColorSet = {
    chip: "#F2F6FF",
    bluelight: "#E5EEFF",
    blue: "#3377FF",
    redlight: "#FDE5E5",
    red: "#F46666",
    graydark: "#6A6E73",
    gray: "#F8F8F8",
    yellowlight: "#FFF199",
    yellow: "#FFE433",
    greenlight: "#EEFFE5",
    green: "#7A996B",
    black: "#20262D",
    transparent: "transparent",
  };

  const ghostColorSet = {
    chip: "#ffffff",
    bluelight: "#ffffff",
    blue: "#ffffff",
    redlight: "#ffffff",
    red: "#ffffff",
    graydark: "#ffffff",
    gray: "#ffffff",
    yellowlight: "#ffffff",
    yellow: "#ffffff",
    greenlight: "#ffffff",
    green: "#ffffff",
    black: "#ffffff",
    transparent: "transparent",
  };
  let ret = "";
  if (!props.isGhost) {
    ret = fillColorSet[props.theme] || "#000000";
  } else {
    ret = ghostColorSet[props.theme] || "#ffffff";
  }

  return ret;
});

const computedColor = computed(() => {
  const fillColorSet = {
    chip: "##51565C",
    bluelight: "#0055FF",
    blue: "#ffffff",
    redlight: "#F03333",
    red: "#ffffff",
    graydark: "#ffffff",
    gray: "#6A6E73",
    yellowlight: "#51565C",
    yellow: "#51565C",
    greenlight: "#4B663D",
    green: "#4B663D",
    black: "#ffffff",
    transparent: "#000000",
  };

  const ghostColorSet = {
    chip: "##51565C",
    bluelight: "#0055FF",
    blue: "#0055FF",
    redlight: "#F03333",
    red: "#F03333",
    graydark: "#6A6E73",
    gray: "#6A6E73",
    yellowlight: "#6A6E73",
    yellow: "#6A6E73",
    greenlight: "#4B663D",
    green: "#4B663D",
    black: "#000000",
    transparent: "#000000",
  };
  let ret = "";
  if (!props.isGhost) {
    ret = fillColorSet[props.theme] || "#000000";
  } else {
    ret = ghostColorSet[props.theme] || "#ffffff";
  }
  return ret;
});

const computedSize = computed(() => {
  const sizeSet = {
    medium: "20px",
    small: "18px",
  };

  return sizeSet[props.size] || "20px";
});
</script>
<template>
  <span class="badge">
    <slot />
  </span>
</template>
<style lang="scss" scoped>
.badge {
  display: inline-block;
  box-sizing: border-box;
  height: v-bind("computedSize");
  padding: v-bind("`${props.size === 'medium' ?'1px 4px':'0px 4px'}`");
  border-radius: 4px;
  border: {
    width: 1px;
    style: solid;
    color: v-bind("computedBorder");
  }
  background-color: v-bind("computedBackground");
  color: v-bind("computedColor");
  font-size: v-bind("`${props.size === 'medium' ?'12px':'11px'}`");
  line-height: v-bind(
    "`${props.size === 'medium' ?`calc(${computedSize} - 6px)`:`calc(${computedSize} - 4px)`}`"
  );
  //vertical-align: top;
}
</style>
