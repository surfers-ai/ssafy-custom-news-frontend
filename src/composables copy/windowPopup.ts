import dayjs from "dayjs";

interface PopupOptions {
  screenWidth: number;
  option: string;
}

export default function useWindowPopup() {
  function openWindowPopup(url: string, options: PopupOptions = { screenWidth: 1400, option: "" }) {
    const { screenWidth = 1200, option = "" } = options;

    window.open(
      url,
      `${dayjs().valueOf()}`,
      `popup=yes,width=${screenWidth},height=${screen.availHeight},${option}`,
    );
  }

  function closeWindowPopup() {
    window.close();
  }

  return {
    openWindowPopup,
    closeWindowPopup,
  };
}
