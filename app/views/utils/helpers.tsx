export const getYoutubeVideoDuration = (duration: string) => {
    var regexPtms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0, minutes = 0, seconds = 0, totalMilliSeconds;

    if (regexPtms.test(duration)) {
        var matches = regexPtms.exec(duration);
        if (matches) {
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);

            return totalMilliSeconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        }
    }

    return 0;
}

export const msToTime = (milliseconds: number) => {
    var seconds = Math.floor((milliseconds / 1000) % 60);
    var minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    var hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 60);

    const buildDigit = (value: number, end: boolean = false) => {

        if (value == 0) {
            return end ? '00' : '';
        }

        let valueString: string;
        const endString = end ? '' : ':';
        if (value < 10) {
            valueString = "0" + value + endString;
        } else {
            valueString = value + endString;
        }
        return valueString
    }

    return `${buildDigit(hours)}${buildDigit(minutes)}${buildDigit(seconds, true)}`;
}

export const defaultThumbnail = "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg";