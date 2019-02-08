using PrestacaoContas.Dominio;
using System;
using System.Web.Mvc;

namespace PrestacaoContas.Seguranca
{
    //[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    //public class PermissaoDiretoria : ActionFilterAttribute
    //{
    //    public override void OnActionExecuting(ActionExecutingContext filterContext)
    //    {
    //        try
    //        {
    //            if (!new UsuarioSistema()._usuarioLogado.NomePerfil.Equals(EPerfilUsuarioLogado.Diretoria.ObterDescricao().ToUpper()))
    //            {
    //                filterContext.Result = new RedirectResult("~/Erro/Erro");
    //            }
    //        }
    //        catch (Exception)
    //        {
    //            filterContext.Result = new RedirectResult("~/Erro/Erro");
    //        }

    //        base.OnActionExecuting(filterContext);
    //    }
    //}
}