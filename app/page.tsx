import { supabase } from '@/lib/supabaseClient'

export default async function Home() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')

  if (error) {
    return <div>Error loading listings: {error.message}</div>
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Volunteer & Event Hub</h1>
      {listings?.map((listing) => (
        <div key={listing.id} style={{ marginBottom: '1rem' }}>
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
        </div>
      ))}
    </main>
  )
}