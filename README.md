# GDWWS1819HaeringHammerGuenthner
### Grundlagen des Web Projekt

## Hinweis : Im Root-Ordner müssen folgende Unterordner+Dateien sein : 
1. Ordner : "routes"  +  Datei : "routes.json" -> '/routes/routes.json'
2. Ordner : "pois" + Datei : "pois.json" -> '/pois/pois.json'


## REST-TABLE

| URL      |     Verb     |Beschreibung                               | Rückgabetyp |Parameter|
|----------|--------------|-------------------------------------------|-------------|---------|
|/route    | GET          | gibt Start- und Zielpunkte aller Routen   | JSON        |  X  |
|/route/id | GET          | gibt Route und dazugehörige Infos zurück  | JSON        |  ID  |   
| /route/id|  POST        | erstellt eine Route und speichert diese   | JSON        |Startpunkt(start),Zielpunkt(ziel),ID |  
| /route/id|    PUT       | aktualisiert eine ggf. vorhandene Route   | JSON        |Startpunkt(start),Zielpunkt(ziel) |
| /route/id|    DELETE    | Löscht die Route mit  der passenden ID    | JSON        |ID |


| URL      |     Verb     |Beschreibung                               | Rückgabetyp |Parameter|
|----------|--------------|-------------------------------------------|-------------|---------|
|/poi | GET            | gibt alle POI+s zurück  | JSON        |  X  |   
|/poi/id | GET          | gibt POI zurück  | JSON        |  ID  |   
| /poi/id|  POST        | erstellt einen POI und speichert diesen   | JSON        |Latitude(lat),Longitude(lon),Kategorie(kat),ID |  
| /poi/id|    PUT       | aktualisiert einen POI falls vorhanden| JSON        | Latitude(lat),Longitude(lon),Kategorie(kat), ID |
| /poi/id|    DELETE    | Löscht den POI mit  der passenden ID    | JSON        |ID |






