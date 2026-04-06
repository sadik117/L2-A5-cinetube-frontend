import { api } from "@/lib/axios";

export const createCheckoutSession = async (plan: "monthly" | "yearly") => {
  const res = await api.post("/payment/checkout", { plan });
  return res.data;  // url
};

export const getMySubscription = async () => {
  const res = await api.get("/payment/my-subscription");
//   console.log(res);
  return res.data;
};