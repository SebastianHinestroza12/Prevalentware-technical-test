/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."role" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "public"."role"("name");
