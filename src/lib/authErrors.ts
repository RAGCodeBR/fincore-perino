type AuthFailure = { code?: string; message?: string; status?: number; name?: string };
export function loginErrorMessage(error?: AuthFailure | null): string {
  if (error?.code === 'invalid_credentials') return 'E-mail ou senha inválidos.';
  if (error?.code === 'email_not_confirmed' || /email not confirmed/i.test(error?.message || ''))
    return 'Este acesso ainda precisa ser ativado pelo link enviado ao e-mail cadastrado.';
  if (error?.status === 429 || /rate.limit|too many requests/i.test(error?.message || ''))
    return 'Muitas tentativas de acesso. Aguarde alguns minutos e tente novamente.';
  if (error?.name === 'AuthRetryableFetchError' || error?.status === 0 ||
      (error?.status || 0) >= 500 || /failed to fetch|networkerror|network request failed|load failed|fetch failed/i.test(error?.message || ''))
    return 'Não foi possível conectar ao serviço de acesso. Sua senha não pôde ser verificada. Tente novamente em instantes; se persistir, peça ao administrador para verificar o Supabase do Perino.';
  return 'Não foi possível concluir o acesso. Tente novamente; se persistir, contate o administrador.';
}
