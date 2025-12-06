'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'New Leads',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Active Users',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface RadicalChartMiniProps {
  chartData?: { leads: number; users: number };
  trendingPercentage?: number;
}

export function RadicalChartMini({
  chartData = { leads: 0, users: 0 },
  trendingPercentage = 0,
}: RadicalChartMiniProps) {
  const formattedData = [
    {
      month: 'current',
      leads: chartData.leads,
      users: chartData.users,
    },
  ];

  const totalVisitors = chartData.leads + chartData.users;

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full decr-mb"
          style={{ maxHeight: '190px', position: 'relative', top: '12px' }}
        >
          <RadialBarChart
            data={formattedData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          style={{
                            fill: 'hsl(var(--foreground))',
                            fontSize: '1.5rem',
                            fontWeight: 900,
                          }}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          style={{
                            fill: 'hsl(var(--foreground))',
                            fontSize: '0.75rem',
                          }}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="leads"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="users"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="flex w-full flex-col">
          <h3>
            Trending {trendingPercentage >= 0 ? 'up' : 'down'} by{' '}
            {Math.abs(trendingPercentage)}% this month
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
