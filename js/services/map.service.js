
import { locService } from "./loc.service.js";
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap

}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    debugger
    let loc = getFromURL()
    if (loc.lat && loc.lng) {
        lat = loc.lat
        lng = loc.lng
    }
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
        .then(() => {
            gMap.addListener('click', (mapsMouseEvent) => {
                let loc = mapsMouseEvent.latLng.toJSON()
                console.log(loc);
                addMarker(loc)
                locService.createLoc(loc)

            })
        })
}

function getFromURL() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    if (!params) return
    let loc = {
        lat: params.lat,
        lng: params.lng
    }
    return loc
}

function getMap() {
    return gMap
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyA960Rf__1afSPnt2sTC20YQFZGgF_pfpE'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}