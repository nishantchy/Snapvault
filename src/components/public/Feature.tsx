import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Cloud, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutProduct() {
  return (
    <section className="section">
      <div className="container mx-auto w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center">
            <svg
              width="638"
              height="29"
              viewBox="0 0 638 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.72 27.28V29H1V27.28H10.24V17.96L0.56 1.04H7.32L13.36 11.44L19.4 1.04H26.16L16.48 17.96V27.28H25.72ZM58.7666 27.28V29H25.7266V27.28H34.6466C32.4599 26.0267 30.7266 24.3067 29.4466 22.12C28.1932 19.9333 27.5666 17.5067 27.5666 14.84C27.5666 10.7333 28.9799 7.30667 31.8066 4.56C34.6332 1.78667 38.1132 0.399999 42.2466 0.399999C46.3799 0.399999 49.8599 1.78667 52.6866 4.56C55.5132 7.30667 56.9266 10.7333 56.9266 14.84C56.9266 17.5067 56.2866 19.9333 55.0066 22.12C53.7266 24.3067 52.0066 26.0267 49.8466 27.28H58.7666ZM50.5666 14.88C50.5666 12.3733 49.7666 10.24 48.1666 8.48C46.5666 6.72 44.5932 5.84 42.2466 5.84C39.9266 5.84 37.9666 6.72 36.3666 8.48C34.7666 10.24 33.9666 12.3733 33.9666 14.88C33.9666 17.36 34.7666 19.48 36.3666 21.24C37.9666 22.9733 39.9266 23.84 42.2466 23.84C44.5932 23.84 46.5666 22.9733 48.1666 21.24C49.7666 19.48 50.5666 17.36 50.5666 14.88ZM88.8134 27.28V29H58.7734V27.28H66.7334C63.4534 25.0933 61.8134 21.56 61.8134 16.68V1.04H68.0534V16.48C68.0534 18.72 68.5734 20.4933 69.6134 21.8C70.6534 23.08 72.0534 23.72 73.8134 23.72C75.5734 23.72 76.9601 23.08 77.9734 21.8C79.0134 20.4933 79.5334 18.72 79.5334 16.48V1.04H85.7734V16.68C85.7734 21.56 84.1468 25.0933 80.8934 27.28H88.8134ZM92.2525 27.28V1.04H102.853C107.199 1.04 110.293 1.77333 112.133 3.24C113.999 4.70666 114.933 7.06667 114.933 10.32C114.933 14.8 113.159 17.6933 109.613 19L115.453 27.28H119.213V29H109.012L102.813 20.08H98.4925V29H88.3725V27.28H92.2525ZM103.053 14.68C105.186 14.68 106.639 14.3333 107.413 13.64C108.186 12.9467 108.573 11.8533 108.573 10.36C108.573 8.84 108.173 7.8 107.373 7.24C106.573 6.68 105.173 6.4 103.173 6.4H98.4925V14.68H103.053ZM128.435 27.28V29H117.875V27.28H128.435ZM159.702 27.28V29H127.982V27.28H131.862V1.04H141.742C146.729 1.04 150.555 2.26666 153.222 4.72C155.889 7.14667 157.222 10.5733 157.222 15C157.222 20.9733 154.902 25.0667 150.262 27.28H159.702ZM142.062 23.48C144.915 23.48 147.102 22.76 148.622 21.32C150.169 19.88 150.942 17.7867 150.942 15.04C150.942 12.2933 150.169 10.1867 148.622 8.72C147.102 7.22667 144.755 6.48 141.582 6.48H138.102V23.48H142.062ZM172.831 27.28V29H159.711V27.28H163.151V1.04H169.391V27.28H172.831ZM202.836 27.28V29H172.836V27.28H181.516C179.383 26.0267 177.703 24.3333 176.476 22.2C175.276 20.04 174.676 17.6 174.676 14.88C174.676 10.7733 176.089 7.33333 178.916 4.56C181.769 1.78667 185.196 0.399999 189.196 0.399999C193.223 0.399999 196.716 1.72 199.676 4.36L196.436 9.04C195.183 7.94667 194.023 7.2 192.956 6.8C191.916 6.37333 190.783 6.16 189.556 6.16C187.183 6.16 185.183 6.97333 183.556 8.6C181.929 10.2 181.116 12.32 181.116 14.96C181.116 17.6 181.889 19.72 183.436 21.32C185.009 22.8933 186.876 23.68 189.036 23.68C191.196 23.68 192.996 23.2667 194.436 22.44V14.76H200.716V24.68C199.809 25.6933 198.729 26.56 197.476 27.28H202.836ZM215.956 27.28V29H202.836V27.28H206.276V1.04H212.516V27.28H215.956ZM240.281 27.28V29H215.961V27.28H225.001V6.44H217.081V1.04H239.161V6.44H231.241V27.28H240.281ZM274.177 27.28V29H263.657L261.057 22.96H249.337L246.737 29H236.217V27.28H240.817L252.177 1.04H258.217L269.537 27.28H274.177ZM255.217 9.36L251.697 17.48H258.697L255.217 9.36ZM295.582 27.28V29H269.662V27.28H273.542V1.04H279.782V23.44H291.702V27.28H295.582ZM303.396 27.28V29H292.836V27.28H303.396ZM331.863 11.4L324.303 26.68H320.583L313.063 11.4V29H302.943V27.28H306.823V1.04H315.263L322.463 16.4L329.703 1.04H338.103V27.28H341.983V29H331.863V11.4ZM344.987 27.28V1.04H365.147V6.6H351.227V12.36H363.747V17.68H351.227V23.48H365.587V27.28H369.467V29H341.107V27.28H344.987ZM396.199 11.4L388.639 26.68H384.919L377.399 11.4V29H367.279V27.28H371.159V1.04H379.599L386.799 16.4L394.039 1.04H402.439V27.28H406.319V29H396.199V11.4ZM438.923 27.28V29H405.883V27.28H414.803C412.616 26.0267 410.883 24.3067 409.603 22.12C408.349 19.9333 407.723 17.5067 407.723 14.84C407.723 10.7333 409.136 7.30667 411.963 4.56C414.789 1.78667 418.269 0.399999 422.403 0.399999C426.536 0.399999 430.016 1.78667 432.843 4.56C435.669 7.30667 437.083 10.7333 437.083 14.84C437.083 17.5067 436.443 19.9333 435.163 22.12C433.883 24.3067 432.163 26.0267 430.003 27.28H438.923ZM430.723 14.88C430.723 12.3733 429.923 10.24 428.323 8.48C426.723 6.72 424.749 5.84 422.403 5.84C420.083 5.84 418.123 6.72 416.523 8.48C414.923 10.24 414.123 12.3733 414.123 14.88C414.123 17.36 414.923 19.48 416.523 21.24C418.123 22.9733 420.083 23.84 422.403 23.84C424.749 23.84 426.723 22.9733 428.323 21.24C429.923 19.48 430.723 17.36 430.723 14.88ZM442.37 27.28V1.04H452.97C457.316 1.04 460.41 1.77333 462.25 3.24C464.116 4.70666 465.05 7.06667 465.05 10.32C465.05 14.8 463.276 17.6933 459.73 19L465.57 27.28H469.33V29H459.13L452.93 20.08H448.61V29H438.49V27.28H442.37ZM453.17 14.68C455.303 14.68 456.756 14.3333 457.53 13.64C458.303 12.9467 458.69 11.8533 458.69 10.36C458.69 8.84 458.29 7.8 457.49 7.24C456.69 6.68 455.29 6.4 453.29 6.4H448.61V14.68H453.17ZM492.712 27.28V29H467.992V27.28H477.232V17.96L467.552 1.04H474.312L480.352 11.44L486.392 1.04H493.152L483.472 17.96V27.28H492.712ZM503.279 27.28V29H492.719V27.28H503.279ZM530.786 27.28V29H503.266V27.28H513.666L503.146 1.04H509.906L517.026 18.84L524.146 1.04H530.906L520.346 27.28H530.786ZM564.685 27.28V29H554.165L551.565 22.96H539.845L537.245 29H526.725V27.28H531.325L542.685 1.04H548.725L560.045 27.28H564.685ZM545.725 9.36L542.205 17.48H549.205L545.725 9.36ZM590.649 27.28V29H560.609V27.28H568.569C565.289 25.0933 563.649 21.56 563.649 16.68V1.04H569.889V16.48C569.889 18.72 570.409 20.4933 571.449 21.8C572.489 23.08 573.889 23.72 575.649 23.72C577.409 23.72 578.796 23.08 579.809 21.8C580.849 20.4933 581.369 18.72 581.369 16.48V1.04H587.609V16.68C587.609 21.56 585.983 25.0933 582.729 27.28H590.649ZM616.128 27.28V29H590.208V27.28H594.088V1.04H600.328V23.44H612.248V27.28H616.128ZM637.703 27.28V29H613.383V27.28H622.423V6.44H614.503V1.04H636.583V6.44H628.663V27.28H637.703Z"
                fill="black"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto gap-between">
            Store, organize, and access your memories with ease. Our Memory
            storing SaaS is your personal time capsule in the cloud.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Memory storing app interface"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  Smart Organization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our AI-powered system automatically categorizes and tags your
                  memories for easy retrieval.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cloud className="mr-2 h-5 w-5 text-primary" />
                  Unlimited Cloud Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Never worry about running out of space. Store all your
                  precious memories in one secure location.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  Bank-Level Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your memories are precious. We use state-of-the-art encryption
                  to keep them safe and private.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Lightning-Fast Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instantly access any memory from any device, anytime, anywhere
                  in the world.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/accounts/login"
            className="bg-black px-4 py-3 text-[20px] text-white rounded-lg font-semibold"
          >
            Start Storing Memories
          </Link>
        </div>
      </div>
    </section>
  );
}