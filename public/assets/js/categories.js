$('#addCategory').on('submit', function () {
  console.log($(this).serialize());
  $.ajax({
    type: 'post', //get或post
    url: '/categories', //请求的地址
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
  url: '/categories', //请求的地址
  data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数
    console.log(result);
    var html = template('cateTpl', {
      data: result
    });
    $('#cateBox').html(html);
  }
})

//删除
$('#cateBox').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  var isConfirm = confirm('你真的要删除吗');
  console.log(id)
  if (isConfirm) {
    $.ajax({
      type: 'delete', //get或post
      url: '/categories/' + id, //请求的地址
      data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',
      success: function (result) { //成功的回调函数
        console.log(result);
        location.reload();
      }
    })
  }
})

//修改页面
$('#cateBox').on('click', '.edit', function () {
  var id = $(this).attr('data-id')
  console.log(id)
  $.ajax({
    type: 'get', //get或post
    url: '/categories/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result);
      var html = template('modifyTpl', result);
      $('#modifyBox').html(html);
    }
  })
})
//修改功能
$('#modifyBox').on('submit', '#modifyForm', function () {
  console.log($(this).serialize);
  var id = $(this).attr('data-id');
  var isConfirm = confirm('你真的要修改吗');
  console.log(id);
  if (isConfirm) {
    $.ajax({
      type: 'put', //get或post
      url: '/categories/' + id, //请求的地址
      data: $(this).serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',
      success: function (result) { //成功的回调函数
        console.log(result)
        location.reload();
      }
    })
  }
  return false;
})

//全选
$('#selectAll').on('change', function () {
  console.log($(this).prop('checked'));
  var bool = $(this).prop('checked');
  $('#cateBox').find('.status').prop('checked', bool);
  if (bool == true) {
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();

  }
})
//反选
$('#cateBox').on('change', '.status', function () {
  if ($('#cateBox').find('.status').length == $('#cateBox').find('.status').filter(':checked').length) {
    $('#selectAll').prop('checked', true)
  } else {
    $('#selectAll').prop('checked', false)
  }
  if ($('#cateBox').find('.status').filter(':checked').length >= 2) {
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();

  }
})

//批量删除
$('#deleteMany').on('click', function () {
  var isConfirm = confirm('你真的要删除吗');
  //所选id
  var deleteMany = $('#cateBox').find('.status').filter(':checked');
  deleteMany.each(function (index, element) {
    var id = $(element).attr('data-id');
    console.log(id);
    if (isConfirm) {
      $.ajax({
        type: 'delete', //get或post
        url: '/categories/' + id, //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) { //成功的回调函数
          console.log(result);
          location.reload();
        }
      })
    }
  })
})