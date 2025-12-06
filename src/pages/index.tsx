import { AppSidebar } from '@/components/Sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useTheme } from 'next-themes';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { RadicalChart } from '@/shared/components/Charts/RadicalChart';
import { AreaChartComponent } from '@/shared/components/Charts/AreaChart';
import { PieChartComponent } from '@/shared/components/Charts/PieChart';
import { Filter } from '@/shared/components/Filter';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookCheck, Route, TrendingUp, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BarChartComponent } from '@/shared/components/Charts/BarChart';
import { LineChartComponent } from '@/shared/components/Charts/LineChart';
import { RadarChartMultiple } from '@/shared/components/Charts/RadarChartMultiple';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 pr-2 sm:pr-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-2 sm:px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm">Light</span>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={handleThemeToggle}
            />
            <span className="text-xs sm:text-sm">Dark</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 pt-0">
          <Filter />
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <>
                    <SkeletonCard className="aspect-square rounded-xl bg-muted/50 w-full" />
                    <SkeletonCard className="aspect-square rounded-xl bg-muted/50 w-full" />
                  </>
                ) : (
                  <>
                    <RadicalChart />
                    <PieChartComponent />
                  </>
                )}
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <SkeletonCard className="h-32 rounded-xl bg-muted/50" />
                    <SkeletonCard className="h-32 rounded-xl bg-muted/50" />
                    <SkeletonCard className="h-32 rounded-xl bg-muted/50" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <Card className="flex flex-col">
                      <CardContent className="flex flex-col gap-3 flex-1 items-start py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-md bg-primary/10">
                            <UsersRound className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <h3 className="text-sm sm:text-base font-medium">
                            New users
                          </h3>
                        </div>
                        <div className="flex items-end gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-3xl xl:text-4xl font-extrabold">
                            1000
                          </span>
                          <Badge className="flex items-center gap-1 bg-primary/10 text-primary text-xs">
                            +10%
                            <TrendingUp className="w-3 h-3" />
                          </Badge>
                        </div>
                        <p className="leading-none text-muted-foreground text-xs sm:text-sm">
                          Showing total visitors for the last 6 months
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="flex flex-col">
                      <CardContent className="flex flex-col gap-3 flex-1 items-start py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-md bg-primary/10">
                            <BookCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <h3 className="text-sm sm:text-base font-medium">
                            New book requests
                          </h3>
                        </div>
                        <div className="flex items-end gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-3xl xl:text-4xl font-extrabold">
                            25
                          </span>
                          <Badge className="flex items-center gap-1 bg-primary/10 text-primary text-xs">
                            +10%
                            <TrendingUp className="w-3 h-3" />
                          </Badge>
                        </div>
                        <p className="leading-none text-muted-foreground text-xs sm:text-sm">
                          Showing total visitors for the last 6 months
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="flex flex-col sm:col-span-2 xl:col-span-1">
                      <CardContent className="flex flex-col gap-3 flex-1 items-start py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-md bg-primary/10">
                            <Route className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <h3 className="text-sm sm:text-base font-medium">
                            Transfers
                          </h3>
                        </div>
                        <div className="flex items-end gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-3xl xl:text-4xl font-extrabold">
                            150
                          </span>
                          <Badge className="flex items-center gap-1 bg-primary/10 text-primary text-xs">
                            +10%
                            <TrendingUp className="w-3 h-3" />
                          </Badge>
                        </div>
                        <p className="leading-none text-muted-foreground text-xs sm:text-sm">
                          Showing total visitors for the last 6 months
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                {loading ? (
                  <SkeletonCard className="aspect-[2/1] rounded-xl bg-muted/50 w-full max-h-96" />
                ) : (
                  <AreaChartComponent />
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <SkeletonCard className="aspect-[4/3] rounded-xl bg-muted/50 w-full" />
              <SkeletonCard className="aspect-[4/3] rounded-xl bg-muted/50 w-full" />
              <SkeletonCard className="aspect-[4/3] rounded-xl bg-muted/50 w-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <BarChartComponent />
              <LineChartComponent />
              <RadarChartMultiple />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
