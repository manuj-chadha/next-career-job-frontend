import API from "./axios";
import { JOB_API_END_POINT } from "./constant";

/**
 * @param {object} opts
 * @param {number} [opts.pageParam=0]
 * @param {string} [opts.keyword]
 * @param {string} [opts.location]
 * @param {string} [opts.industry] — matches job title (same as FilterCard "Industry")
 * @param {string} [opts.salaryBand] — e.g. "3-6 LPA"
 * @param {number} [opts.size=12]
 */
export async function fetchJobs({
  pageParam = 0,
  keyword = "",
  location = "",
  industry = "",
  salaryBand = "",
  size = 12,
} = {}) {
  const params = new URLSearchParams();
  params.set("page", String(pageParam));
  params.set("size", String(size));
  if (keyword) params.set("keyword", keyword);
  if (location) params.set("location", location);
  if (industry) params.set("industry", industry);
  if (salaryBand) params.set("salaryBand", salaryBand);

  const res = await API.get(`${JOB_API_END_POINT}/get?${params.toString()}`, {
    withCredentials: true,
  });

  if (res.status !== 200 || !res.data) {
    throw new Error(res.data?.message || "Failed to fetch jobs");
  }
  return res.data;
}
