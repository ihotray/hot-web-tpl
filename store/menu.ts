import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", () => {
  const defaultMenuType = "menu-default";

  const state = reactive({
    menuType: defaultMenuType,
    clickCount: 0,
    selectedMenuHasSubItems: defaultMenuType === "menu-default",
  });

  const getMenuType = (): string => state.menuType;
  const getSelectedMenuHasSubItems = (): boolean =>
    state.selectedMenuHasSubItems;
  const getMenuClickCount = (): number => state.clickCount % 4;

  const changeSideMenuStatus = (payload: any) => {
    let { classNames, step: clickIndex, selectedMenuHasSubItems } = payload;
    const currentClasses = classNames
      ? classNames.split(" ").filter((x: string) => x !== "")
      : "";
    let nextClasses = "";
    if (!selectedMenuHasSubItems) {
      if (
        currentClasses.includes("menu-default") &&
        (clickIndex % 4 === 0 || clickIndex % 4 === 3)
      )
        clickIndex = 1;

      if (currentClasses.includes("menu-sub-hidden") && clickIndex % 4 === 2)
        clickIndex = 0;

      if (
        currentClasses.includes("menu-hidden") &&
        (clickIndex % 4 === 2 || clickIndex % 4 === 3)
      )
        clickIndex = 0;
    }

    if (clickIndex % 4 === 0) {
      if (
        currentClasses.includes("menu-default") &&
        currentClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = "menu-default menu-sub-hidden";
      } else if (currentClasses.includes("menu-default")) {
        nextClasses = "menu-default";
      } else if (currentClasses.includes("menu-sub-hidden")) {
        nextClasses = "menu-sub-hidden";
      } else if (currentClasses.includes("menu-hidden")) {
        nextClasses = "menu-hidden";
      }
      clickIndex = 0;
    } else if (clickIndex % 4 === 1) {
      if (
        currentClasses.includes("menu-default") &&
        currentClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = "menu-default menu-sub-hidden main-hidden sub-hidden";
      } else if (currentClasses.includes("menu-default")) {
        nextClasses = "menu-default sub-hidden";
      } else if (currentClasses.includes("menu-sub-hidden")) {
        nextClasses = "menu-sub-hidden main-hidden sub-hidden";
      } else if (currentClasses.includes("menu-hidden")) {
        nextClasses = "menu-hidden main-show-temporary";
      }
    } else if (clickIndex % 4 === 2) {
      if (
        currentClasses.includes("menu-default") &&
        currentClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = "menu-default menu-sub-hidden sub-hidden";
      } else if (currentClasses.includes("menu-default")) {
        nextClasses = "menu-default main-hidden sub-hidden";
      } else if (currentClasses.includes("menu-sub-hidden")) {
        nextClasses = "menu-sub-hidden sub-hidden";
      } else if (currentClasses.includes("menu-hidden")) {
        nextClasses = "menu-hidden main-show-temporary sub-show-temporary";
      }
    } else if (clickIndex % 4 === 3) {
      if (
        currentClasses.includes("menu-default") &&
        currentClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = "menu-default menu-sub-hidden sub-show-temporary";
      } else if (currentClasses.includes("menu-default")) {
        nextClasses = "menu-default sub-hidden";
      } else if (currentClasses.includes("menu-sub-hidden")) {
        nextClasses = "menu-sub-hidden sub-show-temporary";
      } else if (currentClasses.includes("menu-hidden")) {
        nextClasses = "menu-hidden main-show-temporary";
      }
    }
    if (currentClasses.includes("menu-mobile")) {
      nextClasses += " menu-mobile";
    }
    state.menuType = nextClasses;
    state.clickCount = clickIndex;
    state.selectedMenuHasSubItems = selectedMenuHasSubItems;
  };

  const changeSelectedMenuHasSubItems = (payload: boolean) => {
    state.selectedMenuHasSubItems = payload;
  };

  const addMenuClassname = (payload: any) => {
    const { classname, currentClasses } = payload;

    const nextClasses = !(currentClasses.indexOf(classname) > -1)
      ? currentClasses + " " + classname
      : currentClasses;
    state.menuType = nextClasses;
  };

  const changeSideMenuForMobile = (strCurrentClasses: any) => {
    const currentClasses = strCurrentClasses
      ? strCurrentClasses
          .split(" ")
          .filter((x: string) => x !== "" && x !== "sub-show-temporary")
      : "";
    let nextClasses = "";
    if (currentClasses.includes("main-show-temporary")) {
      nextClasses = currentClasses
        .filter((x: string) => x !== "main-show-temporary")
        .join(" ");
    } else {
      nextClasses = currentClasses.join(" ") + " main-show-temporary";
    }

    state.menuType = nextClasses;
    state.clickCount = 0;
  };

  return {
    getMenuType,
    getSelectedMenuHasSubItems,
    getMenuClickCount,
    changeSideMenuStatus,
    changeSelectedMenuHasSubItems,
    addMenuClassname,
    changeSideMenuForMobile,
  };
});
