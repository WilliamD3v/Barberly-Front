import Link from "next/link";
import { parseCookies } from "nookies";

export default function Home() {
  const cookies = parseCookies();
  const id = cookies["nextauth.userId"];

  return (
    <div>
      <div className="flex justify-evenly">
        <Link href={`/dashboard/${id}`} className="bg-slate-800 text-white p-3">Pagina de Usuario</Link>
        <Link href="/login" className="bg-slate-800 text-white p-3">Login</Link>
        <Link href="/register" className="bg-slate-800 text-white p-3">Cadastro</Link>
      </div>

      <div className="relative flex justify-center top-24">
        <h1>Pagina Inicial</h1>
      </div>
    </div>
  );
}


/*   
 */