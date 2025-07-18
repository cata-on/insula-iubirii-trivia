import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Pagina nu a fost găsită</h1>
      <p>Pagina pe care o cauți nu există.</p>
      <Link href="/ispite-feminine">Înapoi la pagina principală</Link>
    </div>
  );
}
