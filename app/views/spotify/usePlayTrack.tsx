import React from 'react';
import Sound from 'react-native-sound';

const usePlayTrack = () => {

    const [trackIdPlaying, setTrackIdPlaying] = React.useState<string | undefined>(undefined);
    const [sound, setsound] = React.useState<Sound | undefined>(undefined);

    const stopPlaying = React.useCallback(() => {
        if (sound) {
            sound.pause();
            sound.release();
            setsound(undefined);
            setTrackIdPlaying(undefined);
        }
    }, [sound]);

    const playTrack = React.useCallback((trackId: string, url: string) => {
        if (sound) {
            sound.pause();
            sound.release();
            setsound(undefined);
            if (trackId === trackIdPlaying) {
                setTrackIdPlaying(undefined);
                return;
            }
        }

        setTrackIdPlaying(trackId);

        const track = new Sound(url, Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                console.log('failed to load the sound', e);
                return;
            }
            console.log('duration in seconds: ' + track.getDuration() + 'number of channels: ' + track.getNumberOfChannels());

            track.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
                setTrackIdPlaying(undefined);
            });
        });

        setsound(track);

    }, [sound, trackIdPlaying]);

    return { trackIdPlaying, playTrack, stopPlaying };
}

export default usePlayTrack
