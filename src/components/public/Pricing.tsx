import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals just getting started",
    features: ["Basic features", "1 user", "100 MB storage", "Email support"],
  },
  {
    name: "Basic",
    price: "$5",
    description: "For small teams or projects",
    features: [
      "All Free features",
      "5 users",
      "1 GB storage",
      "Priority email support",
      "API access",
    ],
  },
  {
    name: "Pro",
    price: "$15",
    description: "For businesses and larger teams",
    features: [
      "All Basic features",
      "Unlimited users",
      "10 GB storage",
      "24/7 phone & email support",
      "Advanced analytics",
      "Custom integrations",
    ],
  },
];

export default function PricingPlans() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="section flex justify-center items-center mb-8">
        <svg
          width="429"
          height="29"
          viewBox="0 0 429 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.44 27.28V29H0V27.28H8.6C6.46667 26.0267 4.78667 24.3333 3.56 22.2C2.36 20.04 1.76 17.6 1.76 14.88C1.76 10.7733 3.17333 7.33333 6 4.56C8.85333 1.78667 12.3333 0.399999 16.44 0.399999C21.0267 0.399999 24.8667 2.14667 27.96 5.64L24.08 10.04C22.1067 7.58666 19.6533 6.36 16.72 6.36C14.3733 6.36 12.36 7.13333 10.68 8.68C9.02667 10.2 8.2 12.2667 8.2 14.88C8.2 17.4667 8.98667 19.5467 10.56 21.12C12.1333 22.6933 14.04 23.48 16.28 23.48C19.3467 23.48 21.8533 22.2667 23.8 19.84L27.8 23.96C26.6267 25.32 25.3067 26.4267 23.84 27.28H29.44ZM59.9331 27.28V29H50.2531V18H39.1331V29H29.4531V27.28H32.8931V1.04H39.1331V12.72H50.2531V1.04H56.4931V27.28H59.9331ZM92.9619 27.28V29H59.9219V27.28H68.8419C66.6552 26.0267 64.9219 24.3067 63.6419 22.12C62.3885 19.9333 61.7619 17.5067 61.7619 14.84C61.7619 10.7333 63.1752 7.30667 66.0019 4.56C68.8285 1.78667 72.3085 0.399999 76.4419 0.399999C80.5752 0.399999 84.0552 1.78667 86.8819 4.56C89.7085 7.30667 91.1219 10.7333 91.1219 14.84C91.1219 17.5067 90.4819 19.9333 89.2019 22.12C87.9219 24.3067 86.2019 26.0267 84.0419 27.28H92.9619ZM84.7619 14.88C84.7619 12.3733 83.9619 10.24 82.3619 8.48C80.7619 6.72 78.7885 5.84 76.4419 5.84C74.1219 5.84 72.1619 6.72 70.5619 8.48C68.9619 10.24 68.1619 12.3733 68.1619 14.88C68.1619 17.36 68.9619 19.48 70.5619 21.24C72.1619 22.9733 74.1219 23.84 76.4419 23.84C78.7885 23.84 80.7619 22.9733 82.3619 21.24C83.9619 19.48 84.7619 17.36 84.7619 14.88ZM126.009 27.28V29H92.9688V27.28H101.889C99.7021 26.0267 97.9688 24.3067 96.6888 22.12C95.4354 19.9333 94.8088 17.5067 94.8088 14.84C94.8088 10.7333 96.2221 7.30667 99.0488 4.56C101.875 1.78667 105.355 0.399999 109.489 0.399999C113.622 0.399999 117.102 1.78667 119.929 4.56C122.755 7.30667 124.169 10.7333 124.169 14.84C124.169 17.5067 123.529 19.9333 122.249 22.12C120.969 24.3067 119.249 26.0267 117.089 27.28H126.009ZM117.809 14.88C117.809 12.3733 117.009 10.24 115.409 8.48C113.809 6.72 111.835 5.84 109.489 5.84C107.169 5.84 105.209 6.72 103.609 8.48C102.009 10.24 101.209 12.3733 101.209 14.88C101.209 17.36 102.009 19.48 103.609 21.24C105.209 22.9733 107.169 23.84 109.489 23.84C111.835 23.84 113.809 22.9733 115.409 21.24C117.009 19.48 117.809 17.36 117.809 14.88ZM151.536 27.28V29H126.016V27.28H131.456C129.989 26.5333 128.656 25.5733 127.456 24.4L131.176 19.84C134.189 22.48 136.976 23.8 139.536 23.8C140.682 23.8 141.576 23.56 142.216 23.08C142.882 22.5733 143.216 21.9067 143.216 21.08C143.216 20.2267 142.869 19.56 142.176 19.08C141.482 18.5733 140.109 18.0667 138.056 17.56C134.802 16.7867 132.416 15.7867 130.896 14.56C129.402 13.3067 128.656 11.36 128.656 8.72C128.656 6.05333 129.602 4 131.496 2.56C133.416 1.12 135.802 0.399999 138.656 0.399999C140.522 0.399999 142.389 0.719999 144.256 1.36C146.122 2 147.749 2.90666 149.136 4.08L145.976 8.64C143.549 6.8 141.042 5.88 138.456 5.88C137.416 5.88 136.589 6.13333 135.976 6.64C135.389 7.12 135.096 7.77333 135.096 8.6C135.096 9.4 135.456 10.04 136.176 10.52C136.922 11 138.616 11.5733 141.256 12.24C143.922 12.88 145.989 13.8533 147.456 15.16C148.922 16.4667 149.656 18.28 149.656 20.6C149.656 23.48 148.576 25.7067 146.416 27.28H151.536ZM154.963 27.28V1.04H175.123V6.6H161.203V12.36H173.723V17.68H161.203V23.48H175.563V27.28H179.443V29H151.083V27.28H154.963ZM188.255 27.28V29H177.695V27.28H188.255ZM212.962 27.28V29H188.242V27.28H197.482V17.96L187.802 1.04H194.562L200.602 11.44L206.642 1.04H213.402L203.722 17.96V27.28H212.962ZM246.009 27.28V29H212.969V27.28H221.889C219.702 26.0267 217.969 24.3067 216.689 22.12C215.435 19.9333 214.809 17.5067 214.809 14.84C214.809 10.7333 216.222 7.30667 219.049 4.56C221.875 1.78667 225.355 0.399999 229.489 0.399999C233.622 0.399999 237.102 1.78667 239.929 4.56C242.755 7.30667 244.169 10.7333 244.169 14.84C244.169 17.5067 243.529 19.9333 242.249 22.12C240.969 24.3067 239.249 26.0267 237.089 27.28H246.009ZM237.809 14.88C237.809 12.3733 237.009 10.24 235.409 8.48C233.809 6.72 231.835 5.84 229.489 5.84C227.169 5.84 225.209 6.72 223.609 8.48C222.009 10.24 221.209 12.3733 221.209 14.88C221.209 17.36 222.009 19.48 223.609 21.24C225.209 22.9733 227.169 23.84 229.489 23.84C231.835 23.84 233.809 22.9733 235.409 21.24C237.009 19.48 237.809 17.36 237.809 14.88ZM276.056 27.28V29H246.016V27.28H253.976C250.696 25.0933 249.056 21.56 249.056 16.68V1.04H255.296V16.48C255.296 18.72 255.816 20.4933 256.856 21.8C257.896 23.08 259.296 23.72 261.056 23.72C262.816 23.72 264.202 23.08 265.216 21.8C266.256 20.4933 266.776 18.72 266.776 16.48V1.04H273.016V16.68C273.016 21.56 271.389 25.0933 268.136 27.28H276.056ZM279.495 27.28V1.04H290.095C294.441 1.04 297.535 1.77333 299.375 3.24C301.241 4.70666 302.175 7.06667 302.175 10.32C302.175 14.8 300.401 17.6933 296.855 19L302.695 27.28H306.455V29H296.255L290.055 20.08H285.735V29H275.615V27.28H279.495ZM290.295 14.68C292.428 14.68 293.881 14.3333 294.655 13.64C295.428 12.9467 295.815 11.8533 295.815 10.36C295.815 8.84 295.415 7.8 294.615 7.24C293.815 6.68 292.415 6.4 290.415 6.4H285.735V14.68H290.295ZM315.677 27.28V29H305.117V27.28H315.677ZM342.744 27.28V29H315.224V27.28H319.104V1.04H328.984C333.277 1.04 336.397 1.88 338.344 3.56C340.317 5.21333 341.304 7.77333 341.304 11.24C341.304 14.68 340.291 17.2 338.264 18.8C336.264 20.4 333.197 21.2 329.064 21.2H325.344V27.28H342.744ZM329.544 15.8C331.624 15.8 333.037 15.3867 333.784 14.56C334.531 13.7067 334.904 12.48 334.904 10.88C334.904 9.25333 334.411 8.10667 333.424 7.44C332.464 6.74667 330.957 6.4 328.904 6.4H325.344V15.8H329.544ZM368.214 27.28V29H342.294V27.28H346.174V1.04H352.414V23.44H364.334V27.28H368.214ZM399.349 27.28V29H388.829L386.229 22.96H374.509L371.909 29H361.389V27.28H365.989L377.349 1.04H383.389L394.709 27.28H399.349ZM380.389 9.36L376.869 17.48H383.869L380.389 9.36ZM398.713 27.28V1.04H404.553L418.273 19.04V1.04H424.513V27.28H428.393V29H418.273L404.953 11.48V29H394.833V27.28H398.713Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-between">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">
                {plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {plan.name === "Free" ? "Get Started" : "Subscribe"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}