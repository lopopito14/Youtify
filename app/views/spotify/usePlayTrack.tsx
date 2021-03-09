import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Sound from 'react-native-sound';
import logger from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePlayTrack = () => {

    const { log } = logger();

    const [trackIdPlaying, setTrackIdPlaying] = React.useState<string | undefined>(undefined);
    const [sound, setSound] = React.useState<Sound | undefined>(undefined);

    const stopPlaying = React.useCallback(() => {
        if (sound) {
            sound.pause();
            sound.release();
            setSound(undefined);
            setTrackIdPlaying(undefined);
        }
    }, [sound]);

    const playTrack = React.useCallback((trackId: string, url: string) => {
        if (sound) {
            sound.pause();
            sound.release();
            setSound(undefined);
            if (trackId === trackIdPlaying) {
                setTrackIdPlaying(undefined);
                return;
            }
        }

        setTrackIdPlaying(trackId);

        const track = new Sound(url, Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                log(`failed to load the sound => ${e}`);
                return;
            }
            log(`duration in seconds: ${track.getDuration()}number of channels: ${track.getNumberOfChannels()}`);

            track.play((success) => {
                if (success) {
                    log('successfully finished playing');
                } else {
                    log('playback failed due to audio decoding errors');
                }
                setTrackIdPlaying(undefined);
            });
        });

        setSound(track);

    }, [log, sound, trackIdPlaying]);

    return { trackIdPlaying, playTrack, stopPlaying };
}

export default usePlayTrack;