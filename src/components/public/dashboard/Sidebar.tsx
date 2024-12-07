import { Home, Compass, Bookmark, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={`bg-white shadow rounded-lg p-6 ${className}`}>
      <nav className="space-y-4">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Compass className="mr-2 h-4 w-4" />
          Explore
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Bookmark className="mr-2 h-4 w-4" />
          Saved
        </Button>
      </nav>
      <div className="mt-8">
        <h3 className="font-semibold mb-4">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Tag className="mr-1 h-3 w-3" />
            Travel
          </Button>
          <Button variant="outline" size="sm">
            <Tag className="mr-1 h-3 w-3" />
            Food
          </Button>
          <Button variant="outline" size="sm">
            <Tag className="mr-1 h-3 w-3" />
            Nature
          </Button>
        </div>
      </div>
    </aside>
  );
}
