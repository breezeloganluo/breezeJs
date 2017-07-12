<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.breeze.support.cfg.Cfg" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%
    File dir = new File(Cfg.getCfg().getRootDir() + "/breeze/framework/test/BreezeFW/");
	ArrayList<String> htmlList = new ArrayList<String>();
	for (File f : dir.listFiles()){
		if (f.isFile() && f.getName().endsWith(".html")){
			htmlList.add(f.getName());
		}
	}
%>
<html>
<body>
<%for (String p:htmlList){%>
    [<a href="./<%=p%>" target="_blank"><%=p%></a>]<br/>
	<iframe src="./<%=p%>" id="<%=p%>" scrolling="no" frameborder="0"  onload="changeSize(this);"></iframe><br/>
<%}%>

<script>
function changeSize(ifm){
	ifm.height=ifm.contentWindow.document.documentElement.clientHeight;
}


</script>
</body>
</html>