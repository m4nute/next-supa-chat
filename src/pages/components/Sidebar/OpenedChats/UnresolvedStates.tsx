import BeatLoader from "react-spinners/BeatLoader"

export default function UnresolvedStates({ isLoading }: { isLoading: boolean }) {
  return <h2 className="text-center">{isLoading ? <BeatLoader loading={true} size={10} color="#d2d2d2" /> : "No Chats Found :c"}</h2>
}
