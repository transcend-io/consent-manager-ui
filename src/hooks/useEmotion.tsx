import createEmotion, { Emotion } from '@emotion/css/create-instance';
import { ComponentChildren, createContext, h, JSX } from 'preact';
import { useContext, useEffect, useRef, useState } from 'preact/hooks';

export const EmotionContext = createContext<Emotion>({} as Emotion);

// FIXME
export const EmotionProvider = ({
  children,
}: {
  /** Component children. All children will have access to Emotion */
  children: ComponentChildren;
}): JSX.Element => {
  const mainRef = useRef<HTMLDivElement>();
  const [emotionCache, setEmotionCache] = useState<Emotion | null>(null);

  // Create an instance of Emotion to pass into the app. Uniquely keyed so it doesn't conflict with others.
  useEffect(() => {
    if (mainRef && !emotionCache) {
      const emotionCacheWithRef = createEmotion({
        key: 'transcend-consent-manager',
        container: mainRef.current,
      });
      setEmotionCache(emotionCacheWithRef);
    }
  }, [mainRef, emotionCache]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div ref={mainRef as any}>
      {emotionCache && (
        <EmotionContext.Provider value={emotionCache}>
          {children}
        </EmotionContext.Provider>
      )}
    </div>
  );
};

export const useEmotion = (): Emotion => useContext(EmotionContext);
