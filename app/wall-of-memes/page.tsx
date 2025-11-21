import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function WallOfMemesPage() {
  const memes = await prisma.meme.findMany({
    orderBy: { created_at: 'desc' },
    take: 100,
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="text-center space-y-3">
          <p className="text-xs uppercase tracking-widest text-purple-400">Hall of Fame</p>
          <h1 className="text-4xl md:text-5xl font-black">The Wall of Memes</h1>
          <p className="text-gray-400">
            These masterpieces were crafted in the Morbius Meme Generator. Want to see yours here?{' '}
            <a href="/meme-generator" className="underline text-purple-300">
              Create a meme
            </a>
            .
          </p>
        </header>

        {memes.length === 0 ? (
          <p className="text-center text-gray-500">No memes yet. Be the first to bless the wall.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memes.map((meme) => (
              <article
                key={meme.id}
                className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-black">
                  <Image
                    src={meme.image_url}
                    alt={meme.title || 'Meme'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <p className="font-semibold text-white">{meme.title || 'Untitled'}</p>
                  <p className="text-xs text-gray-400">
                    by {meme.creator_name || 'Anonymous'} · {meme.created_at.toLocaleString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
