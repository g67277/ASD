// Nazir Shuqair
// ASD 1310
// 11-07-2013
$('#main').on('pageinit', function () {
	$('a').css('textDecoration','none');
});
$('#home').on('pageinit', function () {
	$('a').css('textDecoration','none');
    //code needed for home page goes here
    $('#jsonB').click(function () {
        $.ajax({
            url: 'xhr/groupANB.json',
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                var obj = response.matches;
                for (i = 0, j = obj.length; i < j; i++) {

                    //Convert String from localStorage value back to an object by using JSON parse

                    var mtch = obj[i].match;
                    var group = obj[i].group;
                    var mDate = obj[i].date;
                    var mTime = obj[i].time;

                    $('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h1 id="betsH2">' + mtch + '</h1>' + '<br>' + '<p id="betsP">' + group + '</p>' + '<p id="dnt">' + mDate + " " + mTime + '</p>' + '</li>').appendTo('.matchDis ul');
                }
            },
            error: function (error, parseerror) {
                console.log(error, parseerror);
            }
        });
    });

    $('#xmlB').click(function () {
        $.ajax({
            url: 'xhr/groupCND.xml',
            type: 'GET',
            dataType: 'xml',
            success: function (xml) {
                var items = $(xml);

                for (var i = 13; i < 25; i++) {
                    items.find("match" + i).each(function () {
                        var item = $(this);
                        var mtch = (item.find("match").text());
                        var group = (item.find("group").text());
                        var mDate = (item.find("date").text());
                        var mTime = (item.find("time").text());

                        $('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h1 id="betsH2">' + mtch + '</h1>' + '<br>' + '<p id="betsP">' + group + '</p>' + '<p id="dnt">' + mDate + " " + mTime + '</p>' + '</li>').appendTo('.matchDis ul');
                    });

                }
            },
            error: function (error, parseerror) {
                console.log(error, parseerror);
            }
        });
    });
});

$('#track').on('pageinit', function () {

    var myForm = $('#betsForm');
    myForm.validate({
        invalidHandler: function (form, validator) {},
        submitHandler: function () {
            var data = myForm.serializeArray();
            storeData(data);
            //reloads page to clear fields
            window.location.reload(true);
        }
    });

    //any other code needed for addItem page goes here
    var storeData = function (data) {

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

$('#bets').on('pageinit', function () {

		
		if(localStorage.length === 0){
			alert("No Bets yet *****Default Loaded*****");
			autoFill();
		}else{
			console.log(localStorage);
			for (i = 0, j = localStorage.length; i < j; i++) {
			
				key = localStorage.key(i);
				console.log(key);
				var value = localStorage.getItem(key);
				//Convert String from localStorage value back to an object by using JSON parse
				var obj = JSON.parse(value);
				var bdate = obj[0].value;
				var friendName = obj[1].value;
				var team1 = obj[2].value;
				var team2 = obj[3].value;
				var amount = obj[4].value;
		
				$('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h2 id="betsH2">' + team1 + " VS " + team2 + '</h2>' + '<br>' + '<p id="betsP">' + "With " + friendName + " for " + amount + "$" + '</p>' + '<br>' + '<p id="dateP">' + "Date: " + bdate + '</p>' + '<a href="#track" data-key="' + key + '" class="edit">' + "Edit" + '</a>' + " " + '<a href="#" data-key="' + key + '"class="delete">' + "Delete" + '</a>' + '</li>').prependTo('.display ul');
			}
		}
	
	function autoFill(){
		$.ajax({
            url: 'xhr/defaultlocal.json',
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                var obj = response.bets;
				for (var n in obj) {
            		var id = Math.floor(Math.random() * 100001);
            		localStorage.setItem(id, JSON.stringify(obj[n]));
        		}
				window.location.reload(true);  
            },
            error: function (error, parseerror) {
                console.log(error, parseerror);
            }
        });	
	}

    $('.edit').on('click', function () {
        var myKey = $(this).data('key');
        var value = localStorage.getItem(myKey);
        var obj = JSON.parse(value);
		console.log(obj);
        $('#key').val(myKey);
        $('#betDate').val(obj[0].value);
        $('#friendName').val(obj[1].value);
        $('#team1').val(obj[2].value);
        $('#team2').val(obj[3].value);
        $('#amount').val(obj[4].value);
    });

    $('.delete').on('click', function () {
        var myKey = $(this).data('key');
		var r=confirm("Are you sure?");
		console.log(r);
		if (r==true){
			localStorage.removeItem(myKey);
			window.location.reload(true);
		}else{
		}
    });
});




$('.resetBtn').on('click', function () {
    window.location.reload(true);
});

$('#test').on('pageinit', function(){
	$.ajax({
            url: 'http://127.0.0.1:5984/bet_tracker/_design/app/_view/matches',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
				
				$.each(data.rows, function(index, defautlMtch){
					var team1 = defautlMtch.value.team1;
					console.log(team1);
				})
				
				

            }
        });	

})