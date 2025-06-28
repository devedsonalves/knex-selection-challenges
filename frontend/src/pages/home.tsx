import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UserProfile from '@/components/user-profile';
import PostForm from '@/components/post-form';
import PostFeed from '@/components/post-feed';
import { usePosts } from '@/hooks/use-posts';
import { useUserStore } from '@/stores/user-store';

const HomePage = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { createPost } = usePosts();
  const { user, loading: userLoading } = useUserStore();

  const handleCreatePost = async (data: { title: string; body: string }) => {
    await createPost(data);
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <UserProfile />

          {user && !userLoading && (
            <div className="space-y-4">
              {!showCreatePost ? (
                <div className="text-center">
                  <Button
                    onClick={() => setShowCreatePost(true)}
                    className="bg-purple-600 hover:bg-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Criar Novo Post
                  </Button>
                </div>
              ) : (
                <PostForm
                  onSubmit={handleCreatePost}
                  onCancel={() => setShowCreatePost(false)}
                />
              )}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
              Feed de Posts
            </h2>
            <PostFeed />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
