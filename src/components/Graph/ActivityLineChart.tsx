import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { PureComponent } from 'react';
import { ITheme } from 'common/App';
import { useTheme } from '@mui/material/styles';

export interface ActivityLineChartData {

    label: string;
    hours: number;
    workouts: number;
}

export interface ActivityLineChartProps {

    data: ActivityLineChartData[];

}

export default function ActivityLineChart({ data }: ActivityLineChartProps) {

    const theme = useTheme();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.75rem' }} width={300} height={100} data={data} margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
                <CartesianGrid strokeOpacity={0.25} />
                <defs>
                    <linearGradient id="areaColorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={`${(theme as ITheme).palette.tertiary.main}`} stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.25} />
                    </linearGradient>
                </defs>
                <Area dot
                    type="monotone"
                    dataKey="hours"
                    stroke={`${(theme as ITheme).palette.tertiary.main}`}
                    strokeWidth={2}
                    activeDot={{ r: 5 }}
                    fillOpacity={1}
                    fill="url(#areaColorGradient)" />
                <XAxis tickSize={5} tick={<CustomizedXAxisTick />} />
                <YAxis tickSize={0} minTickGap={25} tick={<CustomizedYAxisTick />} />
                <Tooltip contentStyle={
                    {
                        background: `${(theme as ITheme).palette.shades.g1}`,
                        color: `${(theme as ITheme).palette.shades.g5}`
                    }}
                    formatter={(value) => [`${value} Mins`]}
                    labelFormatter={(label) => `Week ${label}`} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

class CustomizedXAxisTick extends PureComponent<any> {

    render() {

        const { x, y, payload } = this.props;
        return (payload.value === 0 || (payload.value + 1) % 4 === 0) ? (
            <g transform={`translate(${x},${y})`}>
                <text fontSize={"10"} x={20} y={0} dy={16} textAnchor="end" fill="#666">
                    Week {payload.value + 1}
                </text>
            </g>
        ) : <></>;
    }
}

class CustomizedYAxisTick extends PureComponent<any> {

    render() {

        const { x, y, payload } = this.props;
        return payload.value === 0 ? <></> : (
            <g transform={`translate(${x},${y})`}>
                <text fontSize={"10"} x={-25} y={0} dy={0} textAnchor="start" fill="#666">
                    {Math.round(payload.value / 60)} hr
                </text>
            </g>
        );
    }
}
