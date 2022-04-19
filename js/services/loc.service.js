import { utils } from '../utils.js'
import { storage } from './storage.js';
export const locService = {
    getLocs,
    createLoc
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    let locs = storage.load('locsDB')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}



function createLoc(loc){
    return{
        id: utils.makeId(),
        name: prompt('Name please?'),
        loc,
        createdAt: new Date
    }
}

