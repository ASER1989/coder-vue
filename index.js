import Msg from "./package/coder-vue-msg/index.js"


const CoderVue = {
    install: function (Vue, opts = {}) {
        // Vue.component('component-name',component)
        Vue.prototype.$msg = Vue.prototype.$Msg = Msg;
    }
}

export default CoderVue;

// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue);
// }

// module.exports = {
//     version: "1.0.0",
//     Msg
// }
// module.exports.default = module.exports;
//
//