export const getYoutubeVideoDuration = (duration: string | undefined | null): number => {
    if (!duration) {
        return 0
    }

    const regexPtms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0; let minutes = 0; let seconds = 0;

    if (regexPtms.test(duration)) {
        const matches = regexPtms.exec(duration);
        if (matches) {
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);

            return (hours * 3600 + minutes * 60 + seconds) * 1000;
        }
    }

    return 0;
}

export const msToTime = (milliseconds: number): string => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 60);

    const buildDigit = (value: number, end = false) => {

        if (value === 0) {
            return end ? '00' : '';
        }

        let valueString: string;
        const endString = end ? '' : ':';
        if (value < 10) {
            valueString = `0${value}${endString}`;
        } else {
            valueString = value + endString;
        }
        return valueString
    }

    return `${buildDigit(hours)}${buildDigit(minutes)}${buildDigit(seconds, true)}`;
}

export const defaultThumbnail = "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg";