var nodeCheckedSilent = false;  
function nodeChecked (event, node){  
    if(nodeCheckedSilent){  
        return;  
    }  
    nodeCheckedSilent = true;  
    checkAllParent(node);  
    checkAllSon(node);  
    nodeCheckedSilent = false;  
}  
  
var nodeUncheckedSilent = false;  
function nodeUnchecked  (event, node){  
    if(nodeUncheckedSilent)  
        return;  
    nodeUncheckedSilent = true;  
    uncheckAllParent(node);  
    uncheckAllSon(node);  
    nodeUncheckedSilent = false;  
}  
  
//选中全部父节点  
function checkAllParent(node){  
    $('#menusTree').treeview('checkNode',node.nodeId,{silent:true});  
    var parentNode = $('#menusTree').treeview('getParent',node.nodeId);  
    if(!("nodeId" in parentNode)){  
        return;  
    }else{  
        checkAllParent(parentNode);  
    }  
}  
//取消全部父节点  
function uncheckAllParent(node){  
    $('#menusTree').treeview('uncheckNode',node.nodeId,{silent:true});  
    var siblings = $('#menusTree').treeview('getSiblings', node.nodeId);  
    var parentNode = $('#menusTree').treeview('getParent',node.nodeId);  
    if(!("nodeId" in parentNode)) {  
        return;  
    }  
    var isAllUnchecked = true;  //是否全部没选中  
    for(var i in siblings){  
        if(siblings[i].state.checked){  
            isAllUnchecked=false;  
            break;  
        }  
    }  
    if(isAllUnchecked){  
        uncheckAllParent(parentNode);  
    }  
  
}  
  
//级联选中所有子节点  
function checkAllSon(node){  
    $('#menusTree').treeview('checkNode',node.nodeId,{silent:true});  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            checkAllSon(node.nodes[i]);  
        }  
    }  
}  
//级联取消所有子节点  
function uncheckAllSon(node){  
    $('#menusTree').treeview('uncheckNode',node.nodeId,{silent:true});  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            uncheckAllSon(node.nodes[i]);  
        }  
    }  
}  