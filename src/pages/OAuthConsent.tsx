import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get('authorization_id') ?? '';
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError('Falta el parámetro authorization_id');
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = '/login?next=' + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError('El servidor de autorización no devolvió una URL de redirección.');
      return;
    }
    window.location.href = target;
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-almatec-black px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-montserrat text-2xl text-center">
            Autorizar acceso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 font-open-sans">
          {error && <p className="text-sm text-destructive">No se pudo cargar la solicitud: {error}</p>}
          {!error && !details && <p className="text-sm text-muted-foreground">Cargando…</p>}
          {!error && details && (
            <>
              <p>
                <strong>{details.client?.name ?? 'Una aplicación'}</strong> solicita conectarse a
                su cuenta de Almatec SRL y usar las herramientas MCP en su nombre.
              </p>
              <div className="flex gap-3">
                <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
                  Aprobar
                </Button>
                <Button variant="outline" className="flex-1" disabled={busy} onClick={() => decide(false)}>
                  Denegar
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthConsent;
