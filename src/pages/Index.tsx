
import ShayariCard from "@/components/ShayariCard";
import AudioShayari from "@/components/AudioShayari";
import { Cherry } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      <div className="container mx-auto px-4 py-12">
        {/* Header Section with Logo and Avatar */}
        <div className="text-center mb-16 animate-float">
          <div className="inline-flex items-center gap-3 mb-6">
            <Cherry className="h-8 w-8 text-cherry animate-pulse" />
            <h1 className="text-5xl md:text-6xl text-cherry font-light">
              Shayari Haven
            </h1>
            <Cherry className="h-8 w-8 text-cherry animate-pulse" />
          </div>
          
          {/* Profile Avatar */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32 border-4 border-cherry/50 hover:border-cherry transition-all duration-300">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Your Profile" 
                className="object-cover"
              />
              <AvatarFallback className="bg-cherry/20 text-cherry">YP</AvatarFallback>
            </Avatar>
            <p className="text-cherry-light/80 text-lg italic max-w-md">
              Where words dance with emotions, and feelings find their voice
            </p>
          </div>
        </div>

        {/* Written Shayaris Section */}
        <div className="mb-16">
          <h2 className="text-3xl text-cherry mb-8 text-center font-light">Written Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleShayaris.map((shayari, index) => (
              <ShayariCard
                key={index}
                title={shayari.title}
                content={shayari.content}
              />
            ))}
          </div>
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
