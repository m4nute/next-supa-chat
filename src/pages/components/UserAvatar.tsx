import * as Avatar from "@radix-ui/react-avatar"

export default function UserAvatar({ avatarUrl, email }: { avatarUrl: string; email: string }) {
  return (
    <div className="flex flex-col justify-center">
      <Avatar.Root className="h-[2.5rem] w-[2.5rem] select-none items-center overflow-hidden rounded-full align-middle">
        <Avatar.Image className="h-full w-full rounded-[inherit] object-cover" src={avatarUrl} alt="Profile Picture" />
        <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-white text-[15px] text-black">{email.slice(0, 2)}</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
