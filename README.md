# Tableau-WDC-Watergauge-stations-filter
The Tableau Webdataconnector Watergaugestations-filter is based on the Tableau Webdataconnector Watergaugestations. 
It loads master data of the watergauge stations available in Germany. 
It provides a form to filter the data which should be load.

Major improvments compaaring Tableau Webdataconnector Watergaugestations:
- Provision of a form to filter watergaugestations by waters
- After selection of a speccific water additionaly the form enables to filter watergaugestations by locations based on the distance to the water source and a radius
- The WDC contains also some simple logic to improve the usability of the form 


Depending on the user selection following REST-API resources are used:
User select 'All waters':  https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json

User select a specific water with or without use of location filter:
https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json?waters=RHEIN&km=680&radius=50

The documentation of the data can be accessed using 
https://www.pegelonline.wsv.de/webservice/dokuRestapi

Its JSON data about the watergauge stations installed in the sea and river landscape of Germany with following structure:

uuid	-     Eindeutige unveränderliche ID         - ID

number	-   Pegelnummer                           - Number of watergauge station

shortname	- Pegelname (max. 40 Zeichen)           - Watergauge name, short

longname -  Pegelname (max. 255 Zeichen)          - Watergauge name, short

km	-       Flusskilometer                        - km of river

agency	-   Wasserstraßen- und Schifffahrtsamt    - agency name

longitude - Längengrad in WGS84 Dezimalnotation   - longitude

latitude -	Breitengrad in WGS84 Dezimalnotation  - latitude

water	-     Angaben zum Gewässer                  - name of water/river

