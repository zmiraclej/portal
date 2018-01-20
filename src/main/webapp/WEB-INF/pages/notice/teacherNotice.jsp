<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">教师通知</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="css/jqueryTable/jqx.base.css"
          type="text/css"/>
           <link href="${ctx}/js/plugins/ztree/zTreeStyle/zTreeStyle.css" rel="stylesheet"/>
    <!--
        注意样式表优先级
        主题样式必须在easyui组件样式后。
    -->

    <link href="${ctx}/easyui/themes/insdep/easyui.css" rel="stylesheet" type="text/css">
    <link href="${ctx}/easyui/themes/insdep/easyui_animation.css" rel="stylesheet" type="text/css">
    <!--
        easyui_animation.css
        Insdep对easyui的额外增加的动画效果样式，根据需求引入或不引入，此样式不会对easyui产生影响
    -->

    <link href="${ctx}/easyui/themes/insdep/easyui_plus.css" rel="stylesheet" type="text/css">
    <!--
        easyui_plus.css
        Insdep对easyui的额外增强样式,内涵所有 insdep_xxx.css 的所有组件样式
        根据需求可单独引入insdep_xxx.css或不引入，此样式不会对easyui产生影响
    -->

    <link href="${ctx}/easyui/themes/insdep/insdep_theme_default.css" rel="stylesheet"
          type="text/css">

    <link href="${ctx}/easyui/themes/insdep/icon.css" rel="stylesheet" type="text/css">
    <!-- Bootstrap 3.3.6 -->
    <link rel="stylesheet" href="${ctx}/js/plugins/bootstrap/css/bootstrap.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="${ctx}/css/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="${ctx}/css/ionicons/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="${ctx}/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
             folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="${ctx}/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="${ctx}/css/pages/mycss.css">
    <link rel="stylesheet" href="${ctx}/css/pages/queryFile.css">

    <link rel="stylesheet" href="${ctx}/css/pages/report.css">

   
    <!--
        icon.css
        美化过的easyui官方icons样式，根据需要自行引入
    -->
	<style>
		.treeview a{
			    font-size: 14px !important;
	    }
	    
		.skin-blue-light .main-header .navbar .nav>li>a {
		        font-size: 14px !important;
		}
	</style>
</head>

