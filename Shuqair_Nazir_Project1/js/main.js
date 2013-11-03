// Nazir Shuqair
// ASD 1310
// 10-29-2013

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#track').on('pageinit', function(){

	var myForm = $('#betsForm');
	myForm.validate({
	invalidHandler: function(form, validator) {
	},
	submitHandler: function() {
		var data = myForm.serializeArray();
		storeData(data);
		//reloads page to clear fields
			window.location.reload(true);
		}
	});
	
	//any other code needed for addItem page goes here
	var storeData = function(data){
	
    if ($('#key').val() == '') {
            var key = Math.floor(Math.random() * 100001);
        } else {
            var key = $('#key').val();
        }
		
	localStorage.setItem(key, JSON.stringify(data));
	console.log(data);
	alert("Meeting Saved!");
	
}; 


});

$('#bets').on('pageinit', function(){
	
	for (i = 0, j = localStorage.length; i < j; i++) {
				
				console.log(localStorage.length);
                
                key = localStorage.key(i);
                var value = localStorage.getItem(key);
                //Convert String from localStorage value back to an object by using JSON parse
                var obj = JSON.parse(value);
				console.log(obj);
				var bdate = obj[0].value;
				var friendName = obj[1].value;
				var team1 = obj[2].value;
				var team2 = obj[3].value;
				var amount = obj[4].value;
				
				$('.display ul').append('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h2 id="betsH2">' + team1 + " VS " + team2 + '</h2>' + '<br>' + '<p id="betsP">' + "With " + friendName + " for " + amount + "$" + '</p>' + '<br>' + '<p id="dateP">' + "Date: " + bdate + '</p>' + '<a href="#track" data-key="' + key + '" class="edit">' + "Edit" + '</a>' + '<a href="#" data-key="' + key + '" class="delete" style="text-align:left">' + "Delete" + '</a>' +'</li>');
	}
	
$('.edit').on('click', function(){
		var myKey= $(this).data('key');
		var value = localStorage.getItem(myKey);
		var obj = JSON.parse(value);
		$('#betDate').val(obj[0].value);
		$('#friendName').val(obj[1].value);
		$('#team1').val(obj[2].value);
		$('#team2').val(obj[3].value);
		$('#amount').val(obj[4].value);
	});	

	$('.delete').on('click', function(){
			var myKey= $(this).data('key');
			localStorage.removeItem(myKey);
			window.location.reload(true);
	});	
});


$('.resetBtn').on('click', function(){
	window.location.reload(true);
});