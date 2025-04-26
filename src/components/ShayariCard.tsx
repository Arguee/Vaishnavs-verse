import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ShayariCardProps {
  title: string;
  content: string;
}

const ShayariCard = ({ title, content }: ShayariCardProps) => {
  return (
    <Card className="bg-card backdrop-blur-lg border border-cherry/20 hover:border-cherry/40 transition-all duration-300 cursor-pointer group">
      <CardHeader>
        <CardTitle className="text-cherry text-lg font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Applying white-space: pre-wrap to preserve line breaks and spaces */}
        <p className="text-cherry-light/80 group-hover:text-cherry-light transition-colors duration-300 whitespace-pre-wrap">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default ShayariCard;
