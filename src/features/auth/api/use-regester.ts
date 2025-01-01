import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.regester["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.regester["$post"]>;

export const useRegester = () => {

  const router = useRouter();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({json}) => {
      const response  = await client.api.auth.regester["$post"]({json});
      return await response.json();
    },
    onSuccess: (data) => {
      router.refresh();
    },
  });
};