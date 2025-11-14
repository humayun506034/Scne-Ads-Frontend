/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Campaign,
  CampaignMeta,
} from "@/pages/UserDashboard/UserDashboardMetrics";
import {
  BarChart3,
  CircleCheck,
  Clock,
  MapPin,
  PauseCircle,
  PlayCircle,
  Users
} from "lucide-react";
import { SpendImpressionsChart } from "./ImpressionChart";

type Props = {
  meta: CampaignMeta;
  campaigns: Campaign[];
  viewType: "bundle" | "custom";
};

export default function AnalyticsSection({
  meta,
  campaigns,
  viewType,
}: Props) {
  const isBundleView = viewType === "bundle";

  

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });



  const statusMeta = {
    running: {
      label: "Running",
      chip: "bg-emerald-400/20 text-emerald-200 border border-emerald-400/30",
      icon: PlayCircle,
      iconWrap: "bg-emerald-400/10 text-emerald-200",
    },
    pending: {
      label: "Pending",
      chip: "bg-amber-400/20 text-amber-200 border border-amber-400/30",
      icon: Clock,
      iconWrap: "bg-amber-400/10 text-amber-200",
    },
    completed: {
      label: "Completed",
      chip: "bg-blue-400/20 text-blue-200 border border-blue-400/30",
      icon: CircleCheck,
      iconWrap: "bg-blue-400/10 text-blue-200",
    },
    paused: {
      label: "Paused",
      chip: "bg-rose-400/20 text-rose-200 border border-rose-400/30",
      icon: PauseCircle,
      iconWrap: "bg-rose-400/10 text-rose-200",
    },
  } as const;

  const formatDate = (value?: string) => {
    if (!value) return "Schedule TBD";
    try {
      return new Date(value).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Schedule TBD";
    }
  };

  const formatSchedule = (start?: string, end?: string) => {
    if (!start && !end) return "Schedule TBD";
    if (!end) return `From ${formatDate(start)}`;
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const formatAmount = (amount: number) => currencyFormatter.format(amount ?? 0);

  const screenSectionTitle = isBundleView
    ? "Bundle Screen Playbook"
    : "Custom Screen Lineup";
  const screenSectionSubtitle = isBundleView
    ? "Bundle programs list every screen packaged inside the curated offer."
    : "Custom deployments highlight bespoke screens plus brand stakeholders.";

  return (
    <div className="mt-12 w-full space-y-8 sm:space-y-10">
   

      <div className="flex flex-col xl:flex-row w-full gap-6">
        <div className="xl:w-[60%] bg-dashboard-card-bg/80 p-4 sm:p-6 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-[0_30px_70px_-30px_rgba(5,8,32,0.9)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0 pointer-events-none" />
          <SpendImpressionsChart meta={meta} />
        </div>

        <div className="xl:w-[40%] flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-[#050a1f]/90 via-[#081b35]/80 to-[#0a2c4c]/80 p-5 sm:p-6 text-white backdrop-blur-3xl shadow-[0_30px_70px_-30px_rgba(9,56,125,0.8)] relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="relative z-10 mb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-title-color">
                  {isBundleView ? "Bundle" : "Custom"} Screens
                </p>
                <h3 className="text-xl sm:text-2xl font-medium text-white">
                  {screenSectionTitle}
                </h3>
              </div>
              <div className="self-start sm:self-auto rounded-2xl bg-white/10 px-3 py-1.5 text-[11px] uppercase tracking-wide text-title-color">
                {campaigns.length} active
              </div>
            </div>
            <p className="text-sm text-gray-300">
              {screenSectionSubtitle}
            </p>
          </div>

          <div className="relative z-10 mt-4 p-2 space-y-4 max-h-none overflow-visible lg:max-h-[420px] lg:overflow-y-auto lg:pr-1">
            {campaigns.map((c) => {
              const amount =
                c?.CustomPayment?.[0]?.amount ??
                (c as any)?.payment?.amount ??
                0;
              const status =
                statusMeta[c.status as keyof typeof statusMeta] ??
                statusMeta.pending;
              const ScheduleIcon = status.icon;
              const primaryLabel = isBundleView
                ? c.bundle?.bundle_name ||
                  c.screens?.[0]?.screen_name ||
                  "Bundle Campaign"
                : `${c.customer?.first_name ?? ""} ${
                    c.customer?.last_name ?? ""
                  }`.trim() || c.screens?.[0]?.screen_name || "Custom Campaign";
              const secondaryLabel = isBundleView
                ? c.bundle?.duration || "Flexible duration"
                : formatSchedule(c.startDate, c.endDate);
              const headerAmount = isBundleView
                ? currencyFormatter.format(c.bundle?.price ?? 0)
                : formatAmount(amount);
              const screenGroups = isBundleView
                ? c.bundle?.screens?.length
                  ? c.bundle?.screens
                  : c.screens
                : c.screens;
              const resolvedScreens = screenGroups ?? [];

              return (
                <div
                  key={c.id}
                  className="relative group rounded-2xl border border-white/10 bg-dashboard-card-bg/80 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_20px_50px_-25px_rgba(8,24,68,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-white/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
                  <div className="relative z-10 flex flex-col md:flex-row  items-start gap-4">
                    <div
                      className={`rounded-2xl  hidden  md:block p-3 border border-white/10 ${status.iconWrap}`}
                    >
                      <ScheduleIcon className="h-5 w-5   " strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-white">
                            {primaryLabel}
                          </p>
                          <p className="mt-1 text-xs sm:text-sm text-gray-300">
                            {secondaryLabel}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <span
                            className={`px-3 py-1 text-[11px] rounded-full capitalize font-medium ${status.chip}`}
                          >
                            {status.label}
                          </span>
                          <p className="text-xs mt-4 sm:text-sm font-semibold text-white">
                            {headerAmount}
                          </p>
                        </div>
                      </div>

                      {!isBundleView && (
                        <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400">
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-sky-300" />
                            {c.customer?.email ?? "No contact"}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <BarChart3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-300" />
                            {formatAmount(amount)} media spend
                          </span>
                        </div>
                      )}

                      <div className="space-y-3 border-t border-white/10 pt-3">
                        {resolvedScreens.map((screen) => (
                          <div
                            key={screen.id}
                            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 rounded-2xl border border-white/5 bg-white/5 px-3 py-3 sm:px-4"
                          >
                            <div>
                              <p className="text-sm sm:text-base font-medium text-white">
                                {screen.screen_name}
                              </p>
                              <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-300">
                                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-300" />
                                {screen.location || "Location TBD"}
                              </p>
                              <p className="text-[11px] sm:text-xs text-gray-400 mt-1">
                                {screen.screen_size} | {screen.resolution}
                              </p>
                            </div>
                            <div className="text-left sm:text-right text-xs sm:text-sm text-gray-200">
                              <p className="font-semibold text-white">
                                {currencyFormatter.format(screen.price ?? 0)}
                              </p>
                              <p className="capitalize text-[11px] sm:text-xs mt-1">
                                {screen.availability || screen.status || "n/a"}
                              </p>
                            </div>
                          </div>
                        ))}

                        {resolvedScreens.length === 0 && (
                          <p className="text-sm text-gray-400">
                            No screen details available.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {campaigns.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-10">
                No active campaigns found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
