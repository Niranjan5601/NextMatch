import { useCallback, useEffect, useRef } from "react";
import usePresenceStore from "./usePresenceStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";
import { updateLastActive } from "@/app/actions/memberActions";


export const usePresenceChannel = () => {
  const { set, add, remove } = usePresenceStore((state) => ({
    set: state.set,
    add: state.add,
    remove: state.remove,
  }));
  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (membersIds: string[]) => {
      set(membersIds);
    },
    [set]
  );

  const handleAddMembers = useCallback(
    (membersId: string) => {
      add(membersId);
    },
    [add]
  );

  const handleRemoveMembers = useCallback(
    (membersId: string) => {
      remove(membersId);
    },
    [remove]
  );

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-nm");
      
      channelRef.current.bind("pusher:subscription_succeeded",async (members: Members) => {
        handleSetMembers(Object.keys(members.members));
        await updateLastActive();
      });

      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, any>) => {
          handleAddMembers(member.id);
        }
      );
      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, any>) => {
          handleRemoveMembers(member.id);
        }
      );
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          "pusher:subscription_succeeded",
          handleSetMembers
        );
        channelRef.current.unbind("pusher:member_added", handleAddMembers);
        channelRef.current.unbind("pusher:member_removed", handleRemoveMembers);
      }
    };
  }, [handleSetMembers, handleAddMembers, handleRemoveMembers]);
};
