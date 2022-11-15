import { init } from "./Player.js";

const main = document.getElementById('app');
const btn = document.getElementById('change');
const channels = [
    {
        name: 'dSports',
        url: 'https://dtvott-abc.akamaized.net/dash_live_1057/manifest.mpd?&ck=eyJhN2UwOWM2ZjQ3YWY1N2U5OTliNzg5ZWI1NGQzMjU1ZCIgOiAiMjYzZjZkYjEyZDZmOWFhNzJmMmNjOWIwZWYyZTI2YjIifQ=='
    },
    // {
    //     name: 'directvSports',
    //     url: 'https://dtvott-abc.akamaized.net/dash_live_1057/manifest.mpd?&ck=eyJhN2UwOWM2ZjQ3YWY1N2U5OTliNzg5ZWI1NGQzMjU1ZCIgOiAiMjYzZjZkYjEyZDZmOWFhNzJmMmNjOWIwZWYyZTI2YjIifQ=='
    // },
    {
        name: 'tycSports',
        url: 'https://1240-vos.dtvott.com/DASH/manifest.mpd?&ck=eyI0ZDQ1Yjc5ZDQ0ODczNDM1ODkwNThhYjQ5ZGRmOGNmMCI6ImFhN2Y5NWY3MWEzY2ZlNDBhYTU5OTA0ZjkyODVhZjcyIn0='
    },
    {
        name: 'tvPublica',
        url: 'https://edge-live17-sl.cvattv.com.ar/live/c6eds/Canal7/SA_Live_dash_enc_2A/Canal7.mpd?&ck=eyJjYzhjODJhYzJlYzdlOTc5OTUyN2MyOWRiNzM1NGU4MSIgOiAiY2M0YWFlMTczZGQyZWYxN2FlMjZiZTNmN2FlODc2NjIifQ=='
    },
    {
        name: 'deporTv',
        url: 'https://dtvott-abc.akamaized.net/dash_live_1056/manifest.mpd?&ck=eyIwMGE3NzVkMWI5NmI1OTUxYjNjM2FiNTc5OWY5ODY4ZSIgOiAiM2E1NmRmMDA0N2RkNzA5Mzg4YzYwNmY5ZmYyZmJhZGQifQ=='
    },
]
let count = 0;

// functions =============================================
const detectIndex = (hash) => {
    let nameChannel = hash.slice(1);
    return channels.findIndex(el => el.name === nameChannel);
}

const changeChannel = (arr, i = 0) => location.hash = arr[i].name;

const validHash = (hash) => {
    // saque esté canal del if hash === '#directvSports'
    if( hash === '#tycSports' || hash === '#tvPublica' || hash === '#dSports' || hash === '#deporTv'){
        count = detectIndex(hash);
        let {url} = channels[count];
        return url;
    }
    if(hash === '') return {error: 'No pasaste ningun hash'}

    return {error: 'error esté hash NO ES VALIDO'}
}

// add shaka-player ===========================================
document.addEventListener('shaka-ui-loaded', async e => {
    location.hash = channels[count].name
    let {hash} = location;

    let val = validHash(hash);
    typeof val === 'string' 
        ?  init(val)
        : main.insertAdjacentHTML('afterbegin', `<h1>${val.error}</h1>`);
});

// detect hash in load DOM =========================================
document.addEventListener('DOMContentLoaded', e => {
    let {hash} = location;

    let val = validHash(hash);
    typeof val === 'string' 
        ? init(val) 
        : console.error(val.error);

});

// detect change hash ===============================================
window.addEventListener('hashchange', e => {
    let { hash } = e.target.location;
    let index = detectIndex(hash);
    let {url} = channels[index];
    init(url)
});

// change channel =================================================
document.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight'){
        count++;
        if(count >= channels.length) count = 0;
        changeChannel(channels, count );
    }
})
btn.addEventListener('click', e => {
    count++;
    if(count >= channels.length) count = 0;
    changeChannel(channels, count );
});