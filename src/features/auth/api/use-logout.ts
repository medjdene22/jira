import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {

    const queryClient = useQueryClient();
    const router = useRouter();

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response  = await client.api.auth.logout.$post();

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Loged out");
      queryClient.invalidateQueries({ queryKey: ["current"] });

      router.refresh();
    },
    onError: () => {
      toast.error("Log out failed");
    },
  });
};