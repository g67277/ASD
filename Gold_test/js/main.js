// JavaScript Document
// Nazir Shuqair
//	MiU 1310
//	24 OCT 2013
//	Project 4

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){

	var myForm = $('#vtc');
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

$('#schedule').on('pageinit', function(){
	
	for (i = 0, j = localStorage.length; i < j; i++) {
				
				console.log(localStorage.length);
                
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                //Convert String from localStorage value back to an object by using JSON parse
                var obj = JSON.parse(value);
				console.log(obj);
				var bdate = obj[0].value;
				var fname = obj[1].value;
				var pocNum = obj[2].value;
				
				$('.display ul').prepend("Bet Date: " + bdate + '<br>');
	}
	

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){
	
	

};


var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


