var url = new URL(window.location.href);
var all_data = JSON.parse(url.searchParams.get("all_data"));
var ana = url.searchParams.get("ana");
var baba = url.searchParams.get("baba");
var memleket = url.searchParams.get("memleket");
var dogum = url.searchParams.get("dogum"); if(dogum==null) dogum='true';
var cilt = url.searchParams.get("cilt");
var medenihal = url.searchParams.get("medenihal");
var vaziyet = url.searchParams.get("vaziyet"); if(vaziyet==null) vaziyet='true';

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

function get_data(element){
	var data = '<strong>'+element[3]+' '+element[4]+'</strong>';
	if(medenihal == 'true'){
		data = data.concat('('+element[10]+')');
	}
	if(ana == 'true'){
		data = data.concat('<div><strong>Anne:</strong>'+element[6]+'</div>');
	}
	if(baba == 'true'){
		data = data.concat('<div><strong>Baba:</strong>'+element[5]+'</div>');
	}
	if(dogum == 'true'){
		data = data.concat('<div style="color:red;">'+element[7]+'</div>');
	}
	if(memleket == 'true'){
		data = data.concat('<div style="color:red;">'+element[8]+'</div>');
	}
	if(cilt == 'true'){
		data = data.concat('<div style="color:red;">'+element[9]+'</div>');
	}
	if(vaziyet == 'true'){
		data = data.concat(element[11]+'');
	}
	return data;
}

var structuted_data = [];
all_data.forEach(function(element) {
	structuted_data.push([{v:element[0]+'', f:get_data(element)}, find_parent(element)+'', '']);
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
    chart.draw(data, {allowHtml:true, allowCollapse: true});
}

$(function () {
	$("input[name='ana']").prop('checked', ana=='true');
	$("input[name='baba']").prop('checked', baba=='true');
	$("input[name='memleket']").prop('checked', memleket=='true');
	$("input[name='dogum']").prop('checked', dogum=='true');
	$("input[name='cilt']").prop('checked', cilt=='true');
	$("input[name='medenihal']").prop('checked', medenihal=='true');
	$("input[name='vaziyet']").prop('checked', vaziyet=='true');

	$(".goster").on('click', function(){
		$("div.management").show();
		$(".goster").hide();
	});
	$(".gizle").on('click', function(){
		$("div.management").hide();
		$(".goster").show();
	});

	$("div.management > input").on('click', function(){
		var ana = $("input[name='ana']").is(":checked");
		var baba = $("input[name='baba']").is(":checked");
		var memleket = $("input[name='memleket']").is(":checked");
		var dogum = $("input[name='dogum']").is(":checked");
		var cilt = $("input[name='cilt']").is(":checked");
		var medenihal = $("input[name='medenihal']").is(":checked");
		var vaziyet = $("input[name='vaziyet']").is(":checked");
		url = url.origin+'/tree.html?ana='+ana+'&baba='+baba+'&memleket='+memleket+'&dogum='+dogum+'&cilt='+cilt+'&medenihal='+medenihal+'&vaziyet='+vaziyet+'&all_data='+url.searchParams.get("all_data")
		window.location.replace(url);
	});
});