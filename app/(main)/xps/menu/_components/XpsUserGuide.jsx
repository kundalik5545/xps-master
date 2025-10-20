import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const XpsUserGuide = ({ userGuideDetails }) => {
  console.log("user guides", userGuideDetails);
  return (
    <div className="grid grid-cols-2 gap-4 ">
      {userGuideDetails &&
        userGuideDetails.map((ug) => (
          <div className=" max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden mt-5">
            <a
              href="/xps-user-guide/sample.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="rounded-t-lg"
                src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">
                User Guide -{" "}
                <span className="text-red-500">{ug.chapterName || "N/A"}</span>
              </h3>
              <p className="text-gray-600 text-sm">
                Learn how to use the XPS Dashboard with our comprehensive user
                guide. Includes step-by-step instructions and best practices.
              </p>
            </div>{" "}
            <Link
              href={`/xps-user-guide/${ug.chapterName}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center pb-3"
            >
              <Button>
                {"Chapter No " + ug.chapterNo || "N/A"} <ArrowRight />
              </Button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default XpsUserGuide;
