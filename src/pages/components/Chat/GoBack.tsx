import { IconArrowBackUp } from "@tabler/icons-react"
import useStore from "~/zustand/globalState"

export default function GoBack() {
  const [setSelectedChat] = useStore((state) => [state.setSelectedChat])
  return (
    <button onClick={() => setSelectedChat(null)}>
      <IconArrowBackUp size={24} className="stroke-1 hover:opacity-80 hover:stroke-2" />
    </button>
  )
}
