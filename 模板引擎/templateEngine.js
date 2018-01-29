var TemplateEngine = function(tpl,data){
	var re = /<%([^%>]+)?%>/g;
	var reExp = /(if|for|else|switch|case|break|{|})(.*)?/g
	var code = 'var r=[];\n'
	var cursor = 0;
	var add = function(line,js){
		 console.log(line)
		if(js){
			if(line.match(reExp)){
				console.log(line.match(reExp))
				code += line+ '\n'
			}else{
				code += 'r.push(' + line + ');\n'
			}	
		}else{
			code += 'r.push("' + line.replace(/"/g,'\\"') + '");\n'
		}
		
	}
	//将传入的字符串以<%...%>分割，分别push进数组，其中<%...%>被替换成了match[1]
	while(match = re.exec(tpl)){
		// console.log(match)
		add(tpl.slice(cursor,match.index))
		add(match[1],true)
		cursor = match.index + match[0].length
	}
	//match=null时不执行while循环体，因而最后一个<%...%>后面的字符串没push进数组。
	add(tpl.substr(cursor,tpl.length-cursor));
	code += 'return r.join("");'
	console.log(code)
	return new Function(code.replace(/[\r\t\n]/g,'')).apply(data);

}

var template = 
'My skills:' + 
'<%if(this.showSkills) {%>' +
    '<%for(var index in this.skills) {%>' + 
    '<a href="#"><%this.skills[index]%></a>' +
    '<%}%>' +
'<%} else {%>' +
    '<p>none</p>' +
'<%}%>';
console.log(TemplateEngine(template, {
    skills: ["js", "html", "css"],
    showSkills: false
}));