
import { User, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/user-store';

const UserProfile = () => {
  const { user, loading } = useUserStore();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Não foi possível carregar o perfil do usuário</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-green-400 to-purple-600" />
      <CardContent className="px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Avatar className="w-20 h-20 border-4 border-background shadow-lg -mt-4">
            <AvatarImage src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <AvatarFallback className="text-2xl">
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="mt-2">
              <h2 className="text-2xl font-bold">
                {user.name.first} {user.name.last}
              </h2>
              <Badge variant="secondary" className="mt-1">
                {user.dob.age} anos
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
              
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {user.location.city}, {user.location.state} - {user.location.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
