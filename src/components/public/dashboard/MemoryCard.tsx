import { Heart, MessageCircle, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Memory {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

export default function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{memory.title}</h2>
        <p className="text-gray-600 mb-4">{memory.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{memory.author[0]}</AvatarFallback>
            </Avatar>
            <span>{memory.author}</span>
          </div>
          <span>{memory.date}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 flex justify-between">
        <Button variant="ghost" size="sm">
          <Heart className="mr-1 h-4 w-4" />
          {memory.likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-1 h-4 w-4" />
          {memory.comments}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
