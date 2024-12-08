import Footer from "@/components/public/dashboard/footer";
import Header from "@/components/public/dashboard/Header";
import MemoryCard from "@/components/public/dashboard/MemoryCard";
import NewMemoryButton from "@/components/public/dashboard/NewMemoryButton";
import Sidebar from "@/components/public/dashboard/Sidebar";

export default function Home() {
  const memories = [
    {
      id: 1,
      title: "Summer Beach Trip",
      description: "An amazing day at the beach with friends",
      imageUrl: "/beach.jpg",
      author: "John Doe",
      date: "2023-07-15",
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      title: "Mountain Hiking Adventure",
      description: "Conquered the peak after a challenging hike",
      imageUrl: "/trekking.jpeg",
      author: "Jane Smith",
      date: "2023-07-10",
      likes: 18,
      comments: 3,
    },
    {
      id: 3,
      title: "Pokhara the land of Vibes",
      description: "Enjoyed the best peaceful lake",
      imageUrl: "/pokhara.jpeg",
      author: "Nishant Chaudhary",
      date: "2023-07-10",
      likes: 28,
      comments: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar className="w-full md:w-1/4" />
          <main className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Your Memories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          </main>
        </div>
      </div>
      <NewMemoryButton />
      <Footer />
    </div>
  );
}
