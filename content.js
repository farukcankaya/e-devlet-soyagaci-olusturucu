$('.contentToolbar').append('<li><a class="soysopuduzgungoster">🌲 Soyağacını Şemada Göster</a></li>');

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

$('.soysopuduzgungoster').on('click', function(){
	chrome.runtime.sendMessage({greeting: "hello", all_data: all_data}, function(response) {
	  console.log(response.farewell);
	});
});