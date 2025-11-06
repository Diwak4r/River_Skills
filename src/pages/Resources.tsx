
import { useState } from "react";
import ModernHeader from '@/components/layout/ModernHeader';
import SearchBar from "@/components/SearchBar";
import EnhancedResourceCard from "@/components/EnhancedResourceCard";
import { BookOpen, Code, Wrench, RefreshCw, Play, Smartphone, Globe, Headphones, BookMarked, Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useResources } from "@/hooks/useResources";

const sectionStyles: { [key: string]: { icon: React.ReactNode; borderColor: string } } = {
  Documentation: {
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    borderColor: "border-blue-500",
  },
  Tools: {
    icon: <Wrench className="h-6 w-6 text-green-500" />,
    borderColor: "border-green-500",
  },
  "Course Platforms": {
    icon: <Globe className="h-6 w-6 text-indigo-500" />,
    borderColor: "border-indigo-500",
  },
  Community: {
    icon: <BookMarked className="h-6 w-6 text-teal-500" />,
    borderColor: "border-teal-500",
  },
};

export default function Resources() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const { resources, loading, refreshing, handleRefreshResources } = useResources();

  // Group resources by type and filter by search
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    
    if (
      (selectedType === "all" || resource.type === selectedType) &&
      (resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description?.toLowerCase().includes(search.toLowerCase()))
    ) {
      acc[resource.type].push(resource);
    }
    
    return acc;
  }, {} as Record<string, typeof resources>);

  const handleResourceClick = (url?: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const resourceTypes = ["all", ...Object.keys(sectionStyles)];
  const totalResources = resources.length;
  const filteredCount = Object.values(groupedResources).reduce((sum, items) => sum + items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
              Learning Resources
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover curated learning resources to boost your programming skills.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalResources}</div>
                  <div className="text-muted-foreground">Total Resources</div>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{resourceTypes.length - 1}</div>
                  <div className="text-gray-600">Categories</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">100%</div>
                  <div className="text-gray-600">Free Resources</div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto animate-fade-in-up mb-6" style={{ animationDelay: '0.4s' }}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search for courses, tutorials, tools..." />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {resourceTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "transition-all duration-300",
                    selectedType === type 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                      : "hover:bg-blue-50"
                  )}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {type === "all" ? "All" : type}
                </Button>
              ))}
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                onClick={handleRefreshResources}
                disabled={refreshing}
                className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {refreshing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Resources
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-5xl">
            {loading && (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading additional resources...</p>
              </div>
            )}

            {filteredCount > 0 && (
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredCount} of {totalResources} resources
                  {selectedType !== "all" && ` in ${selectedType}`}
                </p>
              </div>
            )}
            
            <div className="space-y-12">
              {Object.entries(groupedResources).map(
                ([type, items]) =>
                  items.length > 0 && (
                    <div key={type} className="animate-fade-in-up">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white rounded-xl shadow-md">
                          {sectionStyles[type]?.icon || <BookOpen className="h-6 w-6 text-gray-500" />}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">{type}</h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                          {items.length} {items.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item) => (
                          <EnhancedResourceCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            type={item.type}
                            url={item.url}
                            created_at={item.created_at}
                            borderColor={sectionStyles[type]?.borderColor}
                            icon={sectionStyles[type]?.icon}
                            onClick={() => handleResourceClick(item.url)}
                          />
                        ))}
                      </div>
                    </div>
                  ),
              )}
              
              {Object.keys(groupedResources).length === 0 && (
                <div className="text-center py-16 bg-white/50 rounded-lg shadow-sm">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">No resources found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or refresh to load new resources.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
