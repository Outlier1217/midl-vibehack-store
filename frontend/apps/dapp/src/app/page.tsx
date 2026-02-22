import Link from "next/link";
import { Buy } from "@/widgets/Buy";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-lg">
            Midl Store – Solidity on Bitcoin
          </CardTitle>

          <CardDescription className="space-y-2">
            <div>
              This dApp demonstrates a Solidity smart contract deployed on
              Bitcoin via Midl.
            </div>

            <div>
              Block explorer:{" "}
              <Link
                href="https://blockscout.staging.midl.xyz"
                className="text-blue-500 hover:text-blue-700"
              >
                blockscout.staging.midl.xyz
              </Link>
            </div>

            <div>
              Bitcoin Explorer:{" "}
              <Link
                href="https://mempool.staging.midl.xyz"
                className="text-blue-500 hover:text-blue-700"
              >
                mempool.staging.midl.xyz
              </Link>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Buy />
        </CardContent>
      </Card>
    </div>
  );
}