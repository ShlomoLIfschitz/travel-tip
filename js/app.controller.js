import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storage } from './services/storage.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDeleteLoc = onDeleteLoc;
<<<<<<< HEAD
window.onGetAdd = onGetAdd
=======
window.onMyLocation = onMyLocation;
window.onCopyLink = onCopyLink;
>>>>>>> 2f9c595e6114921bd97bb3daecadc3724c0ab705

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            renderMarkers()
        })
        .catch(() => console.log('Error: cannot init map'));
}

function onCopyLink() {
    let map = mapService.getMap()
    const params = new URLSearchParams({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
    })
    document.querySelector('.copy-link').innerText = `https://shlomolifschitz.github.io/travel-tip/${params.toString()}`
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getLocation() {
    let map = mapService.getMap()
    console.log(map.getCenter().lat());
    document.querySelector('.user-pos').innerText = `Latitude: ${map.getCenter().lat()} - Longitude: ${map.getCenter().lng()}`
}

function getMyLocation() {
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
            document.querySelector('.locs').innerText = JSON.stringify(locs)
            return locs
        })
        .then(locs => {
            renderlocs()
            console.log('Locations:', locs)
        })
}

function onGetUserPos() {
    getLocation()
        .then(pos => {
            console.log('User position is:', pos.coords);
<<<<<<< HEAD
            document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            onPanTo(pos.coords.latitude, pos.coords.longitude)
=======
            document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude} `
>>>>>>> 2f9c595e6114921bd97bb3daecadc3724c0ab705
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onMyLocation() {
    getMyLocation()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude} `
            onPanTo(pos.coords.latitude, pos.coords.longitude)
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
    renderlocs()
}

function renderlocs() {
    let strHtml = `
    <thead>
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Lat</th>
    <th>Lng</th>
    <th>Created At</th>
        <th>Updated At</th>
        <th>Actions</th>
        </tr>
</thead>
    <tbody>`
    let locs = storage.load('locDB')
    if (!locs) return
    locs.forEach((loc, idx) => {
        console.log(loc);
        strHtml += `<tr>
<<<<<<< HEAD
    <td>${loc.id}</td>
    <td>${loc.name}</td>
        <td>${loc.locPos.lat}</td>
        <td>${loc.locPos.lng}</td>
        <td>${loc.createdAt}</td>
        <td>${loc.updatedAt}</td>
        <td> <button onclick="onPanTo(${loc.locPos.lat},${loc.locPos.lng})">Go</button> <button onclick="onDeleteLoc(${idx})">Delete</button></td>
=======
            <td>${loc.id}</td>
            <td>${loc.name}</td>
            <td>${loc.locPos.lat}</td>
            <td>${loc.locPos.lng}</td>
            <td>${loc.createdAt}</td>
            <td>${loc.updatedAt}</td>
            <td> <button onclick="onPanTo(${loc.locPos.lat},${loc.locPos.lng})">Go</button> <button onclick="onDeleteLoc(${idx})">Delete</button></td>
>>>>>>> 2f9c595e6114921bd97bb3daecadc3724c0ab705
        </tr>`
    })
    strHtml += `</tbody>`
    document.querySelector('.locs').innerHTML = strHtml
}

function renderMarkers() {
    let locs = storage.load('locDB')
    if (!locs) return
    locs.forEach(loc => {
        mapService.addMarker(loc.locPos)
    })
}

function onGetAdd(val) {
    let prmsLoc = mapService.getAdd(val)
}