import { getChannels } from "./getChannels.js";
import { init } from "./Player.js";

const main = document.getElementById('app');
const btnNext = document.getElementById('next-channel');
const btnPrev = document.getElementById('prev-channel');
const channelName = document.getElementById('channel');
const messageContainer = document.getElementById('message-channel');
let count = 0;

let channels;
getChannels().then(data => channels = data);

// functions =============================================
const detectIndex = (hash) => {
    let nameChannel = hash.slice(1);
    return channels.findIndex(el => el.name === nameChannel);
}

const setLoading = () => {
    messageContainer.innerHTML = 'Cargando...';
    messageContainer.style.display = 'block';
    messageContainer.style.color = '#02730D';
    messageContainer.style.backgroundColor = 'rgba(157,255,80,0.59)';
}

const addName = (name) => channelName.innerHTML = `${name}`;

const changeChannel = (arr, i = 0) => {
    const channel = arr[i].name;
    location.hash = channel;
    addName(channel.toUpperCase());
    setLoading();
}

const validHash = (hash) => {
    // saque esté canal del if hash === '#directvSports'
    if( hash === '#tycSports' || hash === '#tvPublica' || hash === '#dSports' || hash === '#deporTv' || hash === '#azteca7'){
        count = detectIndex(hash);
        let {url} = channels[count];
        return url;
    }
    if(hash === '') return {error: 'No pasaste ningun hash'}

    return {error: 'error esté hash NO ES VALIDO'}
}

// add shaka-player ===========================================
document.addEventListener('shaka-ui-loaded', async e => {
    // channels = await getChannels()
    const channel = channels[count].name
    location.hash = channel
    addName(channel.toUpperCase())
    setLoading();
    let {hash} = location;

    let val = validHash(hash);
    typeof val === 'string'
        ?  init(val)
        : main.insertAdjacentHTML('afterbegin', `<h1>${val.error}</h1>`);
});

// detect hash in load DOM =========================================
document.addEventListener('DOMContentLoaded', async e => {
    // channels = await getChannels()
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

const nextChannel = () => {
    count++;
    if(count >= channels.length) count = 0;
    changeChannel(channels, count);
}

const prevChannel = () => {
    count--;
    if(count < 0) count = channels.length - 1;
    changeChannel(channels, count);
}

// change channel =================================================
document.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight'){
        nextChannel();
    }
    if(e.key === 'ArrowLeft'){
        prevChannel();
    }
})

btnNext.addEventListener('click', e => {
    nextChannel();
});

btnPrev.addEventListener('click', e => {
    prevChannel();
});
