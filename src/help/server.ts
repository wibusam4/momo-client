import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const server =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    return await func(ctx);
  };
