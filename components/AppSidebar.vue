<script setup lang="ts">
import { useMenuStore } from "~/store/menu";
import { menuItems } from "~/config/menu";

const route = useRoute();

const from = ref("/");

const menuStore = useMenuStore();

const menuHiddenBreakpoint = 768;
const subHiddenBreakpoint = 1440;

const state = reactive({
  selectedParentMenu: "",
  menuItems: menuItems,
  viewingParentMenu: "",
});

onMounted(() => {
  selectMenu();
  window.addEventListener("resize", handleWindowResize);
  document.addEventListener("click", handleDocumentClick);
  handleWindowResize(null);
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
  window.removeEventListener("resize", handleWindowResize);
});

watch(
  () => route.path,
  () => {
    if (from.value !== route.path) {
      const toParentUrl: string = route.path
        .split("/")
        .filter((x) => x !== "")[0];
      if (toParentUrl !== undefined && toParentUrl !== null) {
        state.selectedParentMenu = toParentUrl.toLowerCase();
      } else {
        state.selectedParentMenu = "/";
      }
      selectMenu();
      toggle();
      menuStore.changeSideMenuStatus({
        step: 0,
        classNames: menuStore.getMenuType(),
        selectedMenuHasSubItems: menuStore.getSelectedMenuHasSubItems(),
      });

      from.value = route.path;

      window.scrollTo(0, 0);
    }
  }
);

const filteredMenuItems = (menuItems: any[]) => {
  return menuItems ? menuItems : ([] as any[]);
};

const changeSelectedParentHasNoSubmenu = (parentMenu: string) => {
  state.selectedParentMenu = parentMenu;
  state.viewingParentMenu = parentMenu;
  menuStore.changeSelectedMenuHasSubItems(false);
  menuStore.changeSideMenuStatus({
    step: 0,
    classNames: menuStore.getMenuType(),
    selectedMenuHasSubItems: false,
  });
};

const openSubMenu = (e: MouseEvent, menuItem: any) => {
  const selectedParent = menuItem.id;
  const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
  menuStore.changeSelectedMenuHasSubItems(hasSubMenu);
  if (!hasSubMenu) {
    state.viewingParentMenu = selectedParent;
    state.selectedParentMenu = selectedParent;
    toggle();
  } else {
    const currentClasses = menuStore.getMenuType()
      ? menuStore
          .getMenuType()
          .split(" ")
          .filter((x) => x !== "")
      : "";

    if (!currentClasses.includes("menu-mobile")) {
      if (
        currentClasses.includes("menu-sub-hidden") &&
        (menuStore.getMenuClickCount() === 2 ||
          menuStore.getMenuClickCount() === 0)
      ) {
        menuStore.changeSideMenuStatus({
          step: 3,
          classNames: menuStore.getMenuType(),
          selectedMenuHasSubItems: hasSubMenu,
        });
      } else if (
        currentClasses.includes("menu-hidden") &&
        (menuStore.getMenuClickCount() === 1 ||
          menuStore.getMenuClickCount() === 3)
      ) {
        menuStore.changeSideMenuStatus({
          step: 2,
          classNames: menuStore.getMenuType(),
          selectedMenuHasSubItems: hasSubMenu,
        });
      } else if (
        currentClasses.includes("menu-default") &&
        !currentClasses.includes("menu-sub-hidden") &&
        (menuStore.getMenuClickCount() === 1 ||
          menuStore.getMenuClickCount() === 3)
      ) {
        menuStore.changeSideMenuStatus({
          step: 0,
          classNames: menuStore.getMenuType(),
          selectedMenuHasSubItems: hasSubMenu,
        });
      }
    } else {
      menuStore.addMenuClassname({
        classname: "sub-show-temporary",
        currentClasses: menuStore.getMenuType(),
      });
    }
    state.viewingParentMenu = selectedParent;
  }
};

const isCurrentMenuHasSubItem = () => {
  const menuItem = state.menuItems.find(
    (x) => x.id === state.selectedParentMenu
  );
  const isCurrentMenuHasSubItem =
    menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
  if (isCurrentMenuHasSubItem != menuStore.getSelectedMenuHasSubItems()) {
    if (!isCurrentMenuHasSubItem) {
      menuStore.changeSideMenuStatus({
        step: 0,
        classNames: menuStore.getMenuType(),
        selectedMenuHasSubItems: false,
      });
    } else {
      menuStore.changeSideMenuStatus({
        step: 0,
        classNames: menuStore.getMenuType(),
        selectedMenuHasSubItems: true,
      });
    }
  }

  return isCurrentMenuHasSubItem;
};

const selectMenu = () => {
  const currentParentUrl = route.path
    .split("/")
    .filter((x: string) => x !== "")[0];
  if (currentParentUrl !== undefined && currentParentUrl !== null) {
    state.selectedParentMenu = currentParentUrl.toLowerCase();
  } else {
    state.selectedParentMenu = "/";
  }
  isCurrentMenuHasSubItem();
};

const getMenuClassesForResize = (classes: string) => {
  let nextClasses = classes.split(" ").filter((x: string) => x !== "");
  const windowWidth = window.innerWidth;

  if (windowWidth < menuHiddenBreakpoint) {
    nextClasses.push("menu-mobile");
  } else if (windowWidth < subHiddenBreakpoint) {
    nextClasses = nextClasses.filter((x: string) => x !== "menu-mobile");
    if (
      nextClasses.includes("menu-default") &&
      !nextClasses.includes("menu-sub-hidden")
    ) {
      nextClasses.push("menu-sub-hidden");
    }
  } else {
    nextClasses = nextClasses.filter((x: string) => x !== "menu-mobile");
    if (
      nextClasses.includes("menu-default") &&
      nextClasses.includes("menu-sub-hidden")
    ) {
      nextClasses = nextClasses.filter((x: string) => x !== "menu-sub-hidden");
    }
  }
  return nextClasses;
};

