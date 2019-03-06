$.ajax({
      type: "post",
      url: url,
      dataType:'html',
      data : jsontext,
      success: function(data) {
      },
      complete: function(XMLHttpRequest, textStatus) {
      },
      error: function(){
      }
});

'success':当请求成功时候调用的参数，会'得到'从服务器返回的数据'data'

'complete':请求'完成'时候'调用的数据'，有两个参数 ：'XMLHttpRequest和status'