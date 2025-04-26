
import ShayariCard from "@/components/ShayariCard";
import AudioShayari from "@/components/AudioShayari";
import { Cherry } from "lucide-react";

const sampleShayaris = [
  {
    title: "Silence of Night",
    content: "In the quiet of night, thoughts wander free,\nLike stars that guide lost souls to destiny.",
  },
  {
    title: "Ocean of Dreams",
    content: "Waves of memories crash upon the shore,\nLeaving footprints of what was before.",
  },
  {
    title: "Morning Light",
    content: "Dawn breaks with hope anew,\nPainting skies in golden hue.",
  },
  {
    title: "Eternal Wait",
    content: "Time stands still in love's sweet embrace,\nEternity captured in a moment's grace.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background animate-gradient-xy bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Logo Section */}
        <div className="text-center mb-12 animate-float">
          <div className="inline-flex items-center gap-3 mb-4">
            <Cherry className="h-8 w-8 text-cherry animate-pulse" />
            <h1 className="text-5xl md:text-6xl text-cherry font-light">
              Shayari Haven
            </h1>
            <Cherry className="h-8 w-8 text-cherry animate-pulse" />
          </div>
          <p className="text-cherry-light/80 text-lg italic">
            Where words dance with emotions
          </p>
        </div>

        {/* Shayari Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sampleShayaris.map((shayari, index) => (
            <ShayariCard
              key={index}
              title={shayari.title}
              content={shayari.content}
            />
          ))}
        </div>

        {/* Audio Section */}
        <div className="mt-16">
          <AudioShayari />
        </div>
      </div>
    </div>
  );
};

export default Index;
