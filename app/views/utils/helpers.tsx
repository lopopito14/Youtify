export const msToTime = (milliseconds: number) => {
    var seconds = Math.floor((milliseconds / 1000) % 60);
    var minutes = Math.floor((milliseconds / (1000 * 60)) % 60);

    const minutesString = (minutes < 10) ? "0" + minutes : minutes;
    const secondsString = (seconds < 10) ? "0" + seconds : seconds;

    return minutesString + ":" + secondsString;
}

export const defaultThumbnail = () => {
    return "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg";
}