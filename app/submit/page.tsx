import { supabase } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'

const CATEGORIES = [
  'environment',
  'education',
  'health',
  'community',
  'animal-welfare',
  'arts-culture',
  'sports-recreation',
  'other',
]

async function createListing(formData: FormData) {
  'use server'

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const date_start = formData.get('date_start') as string
  const date_end = formData.get('date_end') as string
  const category_id = formData.get('category_id') as string

  const { error } = await supabase.from('listings').insert({
    title,
    description,
    type,
    date_start,
    date_end,
    category_id,
    status: 'pending',
    interest_count: 0,
  })

  if (error) {
    console.error(error)
    return
  }

  redirect('/submit/success')
}

export default function SubmitPage() {
  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Submit a Listing</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Your listing will be reviewed before it appears publicly.
      </p>

      <form action={createListing} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            name="title"
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Type</label>
          <select
            name="type"
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
          >
            <option value="volunteer">Volunteer opportunity</option>
            <option value="event">Event</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            name="category_id"
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Start date/time</label>
            <input
              type="datetime-local"
              name="date_start"
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End date/time</label>
            <input
              type="datetime-local"
              name="date_end"
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-zinc-200"
        >
          Submit for review
        </button>
      </form>
    </main>
  )
}