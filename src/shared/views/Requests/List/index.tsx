import { useEffect, useState } from 'react';
import { DataTable } from '@/shared/components/DataTable';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { columns } from './columns';
import { BookCheck, Route, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadicalChartMini } from '@/shared/components/Charts/RadicalChartMini';
import { requestsAPI } from '@/shared/api/requests/requests.service';
import { Request } from '@/shared/api/requests/types';
import {
  calcItemsByLastMonths,
  calcItemsByCurrentMonthWithStatus,
  calcItemsByMonthWithStatus,
  calculatePercentageChange,
  getChartDataForCurrentMonth,
  getMonthlyTrendingPercentage,
} from '@/shared/utils/calcItemsByMonth';

export default function ListView() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<Request[]>([]);

  const newBookRequests = calcItemsByLastMonths(requests, 3);
  const previousThreeMonthsRequests =
    requests.length > 0
      ? calcItemsByLastMonths(requests, 3) - calcItemsByLastMonths(requests, 2)
      : 0;
  const newBookRequestsChange =
    requests.length > 0
      ? calculatePercentageChange(newBookRequests, previousThreeMonthsRequests)
      : 0;

  const currentMonthTransfers = calcItemsByCurrentMonthWithStatus(
    requests,
    'success',
  );
  const previousMonthTransfers = calcItemsByMonthWithStatus(
    requests,
    1,
    'success',
  );
  const transfersChange =
    requests.length > 0
      ? calculatePercentageChange(currentMonthTransfers, previousMonthTransfers)
      : 0;

  const chartData = getChartDataForCurrentMonth(requests);
  const monthlyTrendingPercentage = getMonthlyTrendingPercentage(requests);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await requestsAPI.getRequests();
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {loading ? (
        <div className="flex flex-col md:flex-row items-stretch gap-4 w-full">
          <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-48 w-full" />
          <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-48 w-full" />
          <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-48 w-full" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-stretch gap-4 w-full">
          <div className="w-full md:w-1/3 h-max md:h-full">
            <RadicalChartMini
              chartData={chartData}
              trendingPercentage={monthlyTrendingPercentage}
            />
          </div>
          <Card className="flex flex-col w-full md:w-1/3">
            <CardContent className="flex flex-col gap-3 flex-1 items-start py-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-primary/10">
                  <BookCheck />
                </div>
                <h3 className="text-base md:text-lg">New book requests</h3>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl md:text-4xl font-extrabold">
                  {newBookRequests}
                </span>
                <Badge
                  className={`flex items-center gap-1 ${newBookRequestsChange >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                >
                  {newBookRequestsChange >= 0 ? '+' : ''}
                  {newBookRequestsChange}%
                  {newBookRequestsChange >= 0 ? (
                    <TrendingUp className="w-4" />
                  ) : (
                    <TrendingDown className="w-4" />
                  )}
                </Badge>
              </div>
              <p className="leading-none text-muted-foreground text-sm">
                Showing total requests for the last 3 months
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col w-full md:w-1/3">
            <CardContent className="flex flex-col gap-3 flex-1 items-start py-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-primary/10">
                  <Route />
                </div>
                <h3 className="text-base md:text-lg">Transfers</h3>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl md:text-4xl font-extrabold">
                  {currentMonthTransfers}
                </span>
                <Badge
                  className={`flex items-center gap-1 ${transfersChange >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                >
                  {transfersChange >= 0 ? '+' : ''}
                  {transfersChange}%
                  {transfersChange >= 0 ? (
                    <TrendingUp className="w-4" />
                  ) : (
                    <TrendingDown className="w-4" />
                  )}
                </Badge>
              </div>
              <p className="leading-none text-muted-foreground text-sm">
                Showing successful transfers for the current month
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {loading ? (
        <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-full w-full max-h-[631px]" />
      ) : (
        <div className="overflow-x-auto">
          <DataTable<Request>
            data={requests}
            columns={columns}
            dateKey="date"
            searchKey="email"
            searchPlaceholder="Filter by email..."
          />
        </div>
      )}
    </div>
  );
}
