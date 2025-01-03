import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.regester["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.regester["$post"]>;

export const useRegester = () => {

  const router = useRouter();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({json}) => {
      const toastId = toast.loading("Registering...");
      const response  = await client.api.auth.regester["$post"]({json});
      toast.dismiss(toastId);
      return await response.json();
    },
    onSuccess: () => {
      toast.loading
      toast.success("Registered successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Register failed");
    },
  });
};