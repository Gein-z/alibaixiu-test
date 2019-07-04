$('#userForm').on('submit', function () {
  //获取到用户在表单中输入的内容并将内容格式化成参数字符串
  var formData = $(this).serialize();
  //向服务器端发送添加用户的请求
  $.ajax({
    type: 'post',
    url: '/users',
    data: formData,
    success: function () {
      //刷新页面
      location.reload();
    },
    error: function () {
      alert('用户添加失败');
    }
  })
  //阻止表单默认行为
  return false;
})

//头像上传
$('#formBox').on('change', '#avatar', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  // jq中$.ajax默认的contentType是'application/x-www-form-urlencoded'
  // jq中$.ajax会默认把数据变成key=value&key=value的形式,现在不需要，现在是二进制数据
  $.ajax({
    type: 'post',//get或post
    url: '/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success: function (result) {//成功的回调函数
      // console.log(result)
      $('#preview').attr('src', result[0].avatar);
      $('#hiddenAvatar').val(result[0].avatar);
    }
  })
})

$.ajax({
  type: 'get',//get或post
  url: '/users',//请求的地址
  // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  // dataType:'json',
  success: function (result) {//成功的回调函数
    var html = template('userTpl', { data: result });
    $('#usersBox').html(html);
  }
})

$('#usersBox').on('click', '.edit', function () {
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'get',//get或post
    url: '/users/' + id,//请求的地址
    data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
      // console.log(result)
      var html = template('modifyFormTpl', result);
      $('#formBox').html(html);
    }
  })
})


$('#formBox').on('submit', '#userForm', function () {
  // console.log($(this).serialize());
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    type: 'put',//get或post
    url: '/users/' + id,//请求的地址
    data: $(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success: function (result) {//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false;
})

$('#usersBox').on('click', '.delete', function () {
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    type: 'delete',//get或post
    url: '/users/' + id,//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success: function (result) {//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
})

$('#selectAll').on('change', function () {
  var bool = $(this).prop('checked');
  $('#usersBox').find('input').prop('checked', bool);
  if(bool == true){
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();
  }
})
$('#usersBox').on('change', '.status', function () {
  if ($('#usersBox').find('input').length == $('#usersBox').find('input').filter(':checked').length) {
    $('#selectAll').prop('checked', true);
  } else {
    $('#selectAll').prop('checked', false);
  }
  if($('#usersBox').find('input').filter(':checked').length >= 2){
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();
  }
})

$('#deleteMany').on('click',function(){
  var selectAll = $('#usersBox').find('input').filter(':checked');
  var arr = [];
  selectAll.each(function(index,element) {
    // console.log($(element).attr('data-id'));
    arr.push($(element).attr('data-id'));
  })
  $.ajax({
    type:'delete',//get或post
    url:'/users/' + arr.join('-'),//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
})