const handleWindowResize = (event: any) => {
  if (event && !event.isTrusted) {
    return;
  }
  let nextClasses = getMenuClassesForResize(menuStore.getMenuType());
  menuStore.changeSideMenuStatus({
    step: 0,
    classNames: nextClasses.join(" "),
    selectedMenuHasSubItems: menuStore.getSelectedMenuHasSubItems(),
  });
};

const handleDocumentClick = (e: any) => {
  state.viewingParentMenu = "";
  selectMenu();
  toggle();
};

const toggle = () => {
  const currentClasses = menuStore
    .getMenuType()
    .split(" ")
    .filter((x: string) => x !== "");
  if (
    currentClasses.includes("menu-sub-hidden") &&
    menuStore.getMenuClickCount() === 3
  ) {
    menuStore.changeSideMenuStatus({
      step: 2,
      classNames: menuStore.getMenuType(),
      selectedMenuHasSubItems: menuStore.getSelectedMenuHasSubItems(),
    });
  } else if (
    currentClasses.includes("menu-hidden") ||
    currentClasses.includes("menu-mobile")
  ) {
    if (
      !(
        menuStore.getMenuClickCount() === 1 &&
        !menuStore.getSelectedMenuHasSubItems()
      )
    ) {
      menuStore.changeSideMenuStatus({
        step: 0,
        classNames: menuStore.getMenuType(),
        selectedMenuHasSubItems: menuStore.getSelectedMenuHasSubItems(),
      });
    }
  }
};
</script>

<template>
  <div class="sidebar" @click.stop="() => {}">
    <div class="main-menu">
      <PerfectScrollbar
        class="scroll"
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >
        <ul class="list-unstyled">
          <li
            v-for="(item, index) in filteredMenuItems(state.menuItems)"
            :class="{
              active:
                (state.selectedParentMenu === item.id &&
                  state.viewingParentMenu === '') ||
                state.viewingParentMenu === item.id,
            }"
            :key="`parent_${index}`"
            :data-flag="item.id"
          >
            <a
              v-if="item.newWindow"
              :href="item.to"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i :class="item.icon" />
              {{ $t(item.label) }}
            </a>
            <a
              v-else-if="item.subs && item.subs.length > 0"
              @click.prevent="openSubMenu($event, item)"
              :href="`#${item.to}`"
            >
              <i :class="item.icon" />
              {{ $t(item.label) }}
            </a>
            <RouterLink
              v-else
              @click.native="changeSelectedParentHasNoSubmenu(item.id)"
              :to="item.to"
            >
              <i :class="item.icon" />
              {{ $t(item.label) }}
            </RouterLink>
          </li>
        </ul>
      </PerfectScrollbar>
    </div>

    <div class="sub-menu">
      <PerfectScrollbar
        class="scroll"
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >
        <ul
          v-for="(item, itemIndex) in filteredMenuItems(state.menuItems)"
          :class="{
            'list-unstyled': true,
            'd-block':
              (state.selectedParentMenu === item.id &&
                state.viewingParentMenu === '') ||
              state.viewingParentMenu === item.id,
          }"
          :data-parent="item.id"
          :key="`sub_${item.id}`"
        >
          <li
            v-for="(sub, subIndex) in filteredMenuItems(item.subs)"
            :key="`sub_${subIndex}`"
            :class="{
              'has-sub-item': sub.subs && sub.subs.length > 0,
              active: route.path.indexOf(sub.to) > -1,
            }"
          >
            <!-- open in newWindow -->
            <a
              v-if="sub.newWindow"
              :href="sub.to"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i :class="sub.icon" />
              <span>{{ $t(sub.label) }}</span>
            </a>

            <!-- has submenu -->
            <template v-else-if="sub.subs && sub.subs.length > 0">
              <BLink
                v-b-toggle="`menu_${itemIndex}_${subIndex}`"
                class="rotate-arrow-icon opacity-50"
              >
                <i class="pi pi-arrow-down"></i>
                <span class="d-inline-block">{{ $t(sub.label) }}</span>
              </BLink>
              <BCollapse visible :id="`menu_${itemIndex}_${subIndex}`">
                <ul class="list-unstyled third-level-menu">
                  <!--submenus -->
                  <li
                    v-for="(thirdLevelSub, thirdIndex) in filteredMenuItems(
                      sub.subs
                    )"
                    :key="`third_${itemIndex}_${subIndex}_${thirdIndex}`"
                    :class="{
                      'third-level-menu': true,
                      active: route.path === thirdLevelSub.to,
                    }"
                  >
                    <a
                      v-if="thirdLevelSub.newWindow"
                      :href="thirdLevelSub.to"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i :class="thirdLevelSub.icon" />
                      <span>{{ $t(thirdLevelSub.label) }}</span>
                    </a>
                    <RouterLink v-else :to="thirdLevelSub.to">
                      <i :class="thirdLevelSub.icon" />
                      <span>{{ $t(thirdLevelSub.label) }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </BCollapse>
            </template>

            <!-- normal link -->
            <RouterLink v-else :to="sub.to">
              <i :class="sub.icon" />
              <span>{{ $t(sub.label) }}</span>
            </RouterLink>
          </li>
        </ul>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
</style>
