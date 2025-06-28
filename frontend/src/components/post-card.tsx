import { useState } from 'react';
import { User, Edit, Trash2, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ConfirmDialog from '@/components/confirm-dialog';
import PostForm from '@/components/post-form';
import { PostType } from '@/types/post';
import { useUserStore } from '@/stores/user-store';

interface PostCardProps {
  post: PostType;
  onUpdate: (id: number, data: { title: string; body: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const PostCard = ({ post, onUpdate, onDelete }: PostCardProps) => {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = async (data: { title: string; body: string }) => {
    await onUpdate(post.id, data);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(post.id);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Editar Post</h3>
        </CardHeader>
        <CardContent>
          <PostForm
            onSubmit={handleUpdate}
            initialData={{ title: post.title, body: post.body }}
            submitText="Atualizar Post"
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {user && (
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  {user && (
                    <>
                      <h4 className="font-semibold text-sm">
                        {user.name.first} {user.name.last}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{user.location.city}, {user.location.state}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  {post.isLocal && (
                    <Badge variant="outline" className="text-xs">
                      Seu post
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-8 w-8 p-0"
                    title="Editar post"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Deletar post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {post.body}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Deletar Post"
        message="Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita."
        confirmText="Deletar"
        cancelText="Cancelar"
        variant="destructive"
      />
    </>
  );
};

export default PostCard;
