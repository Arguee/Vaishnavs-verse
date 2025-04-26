
import { PlayCircle } from "lucide-react";

const AudioShayari = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-card backdrop-blur-lg border border-cherry/20 rounded-lg p-6 hover:border-cherry/40 transition-all duration-300">
      <h2 className="text-2xl text-cherry mb-6 font-light">Voice Collection</h2>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-colors group cursor-pointer">
            <PlayCircle className="h-8 w-8 text-cherry group-hover:text-cherry-light transition-colors" />
            <span className="text-cherry-light/80 group-hover:text-cherry-light transition-colors">Evening Musings</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-colors group cursor-pointer">
            <PlayCircle className="h-8 w-8 text-cherry group-hover:text-cherry-light transition-colors" />
            <span className="text-cherry-light/80 group-hover:text-cherry-light transition-colors">Midnight Thoughts</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-colors group cursor-pointer">
            <PlayCircle className="h-8 w-8 text-cherry group-hover:text-cherry-light transition-colors" />
            <span className="text-cherry-light/80 group-hover:text-cherry-light transition-colors">Dawn's Whispers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioShayari;
