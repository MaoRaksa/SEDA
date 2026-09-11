import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">Thanks!</h1>
      <p className="text-zinc-400 mb-6">
        Your listing has been submitted and is pending review.
      </p>
      <Link href="/" className="underline text-sm">
        Back to feed
      </Link>
    </main>
  )
}