import en from "@/lang/en.json";
import cn from "@/lang/zh-CN.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "zh-CN",
  messages: {
    "zh-CN": cn,
    en: en,
  },
}));