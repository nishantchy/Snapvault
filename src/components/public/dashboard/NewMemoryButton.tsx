import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewMemoryButton() {
  return (
    <Button
      className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg bg-white text-black hover:bg-white"
      size="icon"
    >
      <Plus className="h-11 w-11" />
    </Button>
  );
}
