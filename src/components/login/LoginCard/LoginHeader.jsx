import Typography from "@/components/ui/Typography";

export default function LoginHeader() {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 text-3xl font-bold text-white">
        P
      </div>

      <Typography
        as="h2"
        variant="h2"
        className="text-white"
      >
        سامانه مدیریت پروژه PMIS
      </Typography>

      <Typography className="mt-3 text-slate-300">
        برای ورود اطلاعات حساب کاربری خود را وارد کنید.
      </Typography>
    </div>
  );
}