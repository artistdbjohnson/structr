import Link from "next/link";

export default function NotFound() {
  return (
    <main className="session-boot">
      <div className="empty-card">
        <h1>Page not found</h1>
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
