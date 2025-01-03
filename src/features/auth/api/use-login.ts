import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();


  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({json}) => {
      const response  = await client.api.auth.login["$post"]({json});
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      router.refresh();
    },
    onError: () => {
      toast.error("Login failed");
    },
  });
};