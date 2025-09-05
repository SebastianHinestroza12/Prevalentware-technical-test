/*
  Warnings:

  - The primary key for the `permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `permission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `role` table. All the data in the column will be lost.
  - The `id` column on the `role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `role_permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `role_permission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roleId` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `roleId` on the `role_permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `permissionId` on the `role_permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."role_permission" DROP CONSTRAINT "role_permission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permission" DROP CONSTRAINT "role_permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_roleId_fkey";

-- DropIndex
DROP INDEX "public"."role_name_key";

-- AlterTable
ALTER TABLE "public"."permission" DROP CONSTRAINT "permission_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "permission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."role" DROP CONSTRAINT "role_pkey",
DROP COLUMN "name",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."role_permission" DROP CONSTRAINT "role_permission_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER NOT NULL,
DROP COLUMN "permissionId",
ADD COLUMN     "permissionId" INTEGER NOT NULL,
ADD CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "role_permission_roleId_permissionId_key" ON "public"."role_permission"("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
