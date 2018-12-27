import Vue from 'vue';
import Main from './main.vue';

let MsgConstructor = Vue.extend(Main);
let instance, seed = 1;

const Msg = function (options) {
    if (Vue.prototype.$isServer) return;
    options = options || {};
    if (typeof options === 'string') {
        options = {
            txt: options
        };
    }

    instance && instance.vm.visible && instance.close();

    let onClose = options.onClose;
    let id = 'message_' + seed++;

    options.onClose = function () {
        Msg.close(onClose);
    };

    instance = new MsgConstructor({
        data: options
    });
    instance.id = id;
    instance.vm = instance.$mount();

    document.body.appendChild(instance.vm.$el);

    instance.vm.visible = true;
    // instance.dom = instance.vm.$el;

    return instance.vm;
};

["success", "error", "warning"].forEach(item => {

    Msg[item] = function (opt) {
        opt = typeof opt == "string" ? {txt: opt} : opt;
        opt.type = item;
        return Msg(opt);
    }
});


Msg.close = function (onClose) {
    instance.vm.visible = false;
    typeof onClose == "function" && onClose(instance);

};

export default Msg;
