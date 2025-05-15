import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, PauseCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ShayariCardProps {
  title: string;
  content: string;
  type: 'text' | 'audio';
  audioUrl?: string;
}

const ShayariCard = ({ title, content, type, audioUrl }: ShayariCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (type === 'audio' && audioUrl) {
      console.log('Initializing audio with URL:', audioUrl);
      setIsLoading(true);
      setError(null);

      // Initialize audio element
      const audio = new Audio();
      audioRef.current = audio;

      // Set up event listeners
      audio.oncanplaythrough = () => {
        console.log('Audio can play through');
        setIsLoading(false);
        setError(null);
      };

      audio.onerror = (e: Event) => {
        const audioElement = e.target as HTMLAudioElement;
        console.error('Audio error details:', {
          error: audioElement.error,
          errorCode: audioElement.error?.code,
          errorMessage: audioElement.error?.message,
          networkState: audioElement.networkState,
          readyState: audioElement.readyState,
          src: audioElement.src,
          currentSrc: audioElement.currentSrc
        });
        setIsLoading(false);
        setError('Failed to load audio');
        setIsPlaying(false);
      };

      audio.onended = () => {
        console.log('Audio playback ended');
        setIsPlaying(false);
      };

      // Set the source and load the audio
      audio.src = audioUrl;
      audio.load();
    }

    return () => {
      if (audioRef.current) {
        console.log('Cleaning up audio element');
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [type, audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) {
      console.error('No audio element available');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausing audio');
        await audioRef.current.pause();
      } else {
        console.log('Playing audio');
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Error playing audio:', err);
      setError('Failed to play audio');
      setIsPlaying(false);
    }
  };

  return (
    <Card className="bg-card backdrop-blur-lg border border-cherry/20 hover:border-cherry/40 transition-all duration-300 cursor-pointer group">
      <CardHeader>
        <CardTitle className="text-cherry text-lg font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {type === 'text' ? (
          <p className="text-cherry-light/80 group-hover:text-cherry-light transition-colors duration-300 whitespace-pre-wrap">
            {content}
          </p>
        ) : (
          <div 
            onClick={togglePlay}
            className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-colors group cursor-pointer"
          >
            {isLoading ? (
              <div className="animate-spin h-8 w-8 border-2 border-cherry border-t-transparent rounded-full" />
            ) : isPlaying ? (
              <PauseCircle className="h-8 w-8 text-cherry group-hover:text-cherry-light transition-colors" />
            ) : (
              <PlayCircle className="h-8 w-8 text-cherry group-hover:text-cherry-light transition-colors" />
            )}
            <span className="text-cherry-light/80 group-hover:text-cherry-light transition-colors">
              {error ? error : (isLoading ? 'Loading...' : (isPlaying ? 'Pause' : 'Play'))}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShayariCard;
