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
                    console.log(response);
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

        var sObj = {}

        if ($('#key').val() == '') {

        } else {
            sObj._id = $('#key').val();
            sObj._rev = $('#rev').val();
        }


        sObj.bdate = data[0].value;
        sObj.friendName = data[1].value;
        sObj.team1 = data[2].value;
        sObj.team2 = data[3].value;
        sObj.amount = data[4].value;

        console.log(sObj);

        /*localStorage.setItem(key, JSON.stringify(data));*/
        $.couch.db('bet_tracker').saveDoc(sObj, {
            success: function () {
                console.log("Saved successfuly")
            },
            error: function () {
                console.log("error!")
            }
        });
        alert("saved successfully");

    };


});

$(document).on('pageinit', '#bets', function () {

    /************************************************Display Data*********************************************/
    $.couch.db('bet_tracker').view("bet_tracker/bets", {
        success: function (data) {
            //console.log(data);
            $.each(data.rows, function (index, result) {
                var item = result.value;
                var bdate = item.betDate;
                var friendName = item.friendName;
                var team1 = item.team1;
                var team2 = item.team2;
                var amount = item.amount;
                var key = item.id;
                var rev = item.rev;

                $('<li class="ui-li ui-li-static ui-btn-up-a">' + '<h2 id="betsH2">' + team1 + " VS " + team2 + '</h2>' + '<br>' + '<p id="betsP">' + "With " + friendName + " for " + amount + "$" + '</p>' + '<br>' + '<p id="dateP">' + "Date: " + bdate + '</p>' + '<a href="#track" data-key="' + key + '"data-rev="' + rev + '" class="edit">' + "Edit" + '</a>' + " " + '<a href="#" data-key="' + key + '" data-rev="' + rev + '"class="delete">' + "Delete" + '</a>' + '</li>').prependTo('.display ul');


            });


            /* if (localStorage.length === 0) {
        alert("No Bets yet *****Default Loaded*****");
        autoFill();
    } else {
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
    }*/

            /************************************************Default data to local Storage*********************************************/

            /* function autoFill() {

        $.ajax({
            url: '_view/default',
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
    }*/

            /************************************************Edit Function*********************************************/

            $('.edit').on('click', function () {
                var id = $(this).data('key');
				var rev = $(this).data('rev');
				alert(rev);
				$.couch.db("bet_tracker").openDoc(id, {
					success: function(item) {
						var bdate = item.bdate;
						var friendName = item.friendName;
						var team1 = item.team1;
						var team2 = item.team2;
						var amount = item.amount;
						console.log(item);
						$('#key').val(id);
						$('#rev').val(rev);
						$('#betDate').val(bdate);
						$('#friendName').val(friendName);
						$('#team1').val(team1);
						$('#team2').val(team2);
						$('#amount').val(amount);
					},
					error: function(status) {
						console.log(status);
					}
				});
				alert("please come up!!!!");

                /* var value = localStorage.getItem(myKey);
        var obj = JSON.parse(value);
        console.log(obj);
        $('#key').val(myKey);
        $('#betDate').val(obj[0].value);
        $('#friendName').val(obj[1].value);
        $('#team1').val(obj[2].value);
        $('#team2').val(obj[3].value);
        $('#amount').val(obj[4].value);*/
            });

            /************************************************Delete Function***************************************/

            $('.delete').on('click', function () {
                var id = $(this).data('key');
                var rev = $(this).data('rev');

                var obj = {};
                obj._id = id;
                obj._rev = rev;
                var r = confirm("Are you sure?");
                console.log(r);
                if (r == true) {
                    $.couch.db('bet_tracker').removeDoc(obj, {
                        success: function () {
                            console.log("deleted");
							
                        },
                        error: function () {
                            console.log("error!")
                        }
                    });
                    window.location.reload(true);
                } else {}
                /*var r = confirm("Are you sure?");
        console.log(r);
        if (r == true) {
            localStorage.removeItem(myKey);
            window.location.reload(true);
        } else {}*/
            });

            /************************************************Delete All Function***************************************/

            $('#clearAll').on('click', function () {

                if (localStorage.length === 0) {
                    alert("Nothing to clear!")
                } else {
                    var r = confirm("Are you sure you want to delete everything?");
                    if (r == true) {
                        localStorage.clear();
                        window.location.reload();
                        return false;
                    } else {}
                }
            })
        }
    });
});


/***********************************************Reload page after reset***************************************/

$('.resetBtn').on('click', function () {
    window.location.reload(true);
});