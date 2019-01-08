import Msg from "./package/coder-vue-msg/index.js"


const CoderVue = {
    install: function (Vue, opts = {}) {
        // Vue.component('component-name',component)
        Vue.prototype.$msg = Vue.prototype.$Msg = Msg;
    }
}

export const msg = Msg;
export default CoderVue;
