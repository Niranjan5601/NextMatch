import { Prisma } from "@prisma/client";
import { ZodIssue } from "zod";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId?: string;
  senderName?:string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    created: true;
    dateRead: true;
    sender: {
      select: { userId; name; image };
    };
    recipient: {
      select: { userId; name; image };
    };
  };
}>;


type UserFilters = {
  ageRange : number[],
  orderBy: string,
  gender: string [],
  withPhoto:boolean
}

type PaginParams = {
  pageNumber : number,
  pageSize: number
}

type PaginResult = {
  totalPages: number,
  totalCount: number
} & PaginParams

type PaginatedResponse<T> = {
  items: T[]
  totaltCount : number
}

type GetMemberParams = {
  ageRange?:string;
  gender?:string;
  pageNumber?:string;
  pageSize?: string;
  orderBy?:string
  withPhoto?:string
}
