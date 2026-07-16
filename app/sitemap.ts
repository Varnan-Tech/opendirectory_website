import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://opendirectory.dev";
  let lastModified = new Date();

  try {
    const res = await fetch(
      "https://api.github.com/repos/Varnan-Tech/opendirectory/contents/skills",
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const skillsFolders = await res.json();
      if (Array.isArray(skillsFolders) && skillsFolders.length > 0) {
        lastModified = new Date();
      }
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
