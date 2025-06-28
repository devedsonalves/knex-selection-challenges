import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PostFormData, postSchema } from '@/schemas/post-schema';

interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>;
  initialData?: PostFormData;
  submitText?: string;
  onCancel?: () => void;
  showCard?: boolean;
}

const PostForm = ({ 
  onSubmit, 
  initialData, 
  submitText = 'Criar Post', 
  onCancel,
  showCard = true 
}: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: PostFormData) => {
    await onSubmit(data);
    
    if (!initialData) {
      reset();
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          placeholder="Digite o título do seu post..."
          {...register('title')}
          className={errors.title ? 'border-destructive' : ''}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Conteúdo</Label>
        <Textarea
          id="body"
          placeholder="Compartilhe seus pensamentos..."
          rows={4}
          {...register('body')}
          className={errors.body ? 'border-destructive' : ''}
        />
        {errors.body && (
          <p className="text-sm text-destructive">{errors.body.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="flex-1 sm:flex-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {submitText}
            </>
          )}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );

  if (!showCard) {
    return <FormContent />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Editar Post' : 'Criar Novo Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormContent />
      </CardContent>
    </Card>
  );
};

export default PostForm;
