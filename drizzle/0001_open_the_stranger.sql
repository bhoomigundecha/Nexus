ALTER TABLE "courseList" RENAME TO "courselist";--> statement-breakpoint
ALTER TABLE "chapters" RENAME COLUMN "chapterId" TO "chapterid";--> statement-breakpoint
ALTER TABLE "chapters" RENAME COLUMN "videoId" TO "videoid";--> statement-breakpoint
ALTER TABLE "courselist" RENAME COLUMN "courseId" TO "courseid";--> statement-breakpoint
ALTER TABLE "courselist" RENAME COLUMN "includeVideo" TO "includevideo";--> statement-breakpoint
ALTER TABLE "courselist" RENAME COLUMN "courseOutput" TO "courseoutput";--> statement-breakpoint
ALTER TABLE "courselist" RENAME COLUMN "createdBy" TO "createdby";--> statement-breakpoint
ALTER TABLE "courselist" RENAME COLUMN "userProfileImage" TO "userprofileimage";--> statement-breakpoint
ALTER TABLE "courselist" RENAME COLUMN "courseBanner" TO "coursebanner";