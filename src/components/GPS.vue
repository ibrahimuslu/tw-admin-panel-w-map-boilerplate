<template>
    <div>
        <div class="mx-auto h-1/2 w-1/2" ref="maproot" style="width: 750px; height: 600px">
            <div id="popup" class="ol-popup">
                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                <div id="popup-content"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Device, UserDevice, Response, Responsed } from '../interfaces/index'
    
    import { ref, computed, onMounted, Ref, reactive } from 'vue';
    import { useStore, Store  } from 'vuex'

    // importing the OpenLayers stylesheet is required for having
    // good looking buttons!
    import 'ol/ol.css'
    import {Map, View} from 'ol';
    import TileLayer from 'ol/layer/Tile'
    import Overlay from 'ol/Overlay'
    import VectorLayer from 'ol/layer/Vector';
    import Point from 'ol/geom/Point';
    import Feature from 'ol/Feature';
    import WebGLPointsLayer from 'ol/layer/WebGLPoints';

    import { OSM, Stamen, Vector as VectorSource } from 'ol/source';
    import { toLonLat, fromLonLat, transform } from 'ol/proj.js';
    import {toStringHDMS} from 'ol/coordinate';
    import Geometry from 'ol/geom/Geometry';
import { log } from 'console';


    
    const store = useStore()
    const state = reactive({test : null ,devices: null});

    const maproot = ref(null!)  // https://stackoverflow.com/questions/63022740/vue-composition-api-getting-a-ref-using-typescript
    const source = new VectorSource();
    const features: Feature<Geometry>[] = [];
    
    const gardeners = new WebGLPointsLayer({
        source: source,
        style: {
            symbol: {
                symbolType: 'image',
                src: 'icon-events-pin.svg',
                size: [18, 28],
                color: 'lightyellow',
                rotateWithView: false,
                offset: [0, 9],
            },
        },
    });
    const map: Map = store.getters['device/getMap']
    onMounted(async ()=> {
        
       
        map.setTarget(maproot.value)
        map.addLayer(new TileLayer({
                        source: new OSM() // tiles are served by OpenStreetMap
                    }),)
        const view = new View({
                    zoom: 5,
                    center: transform([29 , 41 ], 'EPSG:4326', 'EPSG:3857'),
                    constrainResolution: true
                })
        map.setView(view)

        const popup = {
            container: document.getElementById('popup'),
            content: document.getElementById('popup-content'),
            closer: document.getElementById('popup-closer'),
            overlay: <Overlay>{}
        }
        
        const deviceListResp = computed((): Promise<Responsed> =>store.dispatch('device/getList'))
        deviceListResp.value.then((response: Responsed) => {            
            if(Array.isArray(response.data)){
                const devices = response.data.map((d: UserDevice) => d.Device)
                devices.forEach( (device: Device) => {
                    const coords = fromLonLat([device.lng,device.lat])
                    features.push(
                        new Feature({
                            geometry: new Point(coords),
                            name: device.name
                        })
                    );
                });

                source.addFeatures(features);
            }
            
        })
        
       
        

        store.commit('device/setFeatures',features)
    
        popup.overlay = new Overlay({
            element: popup.container!,
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
            },
        });
        
        map.addOverlay(popup.overlay)
        store.commit('device/setPopup',popup)

        /**
         * Add a click handler to hide the popup.
         * @return {boolean} Don't follow the href.
         */
        popup.closer!.onclick = function () {
            popup.overlay.setPosition(undefined);
            view.setZoom(5)
            popup.closer!.blur();
            return false;
        };
        // display popup on click
        map.on('click', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature;
            });
            if (feature) {
                view.setZoom(12)
                view.setCenter(feature.getGeometry().flatCoordinates)
                popup.content!.innerHTML = '<code>' + feature.get('name') + '</code>';
                popup.overlay.setPosition(feature.getGeometry().flatCoordinates);
                
            } else {
                view.setZoom(5)
                popup.overlay.setPosition(undefined);
                popup.closer!.blur();
            }
        });
        // change mouse cursor when over marker
        map.on('pointermove', function (e) {
            const pixel = map.getEventPixel(e.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            map.getTarget()!.style.cursor = hit ? 'pointer' : '';
        });
        

        map.addLayer(gardeners)
        map.render();

    })
    
    
</script>
<style scoped>
.ol-popup {
        position: absolute;
        background-color: white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
        min-width: 280px;
      }
      .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
      }
      .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
      }
      .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
      }
      .ol-popup-closer:after {
        content: "✖";
      }
    
</style>