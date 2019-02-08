namespace PrestacaoContas.Seguranca
{
    public class PermissaoController
    {
        public string Controller { get; set; }

        public Permissoes Permissao { get; set; } = new Permissoes();

        public bool SomenteLeitura
        {
            get
            {
                return Permissao.Visualizar && !Permissao.Editar && !Permissao.Adicionar && !Permissao.Excluir;
            }
        }
    }
}