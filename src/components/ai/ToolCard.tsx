import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, ExternalLink } from 'lucide-react';
import type { AITool } from '@/types';

interface ToolCardProps {
  tool: AITool;
}

const getPricingColor = (pricing: string) => {
  switch (pricing) {
    case 'free':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'freemium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'paid':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-muted/10 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{tool.icon}</div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <Badge className={getPricingColor(tool.pricing)} variant="secondary">
                {tool.pricing}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">
          {tool.description}
        </p>

        {/* Capabilities */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Key Features:</div>
          <div className="flex flex-wrap gap-2">
            {tool.capabilities.slice(0, 4).map((capability) => (
              <Badge key={capability} variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {capability}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          <Link to={tool.url}>
            Use Tool
            <ExternalLink className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
