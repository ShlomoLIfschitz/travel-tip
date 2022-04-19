import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storage } from './services/storage.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
    renderlocs()
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}

function onDeleteLoc(idx) {
    locService.deleteLoc(idx)
}

function renderlocs() {
    let locs = storage.load('locDB')
    if (!locs) return
    let strHtml = locs.map((loc, idx) => {
        console.log(loc);
        return `
        <tr>
        <td>${loc.id}</td>
        <td>${loc.name}</td>
        <td>${loc.locPos.lat}</td>
        <td>${loc.locPos.lng}</td>
        <td>${loc.createdAt}</td>
        <td>${loc.updatedAt}</td>
        <td> <button onclick="onPanTo(${loc.locPos.lat},${loc.locPos.lng})">Go</button> <button onclick="onDeleteLoc(${idx})">Delete</button></td>
        </tr>
        `
    })
    console.log(strHtml.join(''));
    document.querySelector('.locs-table') = strHtml.join('')
}