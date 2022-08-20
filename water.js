$( document ).ready(function() {
	
	let dropdown = $('#sel1');
	const url = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/waters.json';

	// Populate dropdown with list of waters
	$.getJSON(url, function (data) {
		// dropdown.empty();
		$.each(data, function (key, entry) {
		// console.log( "key Data: " + key + "entry Data: " + entry.shortname  )
		$('#sel1').append("<option value=" + entry.shortname + ">" + entry.longname + "</option>"); 
	  })
	});


// Enaable geographic search when a water different than 'All waters' is selected
$("#sel1").change(function(event){
	var optionSelected = $('#sel1').find("option:selected");
    var optionSelected_value  = optionSelected.val();
	// Disable geographic search when 'All waters' is selected
	if (optionSelected_value == '666') {
		$('.inputDisabled').prop('disabled', true);
		$('#inlineRadio1').prop('checked', true);
        }
});


$("#inlineRadio2").click(function(event){
	 $('.inputDisabled').prop('disabled', false);
	var optionSelected_radio2 = $('#sel1').find("option:selected");
    var optionSelected_radio2_value  = optionSelected_radio2.val();
	if (optionSelected_radio2_value == '666') {
		$('.inputDisabled').prop('disabled', true);
		$('#inlineRadio1').prop('checked', true);
        }
});

$("#inlineRadio1").click(function(event){
	$('.inputDisabled').prop('disabled', true);
	<!-- var optionSelected_radio = $('#sel1').find("option:selected"); -->
    <!-- var optionSelected_radio_value  = optionSelected_radio.val(); -->
	<!-- console.log(optionSelected_radio_value); -->
	<!-- $("#sel1").val('666'); -->
});

});
