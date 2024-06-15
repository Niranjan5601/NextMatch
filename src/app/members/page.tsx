import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likesAction";

import PaginationComponent from "@/components/PaginationComponent";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: GetMemberParams;
}) {
  const {items:members,totaltCount} = await getMembers(searchParams);
  const likeIds = await fetchCurrentUserLikeIds();
  return (
    <>
      {!members || members.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            {members &&
              members.map((member) => (
                <MemberCard member={member} likeIds={likeIds} key={member.id} />
              ))}
          </div>
          <PaginationComponent totalCount={totaltCount}/>
        </>
      )}
    </>
  );
}
