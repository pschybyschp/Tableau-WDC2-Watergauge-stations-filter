(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema, Structure definition includes columns, alias and data type
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
        id: "Nr", //not included in datasource, placeholder for artificial running number 
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "uuid",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "number",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "shortname",
        alias: "shortname wassergepelstaton",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "longname",
        alias: "longname wassergepelstaton",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "km",
        alias: "km",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "agency",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "longitude",
        alias: "longitude wassergepelstaton",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "latitude",
        alias: "longitude wassergepelstaton",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "watershort",
        alias: "water shortname",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "waterlong",
        alias: "water longname",
        dataType: tableau.dataTypeEnum.string
    }];

        var tableSchema = {
            id: "watergaugeFeed", //needs to be one word
            alias: "Wasserpegel Germany updated every 5 Minutes",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the masterdata data (Watergauge in Germany)
    myConnector.getData = function(table, doneCallback) {
        var waterObj = JSON.parse(tableau.connectionData),
            dateString = "waters=" + waterObj.water + "&km=" + waterObj.distance + "&radius=" + waterObj.radius,
            apiCall = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json?" + dateString;
		
		
		console.log(apiCall);
		
		if (waterObj.water == '666'){
				apiCall = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json'
				};
		
		console.log(apiCall);

		
		$.getJSON(apiCall, function(result) {
			var anzahl = result.length,

                tableData = [];

            // Iterate over the JSON object
        for (var i = 0, len = anzahl; i < len; i++) {
                tableData.push({
					"Nr": i, //running number given by js
                    "uuid": result[i].uuid,
					"number": result[i].number,
					"shortname": result[i].shortname,
					"longname": result[i].longname,
					"km": result[i].km,
					"agency": result[i].agency,
					"longitude": result[i].longitude,
					"latitude": result[i].latitude,
					"watershort": result[i].water.shortname,
					"waterlong": result[i].water.longname


                });

            }
			table.appendRows(tableData);

            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
			
			// When nothing selected-> {water: '666', distance: '50', radius: '10'}
    var sel1_value  = $('#sel1').val() ;
	var radio2_on_boolean = $("#inlineRadio2").is(":checked");
	// Disable geographic search when 'All waters' is selected
			console.log(radio2_on_boolean);

			
			if (sel1_value == '666'){
				var waterObj = {
					water: $('#sel1').val().trim(),
					distance: '0',
					radius: '0'
				};
			} else if (radio2_on_boolean==true) {
				var waterObj = {
					water: $('#sel1').val().trim(),
					distance: $('#customRange1').val().trim(),
					radius: $('#customRange2').val().trim()
				};
            } else if (radio2_on_boolean==false) {
				var waterObj = {
					water: $('#sel1').val().trim(),
					distance: '0',
					radius: '0'
            };	;	
			}
				
			console.log(waterObj);
            
			tableau.connectionData = JSON.stringify(waterObj); // Use this variable to pass data to your getSchema and getData functions
			
            tableau.connectionName = "Wassergauge Germany"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
