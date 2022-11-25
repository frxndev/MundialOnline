export const getChannels = async () => {
    const req = await fetch('https://raw.githubusercontent.com/zalazarc20/Mundial2022/main/channels/ch.json');
    return await req.json();
}