<body class="hold-transition skin-blue-light sidebar-mini" style="min-width:1200px;">
<div class="wrapper">

    <!-- 头部开始 -->
    <jsp:include page="../includes/top.jsp">
        <jsp:param name="userName" value="${userName}"/>
    </jsp:include>
    <!-- 头部结束 -->


    <!-- 左边部分       startup -->
    <jsp:include page="../includes/left.jsp">
        <jsp:param name="userName" value="${userName}"/>
    </jsp:include>

    <!-- 左边部分       end -->


    <div class="content-wrapper">
        <!-- 中间部分-top     startup -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>通知发送</a></li>
                <li class="active">教师通知</li>
            </ol>
        </section>
        <!-- 中间部分-top     end -->
        <div id="middle">
            <!-- 中间部分-main     startup -->
            <section class="content" style="margin-top: 20px">
                <div class="easyui-tabs" style="width:100%;height:500px;">
                    <div title="自定义分组">
                        <div class="row">
                            <div class="col-md-3">
                                <div style='background-color:#f8f8f8;padding:5px'>
	                              <span>班级选择</span>
	                             </div>
                                <form id="form1" runat="server">
                                    <div>
                                        <ul id="treeDemo" class="ztree"></ul>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-2">
                               <div style='background-color:#f8f8f8;padding:5px'>
	                              <span>角色选择</span>
	                             </div>
                                <ul>
                                    <li>
                                        <label for="role1">
                                            <input type="checkbox" name="roleInput" id='role1'
                                                   value="1"/> 班主任
                                        </label>
                                    </li>
                                    <li>
                                        <label for="role2">
                                            <input type="checkbox" name="roleInput" id='role2'
                                                   value="2"/> 任课老师
                                        </label>
                                    </li>
                                    <li>
                                        <label for="role3">
                                            <input type="checkbox" name="roleInput" id='role3'
                                                   value="3"/> 生辅老师
                                        </label>
                                    </li>
                                    <li>
                                        <label for="role4">
                                            <input type="checkbox" name="roleInput" id='role4'
                                                   value="4"/> 备课组长
                                        </label>
                                    </li>
                                    <li>
                                        <label for="role5">
                                            <input type="checkbox" name="roleInput" id='role5'
                                                   value="5"/> 年级组长
                                        </label>
                                    </li>
                                    <li>
                                        <label for="role6">
                                            <input type="checkbox" name="roleInput" id='role6'
                                                   value="6"/> 教研组长
                                        </label>
                                    </li>
                                    <li>
                                        <label for="role7">
                                            <input type="checkbox" name="roleInput" id='role7'
                                                   value="7"/> 德育老师
                                        </label>
                                    </li>
                                    <li>
                                        <label for="role8">
                                            <input type="checkbox" name="roleInput" id='role8'
                                                   value="101"/> 学部领导
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-3">
                             <div style='background-color:#f8f8f8;padding:5px'>
                              <span>科目选择</span>
                             </div>
                               
                                <div>
                                    <div style="float:left;">
                                        <ul>
                                            <c:forEach items="${courses}" var="item" begin="0"
                                                       step="3">
                                                <li>
                                                    <label for="${item.code}">
                                                        <input type="checkbox" name="courseInput"
                                                               id="${item.code}"
                                                               value="${item.code}">
                                                        <i class="weui-icon-checked"></i>${item.name}
                                                    </label>
                                                </li>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                    <div style="float:left;">
                                        <ul>
                                            <c:forEach items="${courses}" var="item" begin="1"
                                                       step="3">
                                                <li>
                                                    <label for="${item.code}">
                                                        <input type="checkbox" name="courseInput"
                                                               id="${item.code}"
                                                               value="${item.code}">
                                                        <i class="weui-icon-checked"></i>${item.name}
                                                    </label>
                                                </li>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul>
                                            <c:forEach items="${courses}" var="item" begin="2"
                                                       step="3">
                                                <li>
                                                    <label for="${item.code}">
                                                        <input type="checkbox" name="courseInput"
                                                               id="${item.code}"
                                                               value="${item.code}">
                                                        <i class="weui-icon-checked"></i>${item.name}
                                                    </label>
                                                </li>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-3">
                                <div style='background-color:#f8f8f8;padding:5px'>
                                    <span>当前所选教师名单</span><a href="#" id="createGroup"
                                                            class="easyui-linkbutton"
                                                            iconCls="icon-save">创建自定义分组</a></div>
                                <div>
                                    <span style="margin-left:15px;color:#707070">可选人数</span>
                                    <span id="totalNum"
                                          style="margin-left:15px;font-size:30px;color:#DAA520">0</span>
                                    <span style="color:#707070">已选人数</span>
                                    <span id="selectedNum"
                                          style="margin-left:15px;font-size:30px;color:green">0</span>
                                </div>
                                <div>
                                    <table style="width:100%" id="selectedTeachers">
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div title="分组管理">
                        <div class="col-md-6">
                            <table id="dg"></table>
                        </div>
                        <div class="col-md-6">
                            <table id="memberGrid"></table>
                            <input type="hidden" id="currentGroupCode" value="">
                        </div>
                    </div>
                </div>
            </section>
            <!-- 中间部分-main     end -->
        </div>
    </div>
    <!-- 底部       startup  -->
    <%@ include file="../includes/bottom.jsp" %>
    <!-- 底部       end -->

    <div id="w" class="easyui-window" title="创建自定义分组"
         data-options="modal:true,closed:true,iconCls:'icon-save'"
         style="width:500px;height:300px;margin:10px 10px 10px 10px;text-align:center;">
        <form id="ff" class="easyui-form" method="post" data-options="novalidate:true" style="margin:40px 10px 10px 10px;" >
            <table cellpadding="10" style="border-collapse:separate; border-spacing:10px;">
                <tr>
                    <td style="width: 20%;text-align:right;"><span style="color:red;font-size: inherit">*</span>分组名称(必填): </td>
                    <td style="width: 80%;text-align:left;"><input class="easyui-textbox" type="text" name="name"
                            style="width: 80%;"  data-options="required:true"/></td>
                </tr>

                <tr>
                    <td style="width: 20%;text-align:right;">备注 （选填）: </td>
                    <td style="width: 80%;text-align:left;" rowspan="3"><input class="easyui-textbox" name="remark" data-options="multiline:true"
                               style="height:60px;width: 80%;"/></td>
                </tr>
            </table>
        </form>
        <div style="padding:15px;text-align:center; ">
            <a href="#" id="saveGroup" class="easyui-linkbutton" icon="icon-ok"
               onclick="submitForm()">提交</a>
            <a href="#" id="cancel" class="easyui-linkbutton" icon="icon-cancel" onclick="cancel()">取消</a>
        </div>
    </div>

