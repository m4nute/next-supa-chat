import * as Avatar from "@radix-ui/react-avatar"

export default function UserAvatar({ avatarUrl, email }: { avatarUrl: string | null | undefined; email: string | undefined }) {
  return (
    <div className="flex flex-col justify-center">
      <Avatar.Root className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 select-none items-center overflow-hidden rounded-full align-middle">
        <Avatar.Image className="h-full w-full rounded-[inherit] object-cover" src={avatarUrl ? avatarUrl : undefined} alt="Profile Picture" />
        <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-white text-sm md:text-base text-black">{email?.slice(0, 2)}</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
