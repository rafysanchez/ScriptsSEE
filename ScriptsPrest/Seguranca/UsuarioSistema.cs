using PrestacaoContas.Controllers;
using See.Sed.Domain.Entidade;

namespace PrestacaoContas.Seguranca
{
    public class UsuarioSistema : SedController
    {
        public Usuario _usuarioLogado { get { return UsuarioAtual; } }
    }
}