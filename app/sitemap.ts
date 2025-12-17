import { MetadataRoute } from "next";
import { getAllTests } from "@/lib/test-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://simte.vercel.app";
  const tests = getAllTests();

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // 테스트 상세 페이지
  const testPages: MetadataRoute.Sitemap = tests.map((test) => ({
    url: `${baseUrl}/test/${test.id}`,
    lastModified: new Date(test.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...testPages];
}
