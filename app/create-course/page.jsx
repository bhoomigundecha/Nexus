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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center pt-10 pb-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-3">
            Create Your Course
          </h2>
          <p className="text-gray-600 text-lg">Follow the steps below to generate your AI-powered course</p>
        </div>

        <div className="flex mt-6 bg-white px-8 py-6 rounded-2xl shadow-lg">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[10px] md:w-[120px]">
                <div
                  className={`p-4 rounded-full text-white transition-all duration-300 shadow-md ${
                    activeIndex >= index 
                      ? "bg-gradient-to-br from-blue-700 to-blue-500 scale-110" 
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <h2 className="hidden md:block text-sm font-medium mt-3 text-gray-700">{item.name}</h2>
              </div>

              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[150px] rounded-full mx-2 transition-all duration-300 ${
                    activeIndex > index ? "bg-gradient-to-r from-blue-700 to-blue-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-20 lg:px-44 pb-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {activeIndex === 0 && <SelectCategory />}
          {activeIndex === 1 && <TopicDescription />}
          {activeIndex === 2 && <SelectOption />}

          <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="px-8 py-3 text-base font-medium border-2 border-gray-300 hover:border-blue-700 hover:text-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </Button>

            {activeIndex < 2 ? (
              <Button 
                disabled={checkStatus()} 
                onClick={() => setActiveIndex(activeIndex + 1)}
                className="px-8 py-3 text-base font-medium bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </Button>
            ) : (
              <Button 
                disabled={checkStatus()} 
                onClick={GenerateCourseLayout}
                className="px-8 py-3 text-base font-medium bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✨ Generate Course
              </Button>
            )}
          </div>
        </div>
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;