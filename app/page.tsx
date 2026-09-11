import { supabase } from '@/lib/supabaseClient'

export default async function Home() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .order('date_start', { ascending: true })

  if (error) {
    return <div className="p-8 text-red-500">Error loading listings: {error.message}</div>
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Volunteer & Event Hub</h1>

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
      </div>
    </main>
  )
}