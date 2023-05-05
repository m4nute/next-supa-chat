import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function LogoutDialog() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-right">
          <IconLogout
            size={24}
            className="opacity-80 transition-colors hover:text-red-500"
          />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="fadeIn data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2c2c2c] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="m-0 text-[17px] font-medium text-white">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal text-white">
            You will Logout.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px]  items-center justify-center rounded-[4px] bg-[#1f1f1f] px-[15px] font-medium leading-none text-white outline-none transition-all hover:bg-[#4f4f4f] focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/auth");
                }}
                className="hover:bg-red5 focus:shadow-red7 inline-flex h-[35px]  items-center justify-center rounded-[4px] bg-[#1f1f1f] px-[15px] font-medium leading-none text-red-400 outline-none transition-all hover:bg-[#4f4f4f] focus:shadow-[0_0_0_2px]"
              >
                Log Out
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
