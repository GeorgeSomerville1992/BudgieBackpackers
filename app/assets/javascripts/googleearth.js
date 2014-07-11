
$()
var ge;
    google.load("earth", "1", {"other_params":"sensor=true_or_false"});

    function init() {
      google.earth.createInstance('map3d', initCB, failureCB);
    }

    function initCB(instance) {
      ge = instance;
      ge.getWindow().setVisibility(true);
      // add a navigation control
      ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

      // add some layers
      ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
      ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

      
        }

    function failureCB(errorCode) {
    }

    google.setOnLoadCallback(init);
