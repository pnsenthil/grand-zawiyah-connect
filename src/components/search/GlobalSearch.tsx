import React, { useState, useEffect } from 'react';
import { Search, X, Filter, Clock, Bookmark } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'lesson' | 'event' | 'donation' | 'resource';
  url: string;
  relevanceScore: number;
  date?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  // Mock AI-powered search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock search results with AI-powered relevance scoring
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'Understanding Tariqa Teachings',
        content: 'Deep dive into the spiritual teachings of the Tariqa tradition...',
        type: 'lesson' as const,
        url: '/lessons/tariqa-teachings',
        relevanceScore: 0.95,
        date: '2024-01-15'
      },
      {
        id: '2',
        title: 'Monthly Community Gathering',
        content: 'Join us for our monthly community gathering and spiritual discussion...',
        type: 'event' as const,
        url: '/events/monthly-gathering',
        relevanceScore: 0.88,
        date: '2024-02-10'
      },
      {
        id: '3',
        title: 'Grand Zawiyah Construction Fund',
        content: 'Support the construction of our new community center...',
        type: 'donation' as const,
        url: '/donate/construction-fund',
        relevanceScore: 0.82
      }
    ].filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults.sort((a, b) => b.relevanceScore - a.relevanceScore));
    setIsLoading(false);
    
    // Add to search history
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-primary/10 text-primary';
      case 'event': return 'bg-secondary/10 text-secondary';
      case 'donation': return 'bg-accent/10 text-accent';
      case 'resource': return 'bg-muted/10 text-muted-foreground';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Search Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons, events, resources..."
                className="border-0 focus-visible:ring-0 text-lg"
                autoFocus
              />
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-2 mt-4">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {['lessons', 'events', 'donations', 'resources'].map((filter) => (
                <Badge
                  key={filter}
                  variant={filters.includes(filter) ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => {
                    setFilters(prev => 
                      prev.includes(filter) 
                        ? prev.filter(f => f !== filter)
                        : [...prev, filter]
                    );
                  }}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="p-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => {
                      window.location.href = result.url;
                      onClose();
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm">{result.title}</h3>
                          <Badge variant="outline" className={getTypeColor(result.type)}>
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.content}
                        </p>
                        {result.date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(result.relevanceScore * 100)}% match
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : query ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No results found for "{query}"</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : (
              <div className="p-6">
                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Recent Searches</span>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.map((search, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground p-2 rounded hover:bg-muted/50"
                          onClick={() => setQuery(search)}
                        >
                          {search}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Quick Access</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Latest Lessons', url: '/lessons' },
                      { name: 'Upcoming Events', url: '/events' },
                      { name: 'Donation Portal', url: '/donate' },
                      { name: 'My Dashboard', url: '/dashboard' }
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="p-3 text-sm rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => {
                          window.location.href = item.url;
                          onClose();
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}