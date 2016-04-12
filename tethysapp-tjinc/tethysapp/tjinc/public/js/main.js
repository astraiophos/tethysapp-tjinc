require(["dojo/dom",
              "dojo/_base/array",
              "esri/Color",

              "esri/map",
              "esri/graphic",
              "esri/graphicsUtils",
              "esri/layers/FeatureLayer",
              "esri/SnappingManager",
              "esri/tasks/Geoprocessor",
              "esri/tasks/FeatureSet",
              "esri/tasks/LinearUnit",
              "esri/symbols/SimpleMarkerSymbol",
              "esri/symbols/SimpleLineSymbol",
              "esri/symbols/SimpleFillSymbol"
              ],
    function(dom, array, Color, Map, Graphic, graphicsUtils, FeatureLayer,SnappingManager, Geoprocessor, FeatureSet, LinearUnit, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol){
      var map = new Map("hydromap", {
        center: [-111, 40.5],
        zoom: 8,
        basemap: "topo"
      });
      //var baseMapLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://geoserver.byu.edu:6080/arcgis/rest/services/TJ_Dam_Power/Base/MapServer");
      var baseMapLayer = new FeatureLayer("http://geoserver.byu.edu:6080/arcgis/rest/services/TJ_Dam_Power/Base/MapServer/0");
      map.addLayer(baseMapLayer);


      var layerInfos = [{
        layer: baseMapLayer
        }];

      //add snapping functionality to the map
      map.enableSnapping({alwaysSnap: true, tolerance: 200}).setLayerInfos(layerInfos);

      gp = new Geoprocessor("http://geoserver.byu.edu/arcgis/rest/services/TJ_Dam_Power/Watershed_Infiinite2/GPServer/watershed_model2");
      gp.setOutputSpatialReference({wkid: 102100});
      map.on("click", delineate);


     function delineate(evt) {
            map.graphics.clear();
            var graphic = new esri.Graphic(
            evt.mapPoint,
        new esri.symbol.SimpleMarkerSymbol());
            map.graphics.add(graphic)
            ;

        var features = [];
            features.push(graphic);
            var featureSet = new FeatureSet();
            featureSet.features = features;
            var params = { "DamPoint": featureSet};
            gp.execute(params, drawShed);
            map.setMapCursor("progress")
       }
      function drawShed(results, messages) {
            var polySymbol = new SimpleFillSymbol();
            polySymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 0.5]), 1));
            polySymbol.setColor(new Color([255, 127, 0, 0.7]));
            var features = results[0].value.features;
            for (var f = 0, fl = features.length; f < fl; f++) {
              var feature = features[f];
              feature.setSymbol(polySymbol);
              map.graphics.add(feature);
            }
            map.setExtent(graphicsUtils.graphicsExtent(map.graphics.graphics), true);
            map.setMapCursor("default")
          }




    }

);



//require(["dojo/dom",
//              "dojo/_base/array",
//              "esri/Color",
//
//              "esri/map",
//              "esri/graphic",
//              "esri/graphicsUtils",
//              "esri/tasks/Geoprocessor",
//              "esri/tasks/FeatureSet",
//              "esri/tasks/LinearUnit",
//              "esri/symbols/SimpleMarkerSymbol",
//              "esri/symbols/SimpleLineSymbol",
//              "esri/symbols/SimpleFillSymbol"
//              ],
//        function(dom, array, Color, Map, Graphic, graphicsUtils, Geoprocessor, FeatureSet, LinearUnit, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol){
//
//          var map, gp;
//
//          /*Initialize map, GP*/
//
//            //map = new Map("mapDiv", {
//            //  basemap: "streets",
//            //  center: [-122.436, 37.73],
//            //  zoom: 12
//            //});
//
//            var map = new Map("mapDiv", {
//              center: [-111, 40.5],
//              zoom: 8,
//              basemap: "topo"
//            });
//            var baseMapLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://geoserver.byu.edu:6080/arcgis/rest/services/TJ_Dam_Power/Base/MapServer");
//            map.addLayer(baseMapLayer);
//
//            //gp = new Geoprocessor("https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed");
//            //gp = new Geoprocessor("http://geoserver.byu.edu/arcgis/rest/services/HikingExplorerJS/BufferPointsJas/GPServer/Buffer%20Points");
//            gp = new Geoprocessor("http://geoserver.byu.edu/arcgis/rest/services/TJ_Dam_Power/Watershed_Infiinite2/GPServer/watershed_model2");
//
//            gp.setOutputSpatialReference({
//              wkid: 102100
//            });
//            map.on("click", computeViewShed);
//
//          function computeViewShed(evt) {
//            map.graphics.clear();
//            var pointSymbol = new SimpleMarkerSymbol();
//            pointSymbol.setSize(14);
//            pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1));
//            pointSymbol.setColor(new Color([0, 255, 0, 0.25]));
//
//            var graphic = new Graphic(evt.mapPoint, pointSymbol);
//            map.graphics.add(graphic);
//
//            var features = [];
//            features.push(graphic);
//            var featureSet = new FeatureSet();
//            featureSet.features = features;
//            var vsDistance = new LinearUnit();
//            vsDistance.distance = 5;
//            vsDistance.units = "esriMiles";
//            var params = {
//              "DamPoint": featureSet
//
//              //"Input_Observation_Point": featureSet,
//              //"Viewshed_Distance": vsDistance
//            };
//            gp.execute(params, drawViewshed);
//          }
//
//          function drawViewshed(results, messages) {
//            var polySymbol = new SimpleFillSymbol();
//            polySymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 0.5]), 1));
//            polySymbol.setColor(new Color([255, 127, 0, 0.7]));
//            var features = results[0].value.features;
//            for (var f = 0, fl = features.length; f < fl; f++) {
//              var feature = features[f];
//              feature.setSymbol(polySymbol);
//              map.graphics.add(feature);
//            }
//            map.setExtent(graphicsUtils.graphicsExtent(map.graphics.graphics), true);
//          }
//    });