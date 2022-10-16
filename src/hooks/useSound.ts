import { useCallback, useEffect, useState } from 'react';
import Sound from 'react-native-sound';

type UseSoundProps = {
  /**
   * An URL or a file path to the audio
   */
  path?: string;
  /**
   * Whether to fetch the audio as soon as the hook mounts,
   * defaults to `false`.
   */
  autoFetch?: boolean;
  /**
   * Whether to play the audio after the initial fetch,
   * defaults to `false`.
   */
  autoPlay?: boolean;
};

function useSound({ path, autoFetch = false, autoPlay = false }: UseSoundProps) {
  const [sound, setSound] = useState<Sound>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchSound = useCallback((playAfterFetch = false) => {
    if (!sound && path) {
      setIsLoading(true);
      setIsError(false);

      const newSound = new Sound(path, undefined, (error) => {
        if (error) {
          setIsError(true);
        } else {
          setSound(newSound);

          if (playAfterFetch) {
            newSound.play();
          }
        }

        setIsLoading(false);
      });
    }
  }, [path, sound]);

  const play = useCallback(() => {
    if (sound) {
      sound.play();
    } else {
      fetchSound(true);
    }
  }, [sound, fetchSound]);

  useEffect(() => {
    if (autoFetch) {
      fetchSound(autoPlay);
    }
  }, [autoFetch, autoPlay, fetchSound]);

  useEffect(() => {
    return () => {
      if (sound) {
        // free up system resources on unmount
        sound.release();
      }
    };
  }, [sound]);

  return {
    isLoading, isError, sound, play,
  };
}

export default useSound;
