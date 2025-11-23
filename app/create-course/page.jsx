"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import LoadingDialog from "./_components/LoadingDialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { saveCourseLayoutInDb, generateCourseLayoutAction } from "./action";

const CreateCourse = () => {
  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 /> },
    { id: 2, name: "Topic & Desc", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userCourseInput } = useContext(UserInputContext);
  const { user } = useUser();
  const router = useRouter();

  const checkStatus = () => {
    if (!userCourseInput) return true;

    if (activeIndex === 0 && !userCourseInput.category) return true;
    if (activeIndex === 1 && !userCourseInput.topic) return true;

    if (
      activeIndex === 2 &&
      (!userCourseInput.level ||
        !userCourseInput.duration ||
        userCourseInput.displayVideo === undefined ||
        !userCourseInput.noOfChapters)
    )
      return true;

    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    try {
      // Call server action instead of client-side AI
      const result = await generateCourseLayoutAction(userCourseInput);

      if (!result.success) {
        setLoading(false);
        alert("Failed to generate course layout: " + result.error);
        return;
      }

      SaveCourseLayoutInDb(result.data);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Failed to generate course layout");
    }
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    const id = uuidv4();
    setLoading(true);

    try {
      const courseData = {
        courseId: id,
        name: userCourseInput.topic,
        level: userCourseInput.level,
        category: userCourseInput.category,
        displayVideo: userCourseInput.displayVideo,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl,
      };

      const result = await saveCourseLayoutInDb(courseData);

      setLoading(false);

      if (result.success) {
        // Navigate to the course detail page (the existing /course/[courseId] route)
        router.replace("/course/" + id);
      } else {
        alert("Failed: " + result.error);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Unexpected error occurred");
    }
  };

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>

        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[10px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block text-sm">{item.name}</h2>
              </div>

              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full bg-gray-300 ${
                    activeIndex >= index && "bg-primary"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex === 0 && <SelectCategory />}
        {activeIndex === 1 && <TopicDescription />}
        {activeIndex === 2 && <SelectOption />}

        <div className="flex justify-between mt-10">
          <Button
            variant="outline"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>

          {activeIndex < 2 ? (
            <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          ) : (
            <Button disabled={checkStatus()} onClick={GenerateCourseLayout}>
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;