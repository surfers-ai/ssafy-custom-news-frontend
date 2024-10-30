export const REG_EXP_EMOJI =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
export const REG_EXP_NAME = /^[a-zA-Z가-힣\s]*$/;
export const REG_EXP_PHONE = /^([0-9]{2,3})([0-9]{3,4})([0-9]{4})$/;
export const REG_EXP_DATE = /(\d{4})(\d{2})(\d{2})/g;

export const REG_EXP_BIRTHDAY = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;

export const REG_EXP_LOGINID = /^[a-z]+[a-z0-9\-_.]{4,20}$/;

export const REG_EXP_PASSWORD =
  /^(?=.*[a-zA-Z])(?=.*[`~!@#$%^*+=-_[\]{}:;'",./<>?])(?=.*[0-9]).{8,}$/;

export const REG_EXP_EMAIL =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export const REG_EXP_ENGLISH = /^[a-zA-Z]*$/;

export const REG_EXP_SPECIALCHARACTER = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/ ]/gi;

export const REG_EXP_NUM_HYPEN = /[^0-9-]/g;
export const REG_EXP_INTEGER = /\D/g;
export const REG_EXP_INTEGER_P = /[^0-9]/g;
export const REG_EXP_EN_INTEGER = /[^a-zA-Z0-9]/g;
