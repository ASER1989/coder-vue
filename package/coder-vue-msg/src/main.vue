<!---
  alert消息提示
-->
<template>
  <transition name="slide-fade">
    <div class="ctx-outer" v-show="visible">
      <dl :class="['ctx-alert',typeClass]">
        <dt class="icon-box"><i :class="['icon',iconClass]" v-if="iconClass"></i></dt>
        <dd>
          <span class="alert-txt">{{txt}}</span>
        </dd>

      </dl>
    </div>
  </transition>
</template>
<script>
    const typeMap = {
        success: 'success',
        warning: 'warning',
        error: 'error'
    };

    export default {
        data() {
            return {
                type: "success",
                txt: "",
                onClose: null,
                visible: false,
                timer: null,
                closed: false,
                duration: 3000
            }
        },
        computed: {
            typeClass() {
                return this.type && typeMap[this.type]
                    ? `alert-${ typeMap[this.type] }`
                    : '';
            },
            iconClass() {
                return this.type && typeMap[this.type]
                    ? `icon-${ typeMap[this.type] }`
                    : null;
            }
        },
        watch: {
            closed(newVal) {
                if (newVal) {
                    this.visible = false;
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        },
        methods: {
            close() {
                if (!this.closed) {
                    this.closed = true;
                }
                typeof this.onClose == "function" && this.onClose(this);
            },
            destroyElement() {
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            }
        },
        mounted() {
            this.duration = this.duration >= 1000 ? this.duration : 3000;
            this.timer != null && window.clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                !this.closed && this.close();
            }, this.duration)
        }
    }
</script>
<style lang="stylus" scoped>

  .ctx-outer
    width: 600px;
    position: fixed;
    top: 15%;
    left: 50%;
    margin-left: -300px;
    background-color transparent
    z-index 199997

  .ctx-alert
    padding 13px 20px
    display table
    text-align left
    min-width 216px
    line-height 20px
    border-radius 5px
    margin 0 auto
    &.alert-success
      background-color #ecf8f8
      border solid 1px #caebed
      color #47BAC1
    &.alert-error
      background-color #fceef3
      border solid 1px #f8d1df
      color #E95E90
    &.alert-warning
      background-color #fef6e7
      border solid 1px #fde7bc
      color #FAAD15
    .alert-txt
      display inline-block
      word-break break-all
      word-wrap break-word

  .icon-box
    display: table-cell;
    vertical-align: middle;
    width: 20px;

  .icon
    display block
    width 20px
    height 20px
    background-size 100% auto
    background-repeat no-repeat
    margin-top: -2px;
    margin-right 10px;
    &.icon-success
      background-image url("../icon/success.png")
    &.icon-error
      background-image url("../icon/error.png")
    &.icon-warning
      background-image url("../icon/warning.png")

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter
    transform: translateY(-15px);
    opacity: 0;

  .slide-fade-leave-to
    transform: translateY(20px);
    opacity: 0;
</style>
