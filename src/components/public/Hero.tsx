import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto w-full">
      <div className="w-2/4 pt-[90px]">
        <h1 className="text-[60px] font-semibold">
          Preserve Your Precious Moments, Effortlessly.
        </h1>
        <p className="w-[700px] tracking-wider font-Poppins text-[24px] font-light leading-[39px] pt-[19px]">
          Store your memories, feelings, and milestones in one secure place.
          Organize your <b className="font-bold">thoughts</b>,{" "}
          <b className="font-bold">photos</b>, and experiences and relive them
          whenever you want.
        </p>
        <div className="pt-[24px]">
          <Link
            href="/accounts/login"
            className="bg-black px-4 py-3 text-[20px] text-white rounded-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
