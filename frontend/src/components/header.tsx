import { Moon, Sun, User, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/use-theme';
import { useUserStore } from '@/stores/user-store';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, clearUser } = useUserStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="logo.png" alt="Logo Knex" className="w-36 h-auto" />
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {user && (
            <>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline-block">
                  {user.name.first} {user.name.last}
                </span>
              </div>
              <Button 
                variant="ghost"
                size="sm"
                onClick={clearUser}
                className="w-9 h-9 rounded-full"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
          
        </div>

        
      </div>
    </header>
  );
};

export default Header;
