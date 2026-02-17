export type SlugParams = Promise<{ slug: string }>;

export type BannerContentProps = {
  analytics: boolean;
  setAnalytics: (value: boolean) => void;
  telemetry: boolean;
  setTelemetry: (value: boolean) => void;
};

export interface NavLink {
  id: number,
  name: string,
  path: string
}
