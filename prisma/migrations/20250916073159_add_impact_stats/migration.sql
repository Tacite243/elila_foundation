-- CreateTable
CREATE TABLE "public"."ImpactStat" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImpactStat_pkey" PRIMARY KEY ("id")
);
