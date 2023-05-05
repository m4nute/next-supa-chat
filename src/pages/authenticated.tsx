import Link from "next/link"

export default function authenticated() {
  return (
    <div>
      <h1>Successfully logged In!</h1>
      <Link href="/" className="w-12 px-3 py-2">
        Start Chatting
      </Link>
    </div>
  )
}
