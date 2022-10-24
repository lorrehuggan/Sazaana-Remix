import type {
  MetaFunction,
  LoaderFunction,
  TypedResponse,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sazaana",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({
  params,
  request,
  context,
}): Promise<TypedResponse<never>> => {
  return redirect("search");
};

export default function Index() {
  const data = useLoaderData();
  return (
    <>
      <p>{JSON.stringify(data)}...</p>
    </>
  );
}
