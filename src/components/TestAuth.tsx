import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, LogOut, LogIn } from 'lucide-react';

export default function TestAuth() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading auth status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Authentication Status
        </CardTitle>
        <CardDescription>
          Current authentication state and user information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <>
            <div className="space-y-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success">
                Authenticated
              </Badge>
              <div className="space-y-1">
                <p className="text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm">
                  <strong>ID:</strong> {user.id}
                </p>
                <p className="text-sm">
                  <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button 
              onClick={signOut}
              variant="outline" 
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Badge variant="outline" className="bg-muted/50 text-muted-foreground">
                Not Authenticated
              </Badge>
              <p className="text-sm text-muted-foreground">
                No user session found. You need to sign in to access authenticated features.
              </p>
            </div>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <a href="/auth">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </a>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}