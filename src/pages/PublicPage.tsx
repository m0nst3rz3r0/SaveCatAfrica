import { useParams, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { usePageBySlug } from "../hooks/useSiteData";

export function PublicPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = usePageBySlug(slug);

  return (
    <div className="min-h-screen flex flex-col font-inter bg-canvas">
      <Header />
      <main className="flex-grow max-w-3xl mx-auto px-4 md:px-10 py-24 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-terracotta font-bold text-sm mb-8 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        {page === undefined && (
          <p className="text-muted">Loading...</p>
        )}
        {page === null && (
          <h1 className="text-3xl font-bold text-navy">Page not found</h1>
        )}
        {page && (
          <>
            <h1 className="text-4xl font-bold text-navy mb-8">{page.title}</h1>
            <div className="prose prose-lg text-muted whitespace-pre-wrap leading-relaxed">
              {page.body}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
