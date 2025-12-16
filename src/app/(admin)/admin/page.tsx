import React from 'react';
import prisma from "@/lib/prisma";
import AdminDashboardView from '@/components/AdminDashboardView';
import { getIdentificationStats } from "@/lib/googleSheets";


// --- FONCTION DE CHARGEMENT DES DONNÉES ---
async function getDashboardData() {
  const start = Date.now();
  let isOnline = false;
  let latency = 0;

  // 1. Test BDD
  try {
    await prisma.$queryRaw`SELECT 1`;
    isOnline = true;
    latency = Date.now() - start;
  } catch (error) {
    console.error("DB Health Check Failed:", error);
    isOnline = false;
  }

  // 2. Récupération de TOUTES les données en parallèle
  const [
    articlesCount,
    projectsCount,
    eventsCount,
    usersCount,
    impactCount,
    recentArticles,
    identificationsStats
  ] = await Promise.all([
    prisma.article.count(),
    prisma.project.count(),
    prisma.upcomingEvent.count(),
    prisma.user.count(),
    prisma.impactStat.count(),
    prisma.article.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, createdAt: true, published: true }
    }),
    getIdentificationStats() // <--- APPEL DE LA FONCTION GOOGLE
  ]);

  return {
    counts: {
      articles: articlesCount,
      projects: projectsCount,
      events: eventsCount,
      users: usersCount,
      impact: impactCount
    },
    recentArticles,
    identifications: {
      total: identificationsStats.totalRespondents,
      distribution: identificationsStats.territoryDistribution
    },
    dbStatus: { isOnline, latency }
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();
  return <AdminDashboardView data={data} />;
}