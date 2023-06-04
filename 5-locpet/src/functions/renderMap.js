/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Boilerplate map initialization code starts below:
 */
export default function renderMap(coords) {
    function addMarkersToMap(map) {
        var locationMarker = new H.map.Marker({ ...coords });
        map.addObject(locationMarker);
    }
    //Step 1: initialize communication with the platform
    // In your own code, replace variable window.apikey with your own apikey
    var platform = new H.service.Platform({
        apikey: 'swiJgxQsLpVaqt5_UCysC6oXp2djJ86yMYJTsq0p540',
    });
    var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map - this map is centered over Europe
    var map = new H.Map(
        document.getElementById('mapVisible'),
        defaultLayers.raster.satellite.map,
        {
            center: { ...coords },
            zoom: 17,
            pixelRatio: window.devicePixelRatio || 1,
        }
    );
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    // Now use the map as required...
    addMarkersToMap(map);
}
