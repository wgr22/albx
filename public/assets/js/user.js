$('#userForm').on('submit', function () {
  // console.log($('#userForm').serialize());
  $.ajax({
    type: 'post', //get或post
    url: '/users', //请求的地址
    data: $('#userForm').serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result)
      location.reload();
    },
    error: function (error) {
      alert('添加失败')
    }
  })
  return false;
})

//头像上传
$('#modifyBox').on('change', '#avatar', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post', //get或post
    url: '/upload', //请求的地址
    contentType: false,
    processData: false,
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result)
      $('#preview').attr('src', result[0].avatar);
      $('#abc').val(result[0].avatar);
    },
    error: function (error) {
      alert('上传失败');
    }
  })
})

//渲染列表
$.ajax({
  type: 'get', //get或post
  url: '/users', //请求的地址
  data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数

    var html = template('userTpl', {
      data: result
    });
    $('#userBox').html(html);
  }
})
//删除
$('#userBox').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  var isConfirm = confirm('你真的要删除吗');
  console.log(id)
  if (isConfirm) {
    $.ajax({
      type: 'delete', //get或post
      url: '/users/' + id, //请求的地址
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
$('#userBox').on('click', '.edit', function () {
  var id = $(this).attr('data-id')
  console.log(id)
  $.ajax({
    type: 'get', //get或post
    url: '/users/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result);
      var html = template('modifyFormTpl', result);
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
      url: '/users/' + id, //请求的地址
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
  $('#userBox').find('.status').prop('checked', bool);
  if (bool == true) {
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();

  }
})
//反选
$('#userBox').on('change', '.status', function () {
  if ($('#userBox').find('.status').length == $('#userBox').find('.status').filter(':checked').length) {
    $('#selectAll').prop('checked', true)
  } else {
    $('#selectAll').prop('checked', false)
  }
  if ($('#userBox').find('.status').filter(':checked').length >= 2) {
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();

  }
})

//批量删除
$('#deleteMany').on('click', function () {
  var isConfirm = confirm('你真的要删除吗');
  //所选id
  var deleteMany = $('#userBox').find('.status').filter(':checked');
  deleteMany.each(function (index, element) {
    var id = $(element).attr('data-id');
    console.log(id);
    if (isConfirm) {
      $.ajax({
        type: 'delete', //get或post
        url: '/users/' + id, //请求的地址
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