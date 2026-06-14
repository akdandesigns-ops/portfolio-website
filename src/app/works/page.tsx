import WorkIndex from "../../components/WorkIndex";
import { FinalCTA } from "@/components/FinalCTA";

export default function WorkPage() {
  return (
    <div className="w-full flex-1 flex flex-col pt-32 min-h-screen">
      <div className="px-6 md:px-12 max-w-[2000px] mx-auto w-full">
        <WorkIndex />
      </div>
      <FinalCTA />
    </div>
  );
}
