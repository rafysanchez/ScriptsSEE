namespace PrestacaoContas.Seguranca
{
    public class Permissoes
    {
        public bool Visualizar { get; set; }
        public bool Adicionar { get; set; }
        public bool Editar { get; set; }
        public bool Excluir { get; set; }

        
        public bool PermissaoSomenteLeitura
        {
            get
            {
                bool somenteLeitura = true;

                if (Adicionar && Editar && Excluir && Visualizar)
                {
                    somenteLeitura = false;
                }

                return somenteLeitura;
            }
        }
    }
}