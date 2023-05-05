import * as Avatar from "@radix-ui/react-avatar";

export default function ChatTopbar({ receiver }: { receiver: any }) {
  return (
    <div className="flex h-16 w-full border-b  border-gray-700 bg-[#262930] px-4">
      <div className="flex flex-col justify-center">
        <Avatar.Root className="h-[2.5rem] w-[2.5rem] select-none items-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={receiver?.avatar_url}
            alt="Profile Picture"
          />
          <Avatar.Fallback className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-black">
            {receiver?.email?.slice(0, 2)}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
      <h1 className="ml-2 flex flex-col justify-center">{receiver.email}</h1>
    </div>
  );
}
