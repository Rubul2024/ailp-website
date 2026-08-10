import { redirect } from "next/navigation";

export const metadata = {
  title: "Member Login | All India Labour Party",
};

export default function LoginPage() {
  redirect("/member/login");
}