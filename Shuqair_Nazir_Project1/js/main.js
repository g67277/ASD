// Nazir Shuqair
// ASD 1310
// 11-07-2013

$('#home').on('pageinit', function(){
	//code needed for home page goes here
	$.ajax({
		url: 'xhr/groupANB.json',
		type: 'GET',
		dataType:'json',
		success: function(response){
			
			var obj = response.matches;
			for (i = 0, j = obj.length; i < j; i++) {
                
				//Convert String from localStorage value back to an object by using JSON parse
				
				var mtch = obj[i].match;
				var group = obj[i].group;
				var mDate = obj[i].date;
				var mTime = obj[i].time;
				
				$('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h1 id="betsH2">' + mtch + '</h1>' + '<br>' + '<p id="betsP">' + group + '</p>' + '<p id="dnt">' + mDate + " " + mTime + '</p>' + '</li>').appendTo('.matchDis ul');
			}
		}
	});
	
	
	$.ajax({
		url: 'xhr/groupCND.xml',
		type:'GET',
		dataType: 'xml',
		success: function( xml ){
			var items = $( xml );
			
			for (var i = 13; i < 25; i++) {
				items.find("match" + i).each(function(){
					var item = $(this);
					var mtch = (item.find("match").text());
					var group = (item.find("group").text());
					var mDate = (item.find("date").text());
					var mTime = (item.find("time").text());
					
					$('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h1 id="betsH2">' + mtch + '</h1>' + '<br>' + '<p id="betsP">' + group + '</p>' + '<p id="dnt">' + mDate + " " + mTime + '</p>' + '</li>').appendTo('.matchDis ul');
				});
	
			}
		}	
	});
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
                
                key = localStorage.key(i);
                var value = localStorage.getItem(key);
                //Convert String from localStorage value back to an object by using JSON parse
                var obj = JSON.parse(value);
				var bdate = obj[0].value;
				var friendName = obj[1].value;
				var team1 = obj[2].value;
				var team2 = obj[3].value;
				var amount = obj[4].value;
				
				$('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h2 id="betsH2">' + team1 + " VS " + team2 + '</h2>' + '<br>' + '<p id="betsP">' + "With " + friendName + " for " + amount + "$" + '</p>' + '<br>' + '<p id="dateP">' + "Date: " + bdate + '</p>' + '<a href="#track" data-key="' + key + '" class="edit">' + "Edit" + '</a>' + " "+'<a href="#" data-key="' + key + '"class="delete">' + "Delete" + '</a>' +'</li>').prependTo('.display ul');
	}
	
$('.edit').on('click', function(){
		var myKey= $(this).data('key');
		var value = localStorage.getItem(myKey);
		var obj = JSON.parse(value);
		$('#key').val(myKey);
		$('#betDate').val(obj[0].value);
		$('#friendName').val(obj[1].value);
		$('#team1').val(obj[2].value);
		$('#team2').val(obj[3].value);
		$('#amount').val(obj[4].value);
	});	

	$('.delete').on('click', function(){
			var myKey= $(this).data('key');
			console.log(myKey);
			localStorage.removeItem(myKey);
			window.location.reload(true);
	});	
});




$('.resetBtn').on('click', function(){
	window.location.reload(true);
});