import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

const CATEGORIES = [
  'Environment',
  'Education',
  'Health',
  'Community',
  'Animal Welfare',
  'Arts & Culture',
  'Sports/Recreation',
  'Other',
]

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  let query = supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .order('date_start', { ascending: true })

  if (category) {
    query = query.eq('category_id', category)
  }

  const { data: listings, error } = await query

  if (error) {
    return <div className="p-8 text-red-500">Error loading listings: {error.message}</div>
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Volunteer & Event Hub</h1>
      <Link href="/submit" className="text-sm underline text-zinc-400 hover:text-white">
  + Submit a listing
</Link>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/"
          className={`text-sm px-3 py-1 rounded-full border ${
            !category
              ? 'bg-white text-black border-white'
              : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => {
          const slug = cat.toLowerCase().replace(/\s+/g, '-').replace('&', '')
          return (
            <Link
              key={cat}
              href={`/?category=${slug}`}
              className={`text-sm px-3 py-1 rounded-full border ${
                category === slug
                  ? 'bg-white text-black border-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              {cat}
            </Link>
          )
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {listings?.map((listing) => (
          <div
            key={listing.id}
            className="border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition"
          >
            <span className="inline-block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              {listing.category_id} · {listing.type}
            </span>
            <h2 className="text-lg font-semibold mb-1">{listing.title}</h2>
            <p className="text-sm text-zinc-400 mb-3">{listing.description}</p>
            <p className="text-xs text-zinc-500">
              {new Date(listing.date_start).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {listing.interest_count} interested
            </p>
          </div>
        ))}
        {listings?.length === 0 && (
          <p className="text-zinc-500 col-span-2">No listings found in this category.</p>
        )}
      </div>
    </main>
  )
}