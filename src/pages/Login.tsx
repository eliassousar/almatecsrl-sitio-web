import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/";

const Login = () => {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = next;
    });
  }, [next]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setBusy(false);
      return;
    }
    window.location.href = next;
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-almatec-black px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-montserrat text-2xl text-center">Acceso del equipo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" value={email} autoComplete="email" required
                onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={password} required
                autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive font-open-sans">No se pudo iniciar sesión.</p>}
            <Button type="submit" className="w-full" disabled={busy}>Entrar</Button>
            <p className="text-xs text-muted-foreground text-center">
              El acceso es privado para el equipo de Almatec. Solicite una cuenta a un administrador;
              este sitio no permite crear cuentas públicas.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
