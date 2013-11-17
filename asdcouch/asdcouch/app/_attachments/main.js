// Nazir Shuqair
// ASD 1310
// 11-07-2013
$('#main').on('pageinit', function () {
    $('a').css('textDecoration', 'none');
});
$('#home').on('pageinit', function () {
    $('a').css('textDecoration', 'none');

    /************************************************Group A Ajax Call*********************************************/

    $('#groupA').click(function () {
        $.ajax({
            url: '_view/group_a',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
        		$('.matchDis ul').empty();
                $.each(response.rows, function (index, groupA) {
                    var mtch = groupA.value.match;
                    var group = groupA.value.group;
                    var mDate = groupA.value.date;
                    var mTime = groupA.value.time;

                    $('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h1 id="betsH2">' + mtch + '</h1>' + '<br>' + '<p id="betsP">' + group + '</p>' + '<p id="dnt">' + mDate + " " + mTime + '</p>' + '</li>').appendTo('.matchDis ul');
                })
            },
            error: function (error, parseerror) {
                console.log(error, parseerror);
            }
        });
    });

    /************************************************Group B Ajax Call*********************************************/

    $('#groupB').click(function () {
        $.ajax({
            url: '_view/group_b',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
        		$('.matchDis ul').empty();
                $.each(response.rows, function (index, groupA) {
                    var mtch = groupA.value.match;
                    var group = groupA.value.group;
                    var mDate = groupA.value.date;
                    var mTime = groupA.value.time;

                    $('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h1 id="betsH2">' + mtch + '</h1>' + '<br>' + '<p id="betsP">' + group + '</p>' + '<p id="dnt">' + mDate + " " + mTime + '</p>' + '</li>').appendTo('.matchDis ul');
                })
            },
            error: function (error, parseerror) {
                console.log(error, parseerror);
            }
        });
    });
});

$('#track').on('pageinit', function () {

    /************************************************Validation and Storing form data*********************************************/

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

    /************************************************Storing Data to local Storage*********************************************/

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

    /************************************************Display Data*********************************************/

    if (localStorage.length === 0) {
        alert("No Bets yet *****Default Loaded*****");
        autoFill();
    } else {
        console.log(localStorage);
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

            $('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h2 id="betsH2">' + team1 + " VS " + team2 + '</h2>' + '<br>' + '<p id="betsP">' + "With " + friendName + " for " + amount + "$" + '</p>' + '<br>' + '<p id="dateP">' + "Date: " + bdate + '</p>' + '<a href="#track" data-key="' + key + '" class="edit">' + "Edit" + '</a>' + " " + '<a href="#" data-key="' + key + '"class="delete">' + "Delete" + '</a>' + '</li>').prependTo('.display ul');
        }
    }

    /************************************************Default data to local Storage*********************************************/

    function autoFill() {

        $.ajax({
            url: '_view/bets',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                $.each(data.rows, function (index, defaultBets) {
                    var betDate = defaultBets.value.betDate;
                    var friendName = defaultBets.value.friendName;
                    var team1 = defaultBets.value.team1;
                    var team2 = defaultBets.value.team2;
                    var amount = defaultBets.value.amount;

                    var obj = ("[{\"name\":\"betDate\",\"value\":\"" + betDate + "\"},{\"name\":\"friendName\",\"value\":\"" + friendName + "\"},{\"name\":\"team1\",\"value\":\"" + team1 + "\"},{\"name\":\"team2\",\"value\":\"" + team2 + "\"},{\"name\":\"amount\",\"value\":\"" + amount + "\"}]");

                    var id = Math.floor(Math.random() * 100001);
                    localStorage.setItem(id, obj);
                })
                window.location.reload(true);
            },
            error: function (error, parseerror) {
                console.log(error, parseerror);
            }
        });
    }

    /************************************************Edit Function*********************************************/

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

    /************************************************Delete Function***************************************/

    $('.delete').on('click', function () {
        var myKey = $(this).data('key');
        var r = confirm("Are you sure?");
        console.log(r);
        if (r == true) {
            localStorage.removeItem(myKey);
            window.location.reload(true);
        } else {}
    });
	
	/************************************************Delete All Function***************************************/
	
	$('#clearAll').on('click', function () {
		
		if (localStorage.length === 0) {
            alert("Nothing to clear!")
        } else {
			var r = confirm("Are you sure you want to delete everything?");
			if(r == true){
				localStorage.clear();
				window.location.reload();
				return false;
			}else{	
			}  
        }	
	})
});


/***********************************************Reload page after reset***************************************/

$('.resetBtn').on('click', function () {
    window.location.reload(true);
});