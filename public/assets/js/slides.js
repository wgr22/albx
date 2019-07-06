$('#file').on('change', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  $.ajax({
    type: 'post', //get或post
    url: '/upload', //请求的地址
    processData: false,
    contentType: false,
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result);
      $('#preview').attr('src', result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar);
    }
  })
})

//添加
$('#slideForm').on('submit', function () {
  console.log($(this).serialize());
  $.ajax({
    type: 'post', //get或post
    url: '/slides', //请求的地址
    data: $(this).serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result);
      location.reload();
    }
  })
  return false;
})

//渲染列表
$.ajax({
  type: 'get', //get或post
  url: '/slides', //请求的地址
  data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数
    console.log(result)
    var html = template('slidesTpl', {
      data: result
    })
    $('#slidesBox').html(html)
  }
})

//删除
$('#slidesBox').on('click', '.delete', function () {
  if (confirm('确定要删除吗?')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'delete', //get或post
      url: '/slides/' + id, //请求的地址
      data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',
      success: function (result) { //成功的回调函数
        console.log(result)
        location.reload();
      }
    })
  }
})