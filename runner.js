var url = new URL(window.location.href);
var all_data = JSON.parse(url.searchParams.get("all_data"));

function find_by(relation){
	return all_data.filter(function(element) {
	  return element[2] === relation;
	});
}

function find_parent(current){
	if(current[2] === 'Kendisi'){
		return '';
	}else if(current[2] === 'Babası' || current[2] === 'Annesi'){
		return find_by('Kendisi')[0][0];
	}else{
		l = current[2].length;
		sub = current[2].substring(0,l-16);
		if(sub.length == 16){
			sub = '';
		}
		relation = current[2].slice(-16);
		var x;
		if(relation==="Babasının Annesi"){
			x = sub+'Babası';
		}else if(relation==="Annesinin Babası"){
			x = sub+'Annesi';
		}else if(relation==="Babasının Babası"){
			x =  sub+'Babası';
		}else if(relation==="Annesinin Annesi"){
			x = sub+'Annesi';
		}
		return find_by(x)[0][0];
	}
}

var structuted_data = [];
all_data.forEach(function(element) {
	structuted_data.push([{v:element[0]+'', f:'<strong>'+element[3]+' '+element[4]+'</strong>('+element[10]+')'+'<div style="color:red; font-style:italic">'+element[7]+'</div>'+element[11]}, find_parent(element)+'', '']);
});

google.charts.load('current', {packages:["orgchart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Parent');
    data.addColumn('string', 'ToolTip');

    data.addRows(structuted_data);

    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, {allowHtml:true});
}