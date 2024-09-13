import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";

import "vue3-perfect-scrollbar/style.css";

/*
<PerfectScrollbar>
    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
    <p> ... and much more content </p>
</PerfectScrollbar>
*/

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PerfectScrollbarPlugin);
});
