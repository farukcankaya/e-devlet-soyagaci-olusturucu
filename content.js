rows = $('table.resultTable tbody').children('tr');
index=0;
var all_data=[]
rows.each(function () { index++;
	columns = $(this).children('td');
	if(columns.length == 12){
		row = []
		columns.each(function () {
			row.push($(this).html());
		});
		all_data.push(row);
	}
});

if(all_data.length > 0){
	$('.contentToolbar').append('<li><a class="soysopuduzgungoster">🌲 Soyağacını Şemada Göster</a></li>');
}

$('.soysopuduzgungoster').on('click', function(){
	chrome.runtime.sendMessage({open: "tree", all_data: all_data}, function(response) {
	  console.log(response.status);
	});
});