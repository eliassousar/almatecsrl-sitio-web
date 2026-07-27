import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const safeNext = (value: string | null) =>
  value && value.startsWith('/') && !value.startsWith('//') ? value : '/';

const Login = () => {
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = next;
    });
  }, [next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      window.location.href = next;
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      setBusy(false);
      if (error) setError(error.message);
      else setError('Cuenta creada. Revise su correo si se requiere confirmación, luego inicie sesión.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-almatec-black px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-montserrat text-2xl text-center">
            {mode === 'signin' ? 'Iniciar sesión' : 'Crear cuenta'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" value={email} autoComplete="email" required
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={password} required minLength={6}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive font-open-sans">{error}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              {mode === 'signin' ? 'Entrar' : 'Registrarse'}
            </Button>
            <button type="button" className="w-full text-sm text-muted-foreground underline"
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); }}>
              {mode === 'signin' ? '¿No tiene cuenta? Regístrese' : '¿Ya tiene cuenta? Inicie sesión'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
