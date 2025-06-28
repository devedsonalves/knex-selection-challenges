import { MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { usePosts } from '@/hooks/use-posts';
import { useUserStore } from '@/stores/user-store';
import PostCard from '@/components/post-card';

const PostFeed = () => {
  const { posts, loading, updatePost, deletePost } = usePosts();
  const { user, loading: userLoading } = useUserStore();

  if (loading || userLoading || !user) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum post encontrado</h3>
          <p className="text-muted-foreground">
            Seja o primeiro a compartilhar algo interessante!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onUpdate={updatePost}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
};

export default PostFeed;
