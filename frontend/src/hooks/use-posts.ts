import { useState, useEffect } from 'react';
import { jsonPlaceholderApi } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/stores/user-store';
import { PostType } from '@/types/post';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, loading: userLoading } = useUserStore();

  const fetchPosts = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const response = await jsonPlaceholderApi.get('/posts?_limit=10');
      setPosts(response.data);
      console.log('Posts fetched:', response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: { title: string; body: string }) => {
    try {
      const response = await jsonPlaceholderApi.post('/posts', {
        ...postData,
        userId: 1,
      });
      
      const newPost = { ...response.data, id: Date.now(), isLocal: true };
      setPosts(prev => [newPost, ...prev]);
      
      toast({
        title: 'Sucesso!',
        description: 'Post criado com sucesso',
      });
      
      return newPost;
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o post',
        variant: 'destructive',
      });
    }
  };

  const updatePost = async (id: number, postData: { title: string; body: string }) => {
    try {
      await jsonPlaceholderApi.put(`/posts/${id}`, postData);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o post',
        variant: 'destructive',
      });
    }
    
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...postData } : post
    ));
    
    toast({
      title: 'Sucesso!',
      description: 'Post atualizado com sucesso',
    });
  };

  const deletePost = async (id: number) => {
    try {
      await jsonPlaceholderApi.delete(`/posts/${id}`);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível deletar o post',
        variant: 'destructive',
      });  
    }
    
    setPosts(prev => prev.filter(post => post.id !== id));
    
    toast({
      title: 'Sucesso!',
      description: 'Post deletado com sucesso',
    });
  };

  useEffect(() => {
    if (!userLoading && user) {
      fetchPosts();
    } else if (!userLoading && !user) {
      setLoading(false);
    }
  }, [user, userLoading]);

  return {
    posts,
    loading: loading || userLoading,
    createPost,
    updatePost,
    deletePost,
    refetchPosts: fetchPosts,
  };
};
