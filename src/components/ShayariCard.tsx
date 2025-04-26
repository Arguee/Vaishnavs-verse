
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ShayariCardProps {
  title: string;
  content: string;
}

const ShayariCard = ({ title, content }: ShayariCardProps) => {
  return (
    <Card className="bg-card backdrop-blur-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 cursor-pointer group">
      <CardHeader>
        <CardTitle className="text-gold text-lg font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default ShayariCard;
