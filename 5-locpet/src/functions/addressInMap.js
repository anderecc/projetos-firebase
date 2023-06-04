/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
export default function addressInMap(dispatch, mapGetLocation) {
    function addDraggableMarker(map, behavior) {
        var marker = new H.map.Marker(
            {
                lat: -29.15926,
                lng: -51.51178,
            },
            {
                // mark the object as volatile for the smooth dragging
                volatility: true,
            }
        );
        // Ensure that the marker can receive drag events
        marker.draggable = true;
        map.addObject(marker);

        // disable the default draggability of the underlying map
        // and calculate the offset between mouse and target's position
        // when starting to drag a marker object:
        map.addEventListener(
            'dragstart',
            function (ev) {
                var target = ev.target,
                    pointer = ev.currentPointer;
                if (target instanceof H.map.Marker) {
                    var targetPosition = map.geoToScreen(target.getGeometry());
                    target['offset'] = new H.math.Point(
                        pointer.viewportX - targetPosition.x,
                        pointer.viewportY - targetPosition.y
                    );
                    behavior.disable();
                }
            },
            false
        );

        // re-enable the default draggability of the underlying map
        // when dragging has completed
        map.addEventListener(
            'dragend',
            function (ev) {
                var target = ev.target;
                if (target instanceof H.map.Marker) {
                    behavior.enable();
                    dispatch(mapGetLocation(target.a));
                }
            },
            false
        );

        // Listen to the drag event and move the position of the marker
        // as necessary
        map.addEventListener(
            'drag',
            function (ev) {
                var target = ev.target,
                    pointer = ev.currentPointer;
                if (target instanceof H.map.Marker) {
                    target.setGeometry(
                        map.screenToGeo(
                            pointer.viewportX - target['offset'].x,
                            pointer.viewportY - target['offset'].y
                        )
                    );
                }
            },
            false
        );
    }

    /**
     * Boilerplate map initialization code starts below:
     */

    //Step 1: initialize communication with the platform
    // In your own code, replace variable window.apikey with your own apikey
    var platform = new H.service.Platform({
        apikey: 'swiJgxQsLpVaqt5_UCysC6oXp2djJ86yMYJTsq0p540',
    });
    var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map - this map is centered over Boston
    var map = new H.Map(
        document.getElementById('addressInMap'),
        defaultLayers.raster.satellite.map,
        {
            center: {
                lat: -29.15926,
                lng: -51.51178,
            },
            zoom: 15,
            pixelRatio: window.devicePixelRatio || 1,
        }
    );
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Step 4: Create the default UI:
    var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

    // Add the click event listener.
    addDraggableMarker(map, behavior);
}
