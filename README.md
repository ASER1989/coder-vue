# coder-vue
vue plug in
1、alert弹窗提示插件Msg
   methods:
      success:function(option),成功提示； 
      error:function(option)，错误提示；
      warning:function(option)，警告提示；
      close:function(fn)，主动关闭提示信息；
      #参数说明
      option:
        txt:string, 消息内容(alert content);
        onClose:function, 关闭回调;
        duration:number, 自动关闭时间
        
