
import { Button } from "@/components/ui/button";
import { Upload, PlayCircle } from "lucide-react";

const AudioShayari = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-card backdrop-blur-lg border border-gold/20 rounded-lg p-6">
      <h2 className="text-2xl text-gold mb-4">Voice Shayaris</h2>
      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full border-gold/40 hover:border-gold text-gold hover:text-gold-light"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Voice Shayari
        </Button>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary/50 transition-colors">
            <PlayCircle className="h-8 w-8 text-gold cursor-pointer hover:text-gold-light" />
            <span className="text-gray-300">Evening Musings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioShayari;
