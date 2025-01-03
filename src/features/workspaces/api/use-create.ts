import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/client";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspaces.$post>;
type RequestType = InferRequestType<typeof client.api.workspaces.$post>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({form}) => {
      const response  = await client.api.workspaces.$post({form});
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace created");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};