</div>

</div>

<!-- script -->

<script type="text/javascript"
        src="${ctx}/js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- ./wrapper -->
<script src="${ctx}/js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="${ctx}/js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/js/common.js"></script>
<script src="${ctx}/js/app.min.js"></script>
<script type="text/javascript" src="${ctx}/easyui/jquery.easyui-1.5.1.min.js"></script>
<script type="text/javascript"
        src="${ctx}/easyui/themes/insdep/jquery.insdep-extend.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.core.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.excheck.min.js"></script>

<script type="text/javascript">
  var zNodes;
  var zTree;
  var setting = {
    view: {
      nameIsHTML: true
    },
    data: {
      simpleData: {
        enable: true
      },
      keep: {
        parent: true
      }
    },
    check: {
      enable: true,
      chkStyle: "checkbox",
      chkboxType: {"Y": "ps", "N": "ps"},
      chkDisabledInherit: true
    },
    open: false,
    callback: {
      onCheck: zTreeOnCheck,
    }
  };
  $(function () {
    $.ajax({
      cache: true,
      type: "get",
      url: "${ctx}/teacherNotice/searchClassTree",
      data: {pid: ''},
      async: false,
      success: function (result) {
    	console.log(result.data);
        zNodes = result.data;
      },
      error: function (data) {
      }
    });
    zTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    zTree.expandAll(false);
    zTree.expandNode(zTree.getNodes()[0], true, false, true);

    $('#createGroup').on('click', function () {
      var selected = $("#selectedNum").text();
      if (selected == '0') {
        $.messager.alert('提示', '暂未选择人员');
      } else {
        $.messager.confirm('确认', '是否保存分组', function (r) {
          if (r) {
            $('#w').window('open');
          }
        });

      }
    });

    $('#ff').form({
      url: "${ctx}/teacherNotice/saveNoticeGroup",
      onSubmit: function () {
        return $(this).form('enableValidation').form('validate');
      },
      success: function (data) {
        if(data!=null){
          var rest = eval("(" + data + ")");
          if(rest.code=="02"){
            cancel();
            slideMessage('信息提示','数据保存成功.');
            reloadDatagrid();
          }else{
            slideMessage('信息提示','数据保存失败.');
          }
        }else{
          slideMessage('信息提示','数据保存失败.');
        }
      },
      fail:function(data){
        slideMessage('信息提示','数据保存失败.' + data);
      }
    });

    $('#dg').datagrid({
      columns: [[
        {field: 'code', title: 'Code', width: 100, hidden: true},
        {field: 'name', title: '分组名称', width: 100},
        {field: 'remark', title: '备注', width: 100, align: 'right'},
        {field: 'createTime', title: '创建时间', width: 100},
        {
          field: 'operate', title: '操作', align: 'center', width:300,
          formatter: function (value, row, index) {
            var str = '<a href="#" name="opera" class="easyui-linkbutton" onclick="searchMember('
                + index + ')"> </a>';
            str = str + '<a href="#" name="delGroup" class="easyui-linkbutton"  onclick="deleteGroup('
                + index + ')"> </a>';
            return str;
          }
        }
      ]],
      onLoadSuccess: function (data) {
        $("a[name='opera']").linkbutton({text: '查看成员', plain: true, iconCls: 'icon-search'});
        $("a[name='delGroup']").linkbutton({text: '删除', plain: true, iconCls: 'icon-remove'});
      },
    });

    $.ajax({
      url: '${ctx}/teacherNotice/searchNoticeGroup',
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if ('02' == result.code) {
          $('#dg').datagrid('loadData', result.data);
        } else {
        }
      }
    });

    $('#memberGrid').datagrid({
      columns: [[
        {field: 'teacherId', title: 'Code', width: 100, hidden: true},
        {field: 'name', title: '姓名', width: 100},
        {field: 'mobile', title: '手机号', width: 100, align: 'right'},
        {
          field: 'operate', title: '操作', align: 'center', width:200,
          formatter: function (value, row, index) {
            var str = '<a href="#" name="operaMem" class="easyui-linkbutton"  onclick="deleteGroupMember('
                + index + ')"> 删除  </a>';

            return str;
          }
        }

      ]],
      onLoadSuccess: function (data) {
        $("a[name='operaMem']").linkbutton({text: '删除', plain: true, iconCls: 'icon-remove'});
      },
    });

  });

  function DateTimeFormatter(value) {
    if (value == undefined) {
      return "";
    }
    /*json格式时间转js时间格式*/
    value = value.substr(1, value.length - 2);
    var obj = eval('(' + "{Date: new " + value + "}" + ')');
    var dateValue = obj["Date"];
    if (dateValue.getFullYear() < 1900) {
      return "";
    }

    return dateValue.format("yyyy-MM-dd hh:mm:ss");
  }

  function searchMember(index) {
    var groupCode = $('#dg').datagrid( 'getRows')[index]['code'];
    $("#currentGroupCode").val(groupCode);
    $.ajax({
      url: '${ctx}/teacherNotice/searchGroupMembers?groupCode=' + groupCode,
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if ('02' == result.code) {
          $('#memberGrid').datagrid('loadData', result.data);
        } else {
        }
      }
    });
  };

  function showIconForTree(treeId, treeNode) {
    return !treeNode.isParent;
  };

  function searchM() {
    var username = $("#txtName").val()

  }

  function nodeClick(event, treeId, treeNode, clickFlag) {
    addSubNode(treeNode);
  }

  function addSubNode(treeNode) {
    if (!treeNode.isParent) return;
    var s = treeNode.children;
    if (s != undefined)
      return;
    $.ajax({
      cache: true,
      type: "get",
      url: "${ctx}/teacherNotice/searchClassTree",
      data: {pid: treeNode.id},
      async: true,
      success: function (data) {
        console.log(data);
        zTree.addNodes(treeNode, data.data);
      },
      error: function (data) {
        alert("error");
      }
    });

  }

  function zTreeOnCheck(event, treeId, treeNode) {

    var id = treeNode.id;
    var idHeader = id.substring(0, 1);
    if (idHeader == "S" || idHeader == "G") {
      var params = [];

      if (idHeader == "S") {
        var gNodes = treeNode.children;
        for (var i = 0; i < gNodes.length; i++) {
          var cNode = gNodes[i];
          var cNodeId = cNode.id;
          var p = {};
          p["gradeKeyNo"] = cNodeId.substring(1, cNodeId.length);
          p["selected"] = cNode.checked;

          params.push(p);
        }
      } else {
        var p = {};
        p["gradeKeyNo"] = id.substring(1, id.length);
        p["selected"] = treeNode.checked;

        params.push(p);
      }

      $.messager.progress({
        title: '提示',
        msg: '数据提交中，请稍候……',
        text: ''
      });

      $.ajax({
        url: "${ctx}/teacherNotice/saveTeacherGradeSelect",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(params),
        success: function (result) {
          if ('02' == result.code) {
            refreshSelectedInfo();
          } else {
          }
          $.messager.progress('close');
        }
      });
    } else if (idHeader == "C") {
      var id = treeNode.id;

      var params = [];
      var p = {};
      p["classKeyNo"] = id.substring(1, id.length);
      p["selected"] = treeNode.checked;
      params.push(p);

      $.messager.progress({
        title: '提示',
        msg: '数据提交中，请稍候……',
        text: ''
      });

      $.ajax({
        url: "${ctx}/teacherNotice/saveTeacherClassSelect",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(params),
        success: function (result) {

          if ('02' == result.code) {
            refreshSelectedInfo();
          } else {
          }
          $.messager.progress('close');
        }
      });
    } else if (idHeader == "P") {
      var id = treeNode.id;

      var params = [];
      var p = {};
      p["teacherKeyNo"] = id.substring(1, id.length);
      p["selected"] = treeNode.checked;
      params.push(p);

      $.messager.progress({
        title: '提示',
        msg: '数据提交中，请稍候……',
        text: ''
      });
      $.ajax({
        url: "${ctx}/teacherNotice/saveTeacherSelect",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(params),
        success: function (result) {
        	 $.messager.progress('close');
          if ('02' == result.code) {
            refreshSelectedInfo();
          } else {
          }
         
        }
      });
    }
  };

  $('input:checkbox[name=courseInput]').click(function () {

    var params = [];
    var p = {};
    p["courseCode"] = $(this).val();
    p["selected"] = $(this).is(':checked');

    params.push(p);

    $.messager.progress({
      title: '提示',
      msg: '数据提交中，请稍候……',
      text: ''
    });

    $.ajax({
      url: "${ctx}/teacherNotice/saveTeacherCourseSelect",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(params),
      success: function (result) {

        if ('02' == result.code) {
          refreshSelectedInfo();
        } else {
        }
        $.messager.progress('close');
      }
    });

  });

  $('input:checkbox[name=roleInput]').click(function () {
    var pes = $(":input[name=roleInput]");
	
	var params = [];
	
	for (var i = 0; i < pes.length; i++) {
		var p = {};
		p["role"] = $(pes[i]).val();
		p["selected"] = $(pes[i]).is(':checked');
		
		params.push(p);
	}

    $.messager.progress({
      title: '提示',
      msg: '数据提交中，请稍候……',
      text: ''
    });

    $.ajax({
      url: "${ctx}/teacherNotice/saveTeacherRoleSelect",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(params),
      success: function (result) {

        if ('02' == result.code) {
          refreshSelectedInfo();
        } else {
        }
        $.messager.progress('close');
      }
    });

  });

  function refreshSelectedInfo() {
    $.ajax({
      url: "${ctx}/teacherNotice/searchSelectedInfo",
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if ('02' == result.code) {
          console.log(result.data);
          var data = result.data;
          console.log(data);
          $("#totalNum").html(data["total"]);
          $("#selectedNum").html(data["selected"]);
          var ts = data["selectedTeachers"];
          var disVal1 = "";
          var disVal2 = "";
          for (var i = 0; i < ts.length; i = i + 2) {
            disVal1 = disVal1 + "<tr><td>" + ts[i] + "</td>";
            if((i+1) < ts.length){
            	disVal1 = disVal1 + "<td>" + ts[i + 1] + "</td>";
            }
            
            disVal1 = disVal1 + "</tr>";
          }
          console.log(disVal1);
          $("#selectedTeachers").empty();
          $("#selectedTeachers").append(disVal1);
        } else {
        }
      }
    });
  }

  function submitForm() {
    $('#ff').submit();
  }
  function cancel() {
    $('#w').window('close')
  }

  /**
   * 右下角显示提示信息
   * @param title
   * @param content
   */
  function slideMessage(title,content){
    $.messager.show({
      title:title,
      msg:content,
      timeout:5000,
      showType:'slide'
    });
  }

  /**
   * 动态刷新分组列表
   */
  function reloadDatagrid(){
    $.ajax({
      url: '${ctx}/teacherNotice/searchNoticeGroup',
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if ('02' == result.code) {
          $('#dg').datagrid('loadData', result.data);
        } else {
        }
      }
    });
  }
  function deleteGroup(index) {
    $.ajax({
      url: '${ctx}/teacherNotice/deleteGroup?groupCode=' + $('#dg').datagrid(
          'getRows')[index]['code'],
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if ('02' == result.code) {
          $('#dg').datagrid('loadData', result.data);
        } else {
        }
      }
    });
  };
  function deleteGroupMember(index) {
    var groupCode =  $("#currentGroupCode").val();
    var teacherMemberId = $('#memberGrid').datagrid('getRows')[index]['teacherId']
    $.ajax({
      url: '${ctx}/teacherNotice/deleteGroupMember?memberTeacherId=' + teacherMemberId + "&groupCode=" + groupCode,
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        if ('02' == result.code) {
          $('#memberGrid').datagrid('loadData', result.data);
        } else {
        }
      }
    });
  };
</script>
</body>
</html>